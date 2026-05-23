package client

import (
	"context"
	"errors"
	"net/http"
)

type loginRequest struct {
	Email    string `json:"email"`
	Password string `json:"password"`
}

type loginResponse struct {
	Token string `json:"token"`
}

// Login exchanges an email + password for a JWT. The returned token should be
// stored by the caller and passed to subsequent Client constructions via
// WithJWT.
func (c *Client) Login(ctx context.Context, email, password string) (string, error) {
	var resp loginResponse
	if err := c.do(ctx, http.MethodPost, "/api/login", loginRequest{Email: email, Password: password}, &resp); err != nil {
		return "", err
	}
	if resp.Token == "" {
		return "", errors.New("login response did not include a token")
	}
	return resp.Token, nil
}
