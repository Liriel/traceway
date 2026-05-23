package main

import (
	"net/http"
	"net/http/httptest"
	"strings"
	"testing"
)

func TestEndpointsList_table(t *testing.T) {
	srv := httptest.NewServer(http.HandlerFunc(func(w http.ResponseWriter, _ *http.Request) {
		_, _ = w.Write([]byte(`{
			"data":[
				{"endpoint":"GET /api/projects","count":120,"p50Duration":50000000,"p95Duration":150000000,"p99Duration":300000000,"avgDuration":80000000,"lastSeen":"2026-05-13T12:00:00Z","impact":0.42,"impactReason":"high p95"}
			],
			"pagination":{"total":1}
		}`))
	}))
	defer srv.Close()
	seedSessionFor(t, srv.URL)

	stdout, _, err := runCmd(t, "", "endpoints", "list", "--output", "table")
	if err != nil {
		t.Fatal(err)
	}
	out := stdout.String()
	if !strings.Contains(out, "ENDPOINT") || !strings.Contains(out, "P50") || !strings.Contains(out, "P95") || !strings.Contains(out, "P99") {
		t.Errorf("table missing headers: %s", out)
	}
	if !strings.Contains(out, "/api/projects") || !strings.Contains(out, "120") {
		t.Errorf("table missing row data: %s", out)
	}
	// Latency should be human-formatted (50ms, not 50000000)
	if strings.Contains(out, "50000000") {
		t.Errorf("table should format ns as human duration: %s", out)
	}
}

func TestEndpointsList_jsonShape(t *testing.T) {
	srv := httptest.NewServer(http.HandlerFunc(func(w http.ResponseWriter, _ *http.Request) {
		_, _ = w.Write([]byte(`{"data":[{"endpoint":"GET /","count":1}],"pagination":{}}`))
	}))
	defer srv.Close()
	seedSessionFor(t, srv.URL)

	stdout, _, err := runCmd(t, "", "endpoints", "list", "--output", "json")
	if err != nil {
		t.Fatal(err)
	}
	if !strings.Contains(stdout.String(), `"GET /"`) {
		t.Errorf("missing endpoint in JSON: %s", stdout.String())
	}
}
