package client

import (
	"bytes"
	"context"
	"encoding/json"
	"fmt"
	"io"
	"net/http"
	"strings"
	"time"
)

// Client talks to a Traceway HTTP API.
type Client struct {
	BaseURL    string
	HTTPClient *http.Client
	JWT        string
	UserAgent  string
}

// Option mutates a Client during construction.
type Option func(*Client)

// New returns a Client with sane defaults. The baseURL is normalized by
// stripping trailing slashes; do() prepends "/api/..." paths.
func New(baseURL string, opts ...Option) *Client {
	c := &Client{
		BaseURL:    strings.TrimRight(baseURL, "/"),
		HTTPClient: &http.Client{Timeout: 30 * time.Second},
		UserAgent:  "traceway-cli/0.1",
	}
	for _, opt := range opts {
		opt(c)
	}
	return c
}

// WithHTTPClient injects a custom *http.Client (useful for tests).
func WithHTTPClient(h *http.Client) Option {
	return func(c *Client) { c.HTTPClient = h }
}

// WithJWT sets the bearer token to send on every request.
func WithJWT(jwt string) Option {
	return func(c *Client) { c.JWT = jwt }
}

// do is the internal HTTP transport. It JSON-encodes body (if non-nil),
// JSON-decodes the response into out (if non-nil), and maps non-2xx status
// codes to typed errors.
func (c *Client) do(ctx context.Context, method, path string, body, out any) error {
	var reqBody io.Reader
	if body != nil {
		buf, err := json.Marshal(body)
		if err != nil {
			return fmt.Errorf("encoding request body: %w", err)
		}
		reqBody = bytes.NewReader(buf)
	}

	req, err := http.NewRequestWithContext(ctx, method, c.BaseURL+path, reqBody)
	if err != nil {
		return fmt.Errorf("building request: %w", err)
	}
	req.Header.Set("Content-Type", "application/json")
	req.Header.Set("Accept", "application/json")
	req.Header.Set("User-Agent", c.UserAgent)
	if c.JWT != "" {
		req.Header.Set("Authorization", "Bearer "+c.JWT)
	}

	resp, err := c.HTTPClient.Do(req)
	if err != nil {
		return err
	}
	defer resp.Body.Close()

	if resp.StatusCode >= 200 && resp.StatusCode < 300 {
		if out == nil {
			return nil
		}
		if err := json.NewDecoder(resp.Body).Decode(out); err != nil {
			return fmt.Errorf("decoding response: %w", err)
		}
		return nil
	}

	switch resp.StatusCode {
	case http.StatusUnauthorized:
		return ErrUnauthorized
	case http.StatusForbidden:
		return ErrForbidden
	case http.StatusNotFound:
		return ErrNotFound
	case http.StatusTooManyRequests:
		return ErrRateLimited
	}
	respBody, _ := io.ReadAll(resp.Body)
	return &APIError{StatusCode: resp.StatusCode, Body: strings.TrimSpace(string(respBody))}
}

// jsonMarshalNoHTMLEscape is a json.Marshal that doesn't escape <, >, & in
// strings. Used by request types with custom MarshalJSON to keep --output
// json human-readable. The default json.Marshal would otherwise turn
// "p < 5" into "p < 5" in the wire body.
func jsonMarshalNoHTMLEscape(v any) ([]byte, error) {
	var buf bytes.Buffer
	enc := json.NewEncoder(&buf)
	enc.SetEscapeHTML(false)
	if err := enc.Encode(v); err != nil {
		return nil, err
	}
	// json.Encoder appends a trailing newline; trim it so callers can compose.
	out := buf.Bytes()
	if len(out) > 0 && out[len(out)-1] == '\n' {
		out = out[:len(out)-1]
	}
	return out, nil
}
