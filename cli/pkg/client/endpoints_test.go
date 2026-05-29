package client

import (
	"context"
	"encoding/json"
	"net/http"
	"net/http/httptest"
	"testing"
	"time"
)

func TestListEndpoints_callsGroupedRoute(t *testing.T) {
	srv := httptest.NewServer(http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		if r.URL.Path != "/api/endpoints/grouped" {
			t.Errorf("path = %q (want grouped)", r.URL.Path)
		}
		if r.URL.Query().Get("projectId") != "proj-1" {
			t.Errorf("projectId = %q", r.URL.Query().Get("projectId"))
		}
		var body map[string]any
		_ = json.NewDecoder(r.Body).Decode(&body)
		if body["fromDate"] == nil || body["toDate"] == nil {
			t.Errorf("body missing fromDate/toDate: %v", body)
		}
		// p50/p95/p99 are time.Duration in upstream — JSON encoded as nanoseconds (int64)
		_, _ = w.Write([]byte(`{
			"data":[
				{"endpoint":"GET /api/projects","count":120,"p50Duration":50000000,"p95Duration":150000000,"p99Duration":300000000,"avgDuration":80000000,"lastSeen":"2026-05-13T12:00:00Z","impact":0.42,"impactReason":"high p95"}
			],
			"pagination":{"page":1,"pageSize":50,"total":1,"totalPages":1}
		}`))
	}))
	defer srv.Close()

	c := New(srv.URL, WithJWT("tok"))
	resp, err := c.ListEndpoints(context.Background(), "proj-1", ListEndpointsRequest{
		TimeRange:  TimeRange{From: time.Now().Add(-time.Hour), To: time.Now()},
		Pagination: PaginationParams{Page: 1, PageSize: 50},
	})
	if err != nil {
		t.Fatalf("ListEndpoints: %v", err)
	}
	if len(resp.Data) != 1 {
		t.Fatalf("got %d endpoints", len(resp.Data))
	}
	if resp.Data[0].Endpoint != "GET /api/projects" {
		t.Errorf("Endpoint = %q", resp.Data[0].Endpoint)
	}
	if resp.Data[0].Count != 120 {
		t.Errorf("Count = %d", resp.Data[0].Count)
	}
	if resp.Data[0].P50Duration != 50*time.Millisecond {
		t.Errorf("P50Duration = %v, want 50ms", resp.Data[0].P50Duration)
	}
	if resp.Data[0].Impact != 0.42 {
		t.Errorf("Impact = %v", resp.Data[0].Impact)
	}
}
