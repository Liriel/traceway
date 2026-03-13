package notifications

import (
	"context"
	"database/sql"
	"encoding/json"
	"fmt"
	"strings"
	"time"

	"github.com/google/uuid"
	"github.com/tracewayapp/traceway/backend/app/chdb"
	"github.com/tracewayapp/traceway/backend/app/db"
	"github.com/tracewayapp/traceway/backend/app/hooks"
	"github.com/tracewayapp/traceway/backend/app/models"
	"github.com/tracewayapp/traceway/backend/app/repositories"
	traceway "go.tracewayapp.com"
)

func registerReportHook() {
	hooks.RegisterReportHook(func(event hooks.ReportEvent) {
		if len(event.ExceptionHashes) == 0 {
			return
		}
		go evaluateEventRules(event)
	})
}

func evaluateEventRules(event hooks.ReportEvent) {
	rules, err := db.ExecuteTransaction(func(tx *sql.Tx) ([]*models.NotificationRuleWithChannel, error) {
		return repositories.NotificationRuleRepository.FindEnabledEventRules(tx, event.ProjectId)
	})
	if err != nil {
		traceway.CaptureException(fmt.Errorf("failed to load event notification rules: %w", err))
		return
	}

	ctx := context.Background()

	for _, rule := range rules {
		if rule.SnoozedUntil != nil && rule.SnoozedUntil.After(time.Now()) {
			continue
		}

		switch rule.RuleType {
		case "new_error":
			evaluateNewError(ctx, rule, event)
		case "error_regression":
			evaluateErrorRegression(ctx, rule, event)
		}
	}
}

type newErrorConfig struct {
	IgnorePatterns []string `json:"ignorePatterns"`
}

func evaluateNewError(ctx context.Context, rule *models.NotificationRuleWithChannel, event hooks.ReportEvent) {
	var cfg newErrorConfig
	json.Unmarshal(rule.Config, &cfg)

	for _, hash := range event.ExceptionHashes {
		dedupKey := fmt.Sprintf("%d:%s", rule.Id, hash)
		if dedup.isDuplicate(dedupKey, time.Duration(rule.CooldownMinutes)*time.Minute) {
			continue
		}

		var count uint64
		err := chdb.Conn.QueryRow(ctx,
			"SELECT count() FROM exception_stack_traces WHERE project_id = ? AND exception_hash = ?",
			event.ProjectId, hash).Scan(&count)
		if err != nil {
			traceway.CaptureException(fmt.Errorf("new_error check failed: %w", err))
			continue
		}

		// count > 1 means this hash already existed before this batch
		if count > 1 {
			continue
		}

		errorType := getErrorTypeForHash(ctx, event.ProjectId, hash)

		if shouldIgnore(errorType, cfg.IgnorePatterns) {
			continue
		}

		dedup.record(dedupKey)
		msg := buildNewErrorMessage(errorType, hash, "")
		dispatch(rule, msg)
	}
}

func evaluateErrorRegression(ctx context.Context, rule *models.NotificationRuleWithChannel, event hooks.ReportEvent) {
	for _, hash := range event.ExceptionHashes {
		dedupKey := fmt.Sprintf("%d:%s", rule.Id, hash)
		if dedup.isDuplicate(dedupKey, time.Duration(rule.CooldownMinutes)*time.Minute) {
			continue
		}

		// Check if this hash was previously archived (resolved)
		var count uint64
		err := chdb.Conn.QueryRow(ctx,
			"SELECT count() FROM archived_exceptions FINAL WHERE project_id = ? AND exception_hash = ?",
			event.ProjectId, hash).Scan(&count)
		if err != nil {
			traceway.CaptureException(fmt.Errorf("error_regression check failed: %w", err))
			continue
		}

		if count == 0 {
			continue
		}

		errorType := getErrorTypeForHash(ctx, event.ProjectId, hash)
		dedup.record(dedupKey)
		msg := buildErrorRegressionMessage(errorType, hash, "")
		dispatch(rule, msg)
	}
}

func getErrorTypeForHash(ctx context.Context, projectId uuid.UUID, hash string) string {
	var stackTrace string
	err := chdb.Conn.QueryRow(ctx,
		"SELECT stack_trace FROM exception_stack_traces WHERE project_id = ? AND exception_hash = ? ORDER BY recorded_at DESC LIMIT 1",
		projectId, hash).Scan(&stackTrace)
	if err != nil || stackTrace == "" {
		return "Unknown Error"
	}
	lines := strings.SplitN(stackTrace, "\n", 2)
	if len(lines) > 0 {
		line := strings.TrimSpace(lines[0])
		if idx := strings.Index(line, ":"); idx > 0 {
			return line[:idx]
		}
		return line
	}
	return "Unknown Error"
}

func shouldIgnore(errorType string, patterns []string) bool {
	lower := strings.ToLower(errorType)
	for _, pattern := range patterns {
		pattern = strings.ToLower(strings.TrimSpace(pattern))
		if pattern == "" {
			continue
		}
		pattern = strings.ReplaceAll(pattern, "*", "")
		if strings.Contains(lower, pattern) {
			return true
		}
	}
	return false
}
