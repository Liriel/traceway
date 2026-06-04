package monitoring

import (
	"context"
	"time"

	traceway "go.tracewayapp.com"

	"github.com/tracewayapp/traceway/backend/app/cache"
	"github.com/tracewayapp/traceway/backend/app/repositories"
	"github.com/tracewayapp/traceway/backend/app/services"
)

const backendReportInterval = 30 * time.Second

type backendBaselines struct {
	rawHits      uint64
	rawMisses    uint64
	rawEvictions uint64
	parsedHits   uint64
	parsedMisses uint64
	first        bool
}

func StartBackendReporter(ctx context.Context) {
	go func() {
		defer traceway.Recover()

		ticker := time.NewTicker(backendReportInterval)
		defer ticker.Stop()

		baselines := &backendBaselines{first: true}

		reportBackendOnce(baselines)

		for {
			select {
			case <-ctx.Done():
				return
			case <-ticker.C:
				reportBackendOnce(baselines)
			}
		}
	}()
}

func reportBackendOnce(b *backendBaselines) {
	traceway.CaptureMetric("traceway.ingest.in_flight", float64(InFlightIngest()))

	if rss, ok := ReadRSSBytes(); ok {
		traceway.CaptureMetric("traceway.proc.rss_mb", float64(rss)/1024.0/1024.0)
	}

	rawStats := cache.SourceMapCache.Stats()
	traceway.CaptureMetric("traceway.sourcemap.raw.entries", float64(rawStats.Entries))
	traceway.CaptureMetric("traceway.sourcemap.raw.bytes", float64(rawStats.Bytes))

	parsedStats := services.ParsedSourceMapStats()
	traceway.CaptureMetric("traceway.sourcemap.parsed.entries", float64(parsedStats.Entries))
	traceway.CaptureMetric("traceway.sourcemap.parsed.parse_ms", parsedStats.LastParseMs)

	if !b.first {
		traceway.CaptureMetric("traceway.sourcemap.raw.hits.delta", float64(safeDelta(b.rawHits, rawStats.Hits)))
		traceway.CaptureMetric("traceway.sourcemap.raw.misses.delta", float64(safeDelta(b.rawMisses, rawStats.Misses)))
		traceway.CaptureMetric("traceway.sourcemap.raw.evictions.delta", float64(safeDelta(b.rawEvictions, rawStats.Evictions)))
		traceway.CaptureMetric("traceway.sourcemap.parsed.hits.delta", float64(safeDelta(b.parsedHits, parsedStats.Hits)))
		traceway.CaptureMetric("traceway.sourcemap.parsed.misses.delta", float64(safeDelta(b.parsedMisses, parsedStats.Misses)))
	}
	b.rawHits = rawStats.Hits
	b.rawMisses = rawStats.Misses
	b.rawEvictions = rawStats.Evictions
	b.parsedHits = parsedStats.Hits
	b.parsedMisses = parsedStats.Misses
	b.first = false

	traceway.CaptureMetric("traceway.cache.projects.entries", float64(cache.ProjectCache.Entries()))
	traceway.CaptureMetric("traceway.cache.metric_registry.entries", float64(repositories.MetricRegistryRepository.KnownCount()))
}

// Guards against counter resets across process/CH restart producing a huge
// uint64 underflow.
func safeDelta(prev, cur uint64) uint64 {
	if cur < prev {
		return cur
	}
	return cur - prev
}
