package main

import (
	"context"
	"fmt"
	"time"
)

type stepResult struct {
	Step                 int             `json:"step"`
	BatchSize            int             `json:"batchSize"`
	RequestRate          float64         `json:"requestRate"`
	AttemptedItemsPerSec float64         `json:"attemptedItemsPerSec"`
	ActualItemsPerSec    float64         `json:"actualItemsPerSec"`
	Rejected             int64           `json:"rejected"`
	Ingest               latencySnapshot `json:"ingest"`
	Passed               bool            `json:"passed"`
	FailReason           string          `json:"failReason,omitempty"`
}

type phaseResult struct {
	Kind             string       `json:"kind"`
	FixedRequestRate float64      `json:"fixedRequestRate,omitempty"`
	FixedBatchSize   int          `json:"fixedBatchSize,omitempty"`
	Steps            []stepResult `json:"steps"`
	MaxBatchSize     int          `json:"maxBatchSize,omitempty"`
	MaxRequestRate   float64      `json:"maxRequestRate,omitempty"`
}

type finalReport struct {
	Tier                      string           `json:"tier"`
	Mode                      string           `json:"mode"`
	Signal                    string           `json:"signal"`
	Scenario                  string           `json:"scenario"`
	StartedAt                 string           `json:"startedAt"`
	EndedAt                   string           `json:"endedAt"`
	Phase1                    *phaseResult     `json:"phase1,omitempty"`
	Phase2                    *phaseResult     `json:"phase2,omitempty"`
	ReadProbe                 *readProbeResult `json:"readProbe,omitempty"`
	MaxSustainableItemsPerSec float64          `json:"maxSustainableItemsPerSec,omitempty"`
	MaxFillLevelPassed        int64            `json:"maxFillLevelPassed,omitempty"`
}

func (r *finalReport) computeHeadline() {
	if r.Phase2 != nil {
		if r.Phase2.FixedBatchSize > 0 && r.Phase2.MaxRequestRate > 0 {
			r.MaxSustainableItemsPerSec = float64(r.Phase2.FixedBatchSize) * r.Phase2.MaxRequestRate
			return
		}
		// Fall back to the best actual measured throughput from any passing Phase 2
		// step — useful when Phase 2 had to round down or skipped steps.
		var best float64
		for _, s := range r.Phase2.Steps {
			if s.Passed && s.ActualItemsPerSec > best {
				best = s.ActualItemsPerSec
			}
		}
		r.MaxSustainableItemsPerSec = best
	}
	if r.ReadProbe != nil {
		r.MaxFillLevelPassed = r.ReadProbe.MaxFillLevelPassed
	}
}

// runBatchSizeRamp holds requestRate fixed (phase1FixedRate) and grows batch
// size step by step. Stops at the first failing step. Returns a phaseResult
// whose MaxBatchSize is the largest batch that passed.
func runBatchSizeRamp(ctx context.Context, cfg config, ing *ingester, ingest *latencyTracker) phaseResult {
	res := phaseResult{
		Kind:             "batch-size-ramp",
		FixedRequestRate: cfg.phase1FixedRate,
	}

	ing.SetRequestRate(cfg.phase1FixedRate)

	for idx, batch := range cfg.phase1BatchSizes {
		if ctx.Err() != nil {
			break
		}
		ing.SetBatchSize(batch)
		s := runOneStep(ctx, cfg, ing, ingest, idx+1, batch, cfg.phase1FixedRate)
		res.Steps = append(res.Steps, s)
		fmt.Fprintf(stderrPrefix(), "phase1 step %d: batch=%d rate=%.1f items/s=%.0f p99=%.0fms err=%.2f%% passed=%t %s\n",
			s.Step, s.BatchSize, s.RequestRate, s.ActualItemsPerSec, s.Ingest.P99, s.Ingest.ErrRate*100, s.Passed, s.FailReason)
		if !s.Passed {
			break
		}
		res.MaxBatchSize = batch
	}

	return res
}

// runRequestRateRamp holds batchSize fixed at min(phase1.MaxBatchSize, cfg.phase2BatchCap)
// and grows request rate step by step.
func runRequestRateRamp(ctx context.Context, cfg config, ing *ingester, ingest *latencyTracker, phase1 phaseResult) phaseResult {
	batch := phase1.MaxBatchSize
	if batch <= 0 {
		batch = cfg.phase2BatchCap
	}
	if batch > cfg.phase2BatchCap {
		batch = cfg.phase2BatchCap
	}

	res := phaseResult{
		Kind:           "request-rate-ramp",
		FixedBatchSize: batch,
	}
	if batch <= 0 {
		return res
	}

	ing.SetBatchSize(batch)

	for idx, rate := range cfg.phase2RequestRates {
		if ctx.Err() != nil {
			break
		}
		ing.SetRequestRate(rate)
		s := runOneStep(ctx, cfg, ing, ingest, idx+1, batch, rate)
		res.Steps = append(res.Steps, s)
		fmt.Fprintf(stderrPrefix(), "phase2 step %d: batch=%d rate=%.1f items/s=%.0f p99=%.0fms err=%.2f%% passed=%t %s\n",
			s.Step, s.BatchSize, s.RequestRate, s.ActualItemsPerSec, s.Ingest.P99, s.Ingest.ErrRate*100, s.Passed, s.FailReason)
		if !s.Passed {
			break
		}
		res.MaxRequestRate = rate
	}

	return res
}

// runOneStep resizes the worker pool for the new rate, holds the step for
// stepDuration, then snapshots latency + item counters. The worker pool is
// torn down between steps so worker count tracks the current rate.
func runOneStep(ctx context.Context, cfg config, ing *ingester, ingest *latencyTracker, stepNo, batchSize int, requestRate float64) stepResult {
	ingest.SnapshotAndReset()
	ing.SnapshotAndResetItems()

	ing.Start(ctx)

	stepCtx, cancel := context.WithTimeout(ctx, cfg.stepDuration)
	start := time.Now()
	<-stepCtx.Done()
	cancel()
	elapsed := time.Since(start)

	ing.Stop()

	snap := ingest.SnapshotAndReset()
	attempted, rejected := ing.SnapshotAndResetItems()

	var attemptedIps, actualIps float64
	if elapsed > 0 {
		attemptedIps = float64(attempted) / elapsed.Seconds()
		actualItems := attempted - rejected
		// Discount failed HTTP requests too — their items never made it in.
		if attempted > 0 {
			httpFailItems := int64(float64(snap.Errors) / float64(snap.OK+snap.Errors) * float64(attempted))
			actualItems -= httpFailItems
		}
		if actualItems < 0 {
			actualItems = 0
		}
		actualIps = float64(actualItems) / elapsed.Seconds()
	}

	passed, reason := evaluateStep(cfg, snap, attempted, rejected)

	return stepResult{
		Step:                 stepNo,
		BatchSize:            batchSize,
		RequestRate:          requestRate,
		AttemptedItemsPerSec: attemptedIps,
		ActualItemsPerSec:    actualIps,
		Rejected:             rejected,
		Ingest:               snap,
		Passed:               passed,
		FailReason:           reason,
	}
}

// evaluateStep combines HTTP-level error rate with OTLP partial-success
// rejections. A SUT that returns 200 OK but rejects half the items is failing
// just as surely as one that 500s.
func evaluateStep(cfg config, snap latencySnapshot, attempted, rejected int64) (bool, string) {
	totalReq := snap.OK + snap.Errors
	if totalReq == 0 {
		return false, "no requests completed"
	}
	httpErrRate := float64(snap.Errors) / float64(totalReq)
	var rejectRate float64
	if attempted > 0 {
		rejectRate = float64(rejected) / float64(attempted)
	}
	combined := httpErrRate + rejectRate
	if combined > cfg.ingestErrThreshold {
		return false, fmt.Sprintf("combined error rate %.2f%% (http %.2f%% + rejected %.2f%%) > %.2f%% threshold",
			combined*100, httpErrRate*100, rejectRate*100, cfg.ingestErrThreshold*100)
	}
	return true, ""
}
