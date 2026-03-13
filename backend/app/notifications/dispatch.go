package notifications

import (
	"context"
	"database/sql"
	"fmt"
	"time"

	"github.com/tracewayapp/traceway/backend/app/db"
	"github.com/tracewayapp/traceway/backend/app/models"
	"github.com/tracewayapp/traceway/backend/app/repositories"
	traceway "go.tracewayapp.com"
)

func dispatch(rule *models.NotificationRuleWithChannel, msg Message) {
	channel, dbErr := db.ExecuteTransaction(func(tx *sql.Tx) (*models.NotificationChannel, error) {
		return repositories.NotificationChannelRepository.FindById(tx, rule.ChannelId)
	})
	if dbErr != nil || channel == nil {
		recordHistory(rule, msg, "failed", "failed to load channel")
		recordFiredNotification(rule, msg, "failed", "failed to load channel")
		return
	}

	adapter, err := NewAdapter(channel.ChannelType, channel.Config)
	if err != nil {
		recordHistory(rule, msg, "failed", err.Error())
		recordFiredNotification(rule, msg, "failed", err.Error())
		return
	}

	ctx, cancel := context.WithTimeout(context.Background(), 30*time.Second)
	defer cancel()

	msg.RuleType = rule.RuleType
	msg.RuleName = rule.Name

	err = adapter.Send(ctx, msg)
	if err != nil {
		recordHistory(rule, msg, "failed", err.Error())
		recordFiredNotification(rule, msg, "failed", err.Error())
		traceway.CaptureException(fmt.Errorf("notification dispatch failed (rule=%d, channel=%s): %w", rule.Id, rule.ChannelName, err))
		return
	}

	recordHistory(rule, msg, "sent", "")
	recordFiredNotification(rule, msg, "sent", "")
	cooldowns.recordFire(rule.Id)
}

func recordFiredNotification(rule *models.NotificationRuleWithChannel, msg Message, status string, errorMsg string) {
	go func() {
		err := repositories.FiredNotificationRepository.Insert(context.Background(), repositories.FiredNotification{
			ProjectId:   rule.ProjectId,
			RuleId:      rule.Id,
			RuleType:    rule.RuleType,
			RuleName:    rule.Name,
			ChannelType: rule.ChannelType,
			ChannelName: rule.ChannelName,
			Severity:    string(msg.Severity),
			Subject:     msg.Subject,
			Body:        msg.Body,
			Status:      status,
			ErrorMsg:    errorMsg,
			Endpoint:    msg.Endpoint,
			FiredAt:     time.Now().UTC(),
		})
		if err != nil {
			traceway.CaptureException(fmt.Errorf("failed to record fired notification to ClickHouse: %w", err))
		}
	}()
}

func recordHistory(rule *models.NotificationRuleWithChannel, msg Message, status string, errorMsg string) {
	var errMsgPtr *string
	if errorMsg != "" {
		errMsgPtr = &errorMsg
	}

	ruleId := rule.Id
	channelId := rule.ChannelId

	history := &models.NotificationHistory{
		ProjectId:    rule.ProjectId,
		RuleId:       &ruleId,
		ChannelId:    &channelId,
		RuleType:     rule.RuleType,
		RuleName:     rule.Name,
		ChannelName:  rule.ChannelName,
		Severity:     string(msg.Severity),
		Subject:      msg.Subject,
		Body:         msg.Body,
		Status:       status,
		ErrorMessage: errMsgPtr,
		CreatedAt:    time.Now().UTC(),
	}

	_, dbErr := db.ExecuteTransaction(func(tx *sql.Tx) (int, error) {
		return repositories.NotificationHistoryRepository.Create(tx, history)
	})
	if dbErr != nil {
		traceway.CaptureException(fmt.Errorf("failed to record notification history: %w", dbErr))
	}
}
