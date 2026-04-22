package monitoring

import (
	"strconv"

	traceway "go.tracewayapp.com"
)

const (
	SignalTraces  = "traces"
	SignalMetrics = "metrics"
	SignalLogs    = "logs"
	SignalNative  = "native"
)

func RecordIngestBatch(signal, table string, convertMs, insertMs float64, size int) {
	tags := map[string]string{
		"signal": signal,
		"table":  table,
	}
	traceway.CaptureMetricWithTags("traceway.ingest.batch.convert_ms", convertMs, tags)
	traceway.CaptureMetricWithTags("traceway.ingest.batch.insert_ms", insertMs, tags)
	traceway.CaptureMetricWithTags("traceway.ingest.batch.size", float64(size), tags)
}

func RecordRateLimited(orgID int) {
	traceway.CaptureMetricWithTags("traceway.ingest.rate_limited", 1, map[string]string{
		"org_id": strconv.Itoa(orgID),
	})
}
