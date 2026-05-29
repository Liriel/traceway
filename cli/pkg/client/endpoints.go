package client

import (
	"context"
	"net/http"
	"net/url"
	"time"
)

// EndpointStats matches the upstream models.EndpointStats. Durations are
// time.Duration values which Go marshals/unmarshals as nanoseconds.
type EndpointStats struct {
	Endpoint     string        `json:"endpoint"`
	Count        uint64        `json:"count"`
	P50Duration  time.Duration `json:"p50Duration"`
	P95Duration  time.Duration `json:"p95Duration"`
	P99Duration  time.Duration `json:"p99Duration"`
	AvgDuration  time.Duration `json:"avgDuration"`
	LastSeen     time.Time     `json:"lastSeen"`
	Impact       float64       `json:"impact"`
	ImpactReason string        `json:"impactReason"`
}

// ListEndpointsRequest is the body for POST /api/endpoints/grouped.
type ListEndpointsRequest struct {
	TimeRange     TimeRange        `json:"-"`
	Pagination    PaginationParams `json:"pagination"`
	OrderBy       string           `json:"orderBy,omitempty"`
	SortDirection string           `json:"sortDirection,omitempty"`
	Search        string           `json:"search,omitempty"`
}

// MarshalJSON expands TimeRange into top-level fromDate/toDate.
func (r ListEndpointsRequest) MarshalJSON() ([]byte, error) {
	type alias ListEndpointsRequest
	wire := struct {
		FromDate time.Time `json:"fromDate"`
		ToDate   time.Time `json:"toDate"`
		alias
	}{r.TimeRange.From, r.TimeRange.To, alias(r)}
	return jsonMarshalNoHTMLEscape(wire)
}

// ListEndpointsResponse mirrors PaginatedResponse[EndpointStats].
type ListEndpointsResponse struct {
	Data       []EndpointStats `json:"data"`
	Pagination Pagination      `json:"pagination"`
}

// ListEndpoints returns p50/p95/p99 stats grouped by endpoint route. We use
// the /grouped variant rather than the bare /endpoints (which returns one row
// per request).
func (c *Client) ListEndpoints(ctx context.Context, projectID string, req ListEndpointsRequest) (*ListEndpointsResponse, error) {
	path := "/api/endpoints/grouped?projectId=" + url.QueryEscape(projectID)
	var resp ListEndpointsResponse
	if err := c.do(ctx, http.MethodPost, path, req, &resp); err != nil {
		return nil, err
	}
	return &resp, nil
}
