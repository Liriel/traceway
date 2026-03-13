package notifications

import (
	"context"
	"fmt"
	"net/smtp"
	"strings"

	"github.com/tracewayapp/traceway/backend/app/config"
	"github.com/tracewayapp/traceway/backend/app/services"
)

type EmailAdapter struct {
	Recipients []string `json:"recipients"`
}

func (a *EmailAdapter) Type() string { return "email" }

func (a *EmailAdapter) Validate() error {
	if len(a.Recipients) == 0 {
		return fmt.Errorf("at least one recipient is required")
	}
	if len(a.Recipients) > 10 {
		return fmt.Errorf("maximum 10 recipients allowed")
	}
	for _, r := range a.Recipients {
		if !strings.Contains(r, "@") {
			return fmt.Errorf("invalid email address: %s", r)
		}
	}
	return nil
}

func (a *EmailAdapter) Send(ctx context.Context, msg Message) error {
	emailSvc := services.EmailService
	if emailSvc == nil {
		return fmt.Errorf("email service not initialized")
	}

	prefix := ""
	switch msg.Severity {
	case SeverityCritical:
		prefix = "[CRITICAL] "
	case SeverityWarning:
		prefix = "[WARNING] "
	case SeverityInfo:
		prefix = "[INFO] "
	}

	subject := prefix + msg.Subject

	if !emailSvc.IsEnabled() {
		config.Logf("[EMAIL LOG] To: %s\nSubject: %s\nBody:\n%s", strings.Join(a.Recipients, ", "), subject, msg.Body)
		return nil
	}

	cfg := config.Config
	from := cfg.SMTPFrom
	auth := smtp.PlainAuth("", cfg.SMTPUsername, cfg.SMTPPassword, cfg.SMTPHost)
	addr := fmt.Sprintf("%s:%s", cfg.SMTPHost, cfg.SMTPPort)

	emailMsg := fmt.Sprintf("From: %s\r\nTo: %s\r\nSubject: %s\r\n\r\n%s",
		from, strings.Join(a.Recipients, ", "), subject, msg.Body)

	return smtp.SendMail(addr, auth, from, a.Recipients, []byte(emailMsg))
}
