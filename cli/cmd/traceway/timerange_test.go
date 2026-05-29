package main

import (
	"errors"
	"testing"
	"time"

	"github.com/spf13/cobra"
)

// helper to build a fake command with the time-range flags wired
func newCmdWithTimeFlags(t *testing.T) *cobra.Command {
	t.Helper()
	cmd := &cobra.Command{Use: "fake"}
	addTimeRangeFlags(cmd)
	return cmd
}

func TestResolveTimeRange_defaultIsLastHour(t *testing.T) {
	cmd := newCmdWithTimeFlags(t)
	if err := cmd.ParseFlags(nil); err != nil {
		t.Fatal(err)
	}
	tr, err := resolveTimeRange(cmd)
	if err != nil {
		t.Fatal(err)
	}
	delta := tr.To.Sub(tr.From)
	if delta < 59*time.Minute || delta > 61*time.Minute {
		t.Errorf("default range should be ~1h, got %v", delta)
	}
}

func TestResolveTimeRange_sinceFlag(t *testing.T) {
	cmd := newCmdWithTimeFlags(t)
	if err := cmd.ParseFlags([]string{"--since", "30m"}); err != nil {
		t.Fatal(err)
	}
	tr, err := resolveTimeRange(cmd)
	if err != nil {
		t.Fatal(err)
	}
	delta := tr.To.Sub(tr.From)
	if delta < 29*time.Minute || delta > 31*time.Minute {
		t.Errorf("--since 30m should give ~30m range, got %v", delta)
	}
}

func TestResolveTimeRange_fromTo(t *testing.T) {
	cmd := newCmdWithTimeFlags(t)
	if err := cmd.ParseFlags([]string{
		"--from", "2026-05-13T00:00:00Z",
		"--to", "2026-05-13T23:59:59Z",
	}); err != nil {
		t.Fatal(err)
	}
	tr, err := resolveTimeRange(cmd)
	if err != nil {
		t.Fatal(err)
	}
	wantFrom, _ := time.Parse(time.RFC3339, "2026-05-13T00:00:00Z")
	wantTo, _ := time.Parse(time.RFC3339, "2026-05-13T23:59:59Z")
	if !tr.From.Equal(wantFrom) {
		t.Errorf("From = %v, want %v", tr.From, wantFrom)
	}
	if !tr.To.Equal(wantTo) {
		t.Errorf("To = %v, want %v", tr.To, wantTo)
	}
}

func TestResolveTimeRange_sinceAndFromAreMutuallyExclusive(t *testing.T) {
	cmd := newCmdWithTimeFlags(t)
	if err := cmd.ParseFlags([]string{
		"--since", "1h",
		"--from", "2026-05-13T00:00:00Z",
	}); err != nil {
		t.Fatal(err)
	}
	if _, err := resolveTimeRange(cmd); err == nil {
		t.Fatal("expected mutual-exclusivity error")
	}
}

func TestResolveTimeRange_fromWithoutTo(t *testing.T) {
	cmd := newCmdWithTimeFlags(t)
	if err := cmd.ParseFlags([]string{"--from", "2026-05-13T00:00:00Z"}); err != nil {
		t.Fatal(err)
	}
	if _, err := resolveTimeRange(cmd); err == nil {
		t.Fatal("expected error: --from requires --to")
	}
}

func TestResolveTimeRange_invalidFromFormat(t *testing.T) {
	cmd := newCmdWithTimeFlags(t)
	if err := cmd.ParseFlags([]string{
		"--from", "not-a-date",
		"--to", "2026-05-13T23:59:59Z",
	}); err != nil {
		t.Fatal(err)
	}
	if _, err := resolveTimeRange(cmd); err == nil {
		t.Fatal("expected parse error")
	}
}

func TestResolveTimeRange_invalidSinceDuration(t *testing.T) {
	cmd := newCmdWithTimeFlags(t)
	if err := cmd.ParseFlags([]string{"--since", "invalid"}); err != nil {
		t.Fatal(err)
	}
	if _, err := resolveTimeRange(cmd); err == nil {
		t.Fatal("expected duration parse error")
	}
}

func TestParseRelativeDuration_validInputs(t *testing.T) {
	cases := []struct {
		in   string
		want time.Duration
	}{
		{"1h", time.Hour},
		{"24h", 24 * time.Hour},
		{"7d", 168 * time.Hour},
		{"30d", 720 * time.Hour},
		{"1d", 24 * time.Hour},
		{"30m", 30 * time.Minute},
	}
	for _, tc := range cases {
		t.Run(tc.in, func(t *testing.T) {
			got, err := parseRelativeDuration(tc.in)
			if err != nil {
				t.Fatalf("parseRelativeDuration(%q) error: %v", tc.in, err)
			}
			if got != tc.want {
				t.Errorf("parseRelativeDuration(%q) = %v, want %v", tc.in, got, tc.want)
			}
		})
	}
}

func TestParseRelativeDuration_invalidInputs(t *testing.T) {
	cases := []string{
		"0d",
		"-1d",
		"7days",
		"7D",
		"7d2h",
		"d",
		"notaduration",
		"",
	}
	for _, in := range cases {
		t.Run(in, func(t *testing.T) {
			if _, err := parseRelativeDuration(in); err == nil {
				t.Errorf("parseRelativeDuration(%q) expected error, got nil", in)
			}
		})
	}
}

func TestResolveTimeRange_sinceDays(t *testing.T) {
	cmd := newCmdWithTimeFlags(t)
	if err := cmd.ParseFlags([]string{"--since", "7d"}); err != nil {
		t.Fatal(err)
	}
	tr, err := resolveTimeRange(cmd)
	if err != nil {
		t.Fatal(err)
	}
	delta := tr.To.Sub(tr.From)
	want := 168 * time.Hour
	if delta < want-time.Minute || delta > want+time.Minute {
		t.Errorf("--since 7d should give ~168h range, got %v", delta)
	}
}

func TestResolveTimeRange_sinceZeroDaysRejected(t *testing.T) {
	cmd := newCmdWithTimeFlags(t)
	if err := cmd.ParseFlags([]string{"--since", "0d"}); err != nil {
		t.Fatal(err)
	}
	if _, err := resolveTimeRange(cmd); err == nil {
		t.Fatal("expected error for --since 0d")
	}
}

func TestResolveTimeRange_invalidSinceStillWrapsErrInvalidTimeRange(t *testing.T) {
	cmd := newCmdWithTimeFlags(t)
	if err := cmd.ParseFlags([]string{"--since", "notaduration"}); err != nil {
		t.Fatal(err)
	}
	_, err := resolveTimeRange(cmd)
	if err == nil {
		t.Fatal("expected error")
	}
	if !errors.Is(err, errInvalidTimeRange) {
		t.Errorf("error %v should wrap errInvalidTimeRange", err)
	}
}
