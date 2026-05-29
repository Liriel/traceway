package main

import (
	"errors"
	"io"
	"net/url"

	"github.com/tracewayapp/traceway/cli/internal/exitcode"
	"github.com/tracewayapp/traceway/cli/internal/output"
	"github.com/tracewayapp/traceway/cli/pkg/client"
)

// cliError carries an exit code alongside an error message. Command runners
// return *cliError to communicate which exitcode the CLI should terminate
// with. main() type-asserts on the returned error to extract the code.
type cliError struct {
	code int
	err  error
}

func (e *cliError) Error() string { return e.err.Error() }
func (e *cliError) Unwrap() error { return e.err }

// newCLIError is a small constructor.
func newCLIError(code int, sentinel string) *cliError {
	return &cliError{code: code, err: errors.New(sentinel)}
}

// renderAPIError writes the appropriate envelope to errOut and returns a
// sentinel error so the cobra runner sees a non-nil result. The actual exit
// code is communicated via the envelope's ExitCode field; main() resolves it.
//
// loginContext = true means we're in the login command itself; an Unauthorized
// from there means "wrong username/password", not "session expired".
func renderAPIError(errOut io.Writer, mode output.Mode, err error, loginContext bool) error {
	env := classifyError(err, loginContext)
	_ = output.RenderError(errOut, mode, env)
	return newCLIError(env.ExitCode, env.Code)
}

func classifyError(err error, loginContext bool) output.ErrorEnvelope {
	switch {
	case errors.Is(err, client.ErrUnauthorized):
		if loginContext {
			return output.ErrorEnvelope{
				Code: "not_authenticated", Message: "invalid email or password",
				ExitCode: exitcode.Auth,
			}
		}
		hint := "traceway login"
		if flagProfile != "" {
			hint = "traceway login --profile " + flagProfile
		}
		return output.ErrorEnvelope{
			Code: "token_expired", Message: "session expired or invalid",
			Hint:     hint,
			ExitCode: exitcode.Auth,
		}
	case errors.Is(err, client.ErrForbidden):
		return output.ErrorEnvelope{
			Code: "forbidden", Message: "permission denied",
			ExitCode: exitcode.Auth,
		}
	case errors.Is(err, client.ErrNotFound):
		return output.ErrorEnvelope{
			Code: "not_found", Message: "resource not found",
			ExitCode: exitcode.NotFound,
		}
	case errors.Is(err, client.ErrRateLimited):
		return output.ErrorEnvelope{
			Code: "rate_limited", Message: "rate limit exceeded — slow down or retry later",
			ExitCode: exitcode.RateLimited,
		}
	}
	var apiErr *client.APIError
	if errors.As(err, &apiErr) {
		if apiErr.StatusCode >= 500 {
			return output.ErrorEnvelope{
				Code: "server_error", Message: apiErr.Error(),
				ExitCode: exitcode.Server,
			}
		}
		return output.ErrorEnvelope{
			Code: "api_error", Message: apiErr.Error(),
			ExitCode: exitcode.Generic,
		}
	}
	var urlErr *url.Error
	if errors.As(err, &urlErr) {
		return output.ErrorEnvelope{
			Code: "connection_failed", Message: urlErr.Error(),
			Hint:     "check that the Traceway URL is reachable and the network is up",
			ExitCode: exitcode.Connection,
		}
	}
	return output.ErrorEnvelope{
		Code: "internal", Message: err.Error(),
		ExitCode: exitcode.Generic,
	}
}
