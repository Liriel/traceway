//go:build pgch

package monitoring

import (
	"context"
	"fmt"
	"time"

	traceway "go.tracewayapp.com"

	"github.com/tracewayapp/traceway/backend/app/chdb"
)

const reportInterval = 60 * time.Second

var telemetryTables = []string{
	"traces",
	"log_records",
	"metric_points",
	"spans",
	"exception_stack_traces",
	"endpoints",
	"tasks",
}

func StartClickHouseReporter(ctx context.Context) {
	go func() {
		defer traceway.Recover()

		ticker := time.NewTicker(reportInterval)
		defer ticker.Stop()

		var prevInserted uint64
		var prevFailed uint64
		first := true

		// Fire once immediately so we don't wait 60s for the first data point.
		reportOnce(ctx, &prevInserted, &prevFailed, &first)

		for {
			select {
			case <-ctx.Done():
				return
			case <-ticker.C:
				reportOnce(ctx, &prevInserted, &prevFailed, &first)
			}
		}
	}()
}

func reportOnce(ctx context.Context, prevInserted, prevFailed *uint64, first *bool) {
	// Bound each tick so a stuck CH doesn't wedge the reporter forever.
	qCtx, cancel := context.WithTimeout(ctx, 10*time.Second)
	defer cancel()

	reportPartsByTable(qCtx)
	reportMergesRunning(qCtx)
	reportEventDeltas(qCtx, prevInserted, prevFailed, first)
}

func reportPartsByTable(ctx context.Context) {
	for _, table := range telemetryTables {
		var parts uint64
		var rows uint64
		err := chdb.Conn.QueryRow(
			ctx,
			"SELECT coalesce(count(), 0), coalesce(sum(rows), 0) FROM system.parts WHERE database = currentDatabase() AND table = ? AND active",
			table,
		).Scan(&parts, &rows)
		if err != nil {
			traceway.CaptureException(fmt.Errorf("monitoring: system.parts query for %q failed: %w", table, err))
			continue
		}
		tags := map[string]string{"table": table}
		traceway.CaptureMetricWithTags("traceway.ch.parts.active", float64(parts), tags)
		traceway.CaptureMetricWithTags("traceway.ch.parts.rows", float64(rows), tags)
	}
}

func reportMergesRunning(ctx context.Context) {
	var merges uint64
	err := chdb.Conn.QueryRow(
		ctx,
		"SELECT coalesce(count(), 0) FROM system.merges WHERE database = currentDatabase()",
	).Scan(&merges)
	if err != nil {
		traceway.CaptureException(fmt.Errorf("monitoring: system.merges query failed: %w", err))
		return
	}
	traceway.CaptureMetric("traceway.ch.merges.running", float64(merges))
}

func reportEventDeltas(ctx context.Context, prevInserted, prevFailed *uint64, first *bool) {
	curInserted, err := scanEventValue(ctx, "InsertedRows")
	if err != nil {
		traceway.CaptureException(fmt.Errorf("monitoring: system.events InsertedRows failed: %w", err))
		return
	}
	curFailed, err := scanEventValue(ctx, "FailedInsertQuery")
	if err != nil {
		traceway.CaptureException(fmt.Errorf("monitoring: system.events FailedInsertQuery failed: %w", err))
		return
	}

	// First tick has no baseline — the "delta" would be the lifetime counter.
	if !*first {
		inserted := safeDelta(*prevInserted, curInserted)
		failed := safeDelta(*prevFailed, curFailed)
		traceway.CaptureMetric("traceway.ch.inserted_rows.delta", float64(inserted))
		traceway.CaptureMetric("traceway.ch.failed_inserts.delta", float64(failed))
	}
	*prevInserted = curInserted
	*prevFailed = curFailed
	*first = false
}

func scanEventValue(ctx context.Context, event string) (uint64, error) {
	var value uint64
	err := chdb.Conn.QueryRow(
		ctx,
		"SELECT coalesce(sum(value), 0) FROM system.events WHERE event = ?",
		event,
	).Scan(&value)
	return value, err
}

// Guards against counter resets across process/CH restart producing a huge
// uint64 underflow.
func safeDelta(prev, cur uint64) uint64 {
	if cur < prev {
		return cur
	}
	return cur - prev
}
