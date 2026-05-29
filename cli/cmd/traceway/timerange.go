package main

import (
	"errors"
	"fmt"
	"io"
	"strconv"
	"strings"
	"time"

	"github.com/spf13/cobra"

	"github.com/tracewayapp/traceway/cli/internal/exitcode"
	"github.com/tracewayapp/traceway/cli/internal/output"
	"github.com/tracewayapp/traceway/cli/pkg/client"
)

// errInvalidTimeRange is returned for any malformed combination of
// --since / --from / --to. Callers map this to the invalid_time_range
// error envelope code with exit 2 (usage).
var errInvalidTimeRange = errors.New("invalid time range")

// addTimeRangeFlags registers --since, --from, --to on the given command.
// The default (no flags) is "since 1h".
func addTimeRangeFlags(cmd *cobra.Command) {
	f := cmd.Flags()
	f.String("since", "", "Relative time range, e.g. 1h, 24h, 7d (default: 1h, mutually exclusive with --from/--to)")
	f.String("from", "", "Start of explicit time range, RFC3339 (mutually exclusive with --since)")
	f.String("to", "", "End of explicit time range, RFC3339 (required with --from)")
}

// resolveTimeRange validates the combination of --since/--from/--to on cmd
// and returns the resulting TimeRange. The default (none of the flags) is
// "last 1 hour".
func resolveTimeRange(cmd *cobra.Command) (client.TimeRange, error) {
	since, _ := cmd.Flags().GetString("since")
	from, _ := cmd.Flags().GetString("from")
	to, _ := cmd.Flags().GetString("to")

	if since != "" && (from != "" || to != "") {
		return client.TimeRange{}, fmt.Errorf("%w: --since cannot be combined with --from/--to", errInvalidTimeRange)
	}
	if (from != "") != (to != "") {
		return client.TimeRange{}, fmt.Errorf("%w: --from and --to must be used together", errInvalidTimeRange)
	}

	if from != "" {
		fromT, err := time.Parse(time.RFC3339, from)
		if err != nil {
			return client.TimeRange{}, fmt.Errorf("%w: --from: %v", errInvalidTimeRange, err)
		}
		toT, err := time.Parse(time.RFC3339, to)
		if err != nil {
			return client.TimeRange{}, fmt.Errorf("%w: --to: %v", errInvalidTimeRange, err)
		}
		return client.TimeRangeFromExplicit(fromT, toT), nil
	}

	dur := time.Hour
	if since != "" {
		d, err := parseRelativeDuration(since)
		if err != nil {
			return client.TimeRange{}, fmt.Errorf("%w: --since: %v", errInvalidTimeRange, err)
		}
		dur = d
	}
	return client.TimeRangeFromSince(dur), nil
}

// parseRelativeDuration accepts time.ParseDuration's standard input plus a
// simple "Nd" form (positive integer days) which time.ParseDuration rejects.
// Compound forms like "7d2h" or "7D" are not supported on purpose.
func parseRelativeDuration(s string) (time.Duration, error) {
	if prefix, ok := strings.CutSuffix(s, "d"); ok {
		n, err := strconv.Atoi(prefix)
		if err != nil {
			return 0, fmt.Errorf("invalid duration %q", s)
		}
		if n <= 0 {
			return 0, fmt.Errorf("invalid duration %q: must be positive", s)
		}
		return time.Duration(n) * 24 * time.Hour, nil
	}
	return time.ParseDuration(s)
}

// renderTimeRangeError maps errInvalidTimeRange (from resolveTimeRange) to an envelope.
func renderTimeRangeError(errOut io.Writer, mode output.Mode, err error) error {
	_ = output.RenderError(errOut, mode, output.ErrorEnvelope{
		Code:     "invalid_time_range",
		Message:  err.Error(),
		Hint:     "use --since DURATION (e.g. 1h, 24h, 7d) or --from RFC3339 --to RFC3339",
		ExitCode: exitcode.Usage,
	})
	return newCLIError(exitcode.Usage, "invalid_time_range")
}
