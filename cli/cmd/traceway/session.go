package main

import (
	"errors"
	"fmt"
	"io"

	"github.com/tracewayapp/traceway/cli/internal/config"
	"github.com/tracewayapp/traceway/cli/internal/exitcode"
	"github.com/tracewayapp/traceway/cli/internal/output"
	"github.com/tracewayapp/traceway/cli/internal/state"
)

// session bundles everything a query command needs after resolving config,
// state, the active profile, and the project ID. Built by loadSession.
type session struct {
	ProfileName string
	URL         string
	Username    string
	JWT         string
	ProjectID   string
}

// Sentinel errors so the caller can map them to the right error envelope.
var (
	errSessionNoProfile = errors.New("session: no profile configured")
	errSessionNoJWT     = errors.New("session: profile has no stored token")
	errSessionNoProject = errors.New("session: no project selected")
)

// loadSession reads config + state, resolves the active profile and project,
// and returns a session. Returns one of the errSession* sentinels on common
// "you need to configure something" failures so callers can render the
// matching error envelope.
func loadSession() (*session, error) {
	cfg, err := config.Load()
	if err != nil {
		return nil, fmt.Errorf("loading config: %w", err)
	}
	st, err := state.Load()
	if err != nil {
		return nil, fmt.Errorf("loading state: %w", err)
	}

	name := resolveProfileName(st)
	cp, hasCfg := cfg.Profiles[name]
	if !hasCfg {
		return nil, fmt.Errorf("%w: %q", errSessionNoProfile, name)
	}

	sp, hasState := st.Profiles[name]
	if !hasState || sp.JWT == "" {
		return nil, fmt.Errorf("%w: %q", errSessionNoJWT, name)
	}

	projectID := flagProject
	if projectID == "" {
		projectID = sp.CurrentProjectID
	}
	if projectID == "" {
		return nil, fmt.Errorf("%w: profile %q has no current project", errSessionNoProject, name)
	}

	return &session{
		ProfileName: name,
		URL:         cp.URL,
		Username:    cp.Username,
		JWT:         sp.JWT,
		ProjectID:   projectID,
	}, nil
}

// renderSessionError maps loadSession sentinel errors to envelopes.
func renderSessionError(errOut io.Writer, mode output.Mode, err error) error {
	switch {
	case errors.Is(err, errSessionNoProfile), errors.Is(err, errSessionNoJWT):
		_ = output.RenderError(errOut, mode, output.ErrorEnvelope{
			Code:     "not_authenticated",
			Message:  err.Error(),
			Hint:     "traceway login",
			ExitCode: exitcode.Auth,
		})
		return newCLIError(exitcode.Auth, "not_authenticated")
	case errors.Is(err, errSessionNoProject):
		_ = output.RenderError(errOut, mode, output.ErrorEnvelope{
			Code:     "no_project",
			Message:  err.Error(),
			Hint:     "traceway projects use <project-id> (or pass --project)",
			ExitCode: exitcode.Usage,
		})
		return newCLIError(exitcode.Usage, "no_project")
	}
	_ = output.RenderError(errOut, mode, output.ErrorEnvelope{
		Code: "internal", Message: err.Error(), ExitCode: exitcode.Generic,
	})
	return newCLIError(exitcode.Generic, "internal")
}
