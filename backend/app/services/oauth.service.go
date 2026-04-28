package services

import (
	"net/http"
	"strings"

	"github.com/tracewayapp/traceway/backend/app/config"

	"github.com/gorilla/sessions"
	"github.com/markbates/goth"
	"github.com/markbates/goth/gothic"
	"github.com/markbates/goth/providers/github"
	"github.com/markbates/goth/providers/google"
)

type oauthService struct {
	googleEnabled bool
	githubEnabled bool
}

var OAuthService *oauthService

func InitOAuth() {
	cfg := config.Config

	svc := &oauthService{
		googleEnabled: cfg.GoogleClientID != "" && cfg.GoogleClientSecret != "",
		githubEnabled: cfg.GitHubClientID != "" && cfg.GitHubClientSecret != "",
	}
	OAuthService = svc

	if !svc.googleEnabled && !svc.githubEnabled {
		return
	}

	secret := cfg.OAuthSessionSecret
	if secret == "" {
		// fall back to JWT secret so cookies are still signed if the operator
		// forgot to set a dedicated session secret. Both are server-only.
		secret = cfg.JWTSecret
	}

	store := sessions.NewCookieStore([]byte(secret))
	store.Options.Path = "/"
	store.Options.HttpOnly = true
	store.Options.MaxAge = 600
	store.Options.Secure = strings.HasPrefix(cfg.AppBaseURL, "https://")
	store.Options.SameSite = http.SameSiteLaxMode
	gothic.Store = store

	providers := []goth.Provider{}
	base := strings.TrimRight(cfg.AppBaseURL, "/")
	if svc.googleEnabled {
		providers = append(providers, google.New(
			cfg.GoogleClientID,
			cfg.GoogleClientSecret,
			base+"/api/auth/callback/google",
			"email", "profile",
		))
	}
	if svc.githubEnabled {
		providers = append(providers, github.New(
			cfg.GitHubClientID,
			cfg.GitHubClientSecret,
			base+"/api/auth/callback/github",
			"user:email",
		))
	}
	goth.UseProviders(providers...)
}

func (s *oauthService) IsEnabled() bool {
	return s.googleEnabled || s.githubEnabled
}

func (s *oauthService) IsProviderEnabled(name string) bool {
	switch name {
	case "google":
		return s.googleEnabled
	case "github":
		return s.githubEnabled
	}
	return false
}

func (s *oauthService) EnabledProviders() []string {
	out := []string{}
	if s.googleEnabled {
		out = append(out, "google")
	}
	if s.githubEnabled {
		out = append(out, "github")
	}
	return out
}
