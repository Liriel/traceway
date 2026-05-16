package main

import (
	"context"
	"encoding/json"
	"flag"
	"fmt"
	"net/http"
	"os"
	"os/signal"
	"strconv"
	"strings"
	"syscall"
	"time"
)

type config struct {
	target             string
	projectToken       string
	jwt                string
	projectId          string
	signal             string
	scenario           string
	duration           time.Duration
	stepDuration       time.Duration
	phase1BatchSizes   []int
	phase2RequestRates []float64
	phase1FixedRate    float64
	phase2BatchCap     int
	ingestErrThreshold float64
	fillLevels         []int64
	readThresholdMs    int
	settleSeconds      time.Duration
	fillBatchSize      int
	fillRequestRate    float64
	reportOut          string
	tier               string
	mode               string
}

func main() {
	var (
		cfg              config
		phase1BatchesStr string
		phase2RatesStr   string
		fillLevelsStr    string
	)

	flag.StringVar(&cfg.target, "target", "", "Base URL of the system under test (e.g. http://10.0.0.2 or http://localhost:8087)")
	flag.StringVar(&cfg.projectToken, "token", "", "Project bearer token for OTLP ingest endpoints")
	flag.StringVar(&cfg.jwt, "jwt", "", "JWT for read endpoints (required when --scenario=read-probe)")
	flag.StringVar(&cfg.projectId, "project-id", "", "Project UUID for read endpoints (required when --scenario=read-probe)")
	flag.StringVar(&cfg.signal, "signal", "", "Which signal to benchmark: spans | metrics | logs (required)")
	flag.StringVar(&cfg.scenario, "scenario", "throughput", "Scenario: throughput (default, two-phase ingest ramp) | read-probe (ingest to fill levels and probe a read)")
	flag.DurationVar(&cfg.duration, "duration", 30*time.Minute, "Total run duration cap")
	flag.DurationVar(&cfg.stepDuration, "step-duration", 2*time.Minute, "Per-step hold time (throughput scenario only)")
	flag.StringVar(&phase1BatchesStr, "phase1-batch-sizes", "256,1024,4096,8192,16384", "Comma-separated batch sizes for Phase 1 (throughput scenario)")
	flag.StringVar(&phase2RatesStr, "phase2-request-rates", "1,5,25,100,400", "Comma-separated request rates for Phase 2 (throughput scenario)")
	flag.Float64Var(&cfg.phase1FixedRate, "phase1-fixed-rate", 5, "Fixed request rate during Phase 1 (req/sec)")
	flag.IntVar(&cfg.phase2BatchCap, "phase2-batch-cap", 8192, "Cap on Phase 2 batch size; Phase 2 uses min(this, Phase 1 winner)")
	flag.Float64Var(&cfg.ingestErrThreshold, "ingest-err-threshold", 0.05, "Step fails if combined (HTTP error + OTLP rejected) item rate exceeds this")
	flag.StringVar(&fillLevelsStr, "fill-levels", "100000,1000000,10000000,100000000", "Comma-separated row counts to fill before probing a read (read-probe scenario)")
	flag.IntVar(&cfg.readThresholdMs, "read-threshold-ms", 5000, "Read latency threshold in ms; step fails if a probe exceeds it (read-probe scenario)")
	flag.DurationVar(&cfg.settleSeconds, "settle-seconds", 10*time.Second, "Wait between finishing ingest and probing the read (read-probe scenario)")
	flag.IntVar(&cfg.fillBatchSize, "fill-batch-size", 8192, "OTLP batch size used during the fill phase (read-probe scenario)")
	flag.Float64Var(&cfg.fillRequestRate, "fill-request-rate", 100, "OTLP request rate (req/sec) during the fill phase (read-probe scenario)")
	flag.StringVar(&cfg.reportOut, "report-out", "", "Path to write JSON results (required)")
	flag.StringVar(&cfg.tier, "tier", "local", "Hardware tier label embedded in output (e.g. ccx13)")
	flag.StringVar(&cfg.mode, "mode", "unknown", "DB mode label embedded in output (sqlite | pgch)")
	flag.Parse()

	if cfg.target == "" || cfg.projectToken == "" || cfg.reportOut == "" || cfg.signal == "" {
		fmt.Fprintln(os.Stderr, "missing required flag: --target, --token, --signal, --report-out")
		flag.Usage()
		os.Exit(2)
	}

	batches, err := parseInts(phase1BatchesStr)
	if err != nil {
		fmt.Fprintf(os.Stderr, "invalid --phase1-batch-sizes: %v\n", err)
		os.Exit(2)
	}
	rates, err := parseFloats(phase2RatesStr)
	if err != nil {
		fmt.Fprintf(os.Stderr, "invalid --phase2-request-rates: %v\n", err)
		os.Exit(2)
	}
	cfg.phase1BatchSizes = batches
	cfg.phase2RequestRates = rates

	fillLevels, err := parseInt64s(fillLevelsStr)
	if err != nil {
		fmt.Fprintf(os.Stderr, "invalid --fill-levels: %v\n", err)
		os.Exit(2)
	}
	cfg.fillLevels = fillLevels

	if _, err := pickSender(cfg.signal); err != nil {
		fmt.Fprintln(os.Stderr, err)
		os.Exit(2)
	}

	switch cfg.scenario {
	case "throughput":
	case "read-probe":
		if cfg.jwt == "" || cfg.projectId == "" {
			fmt.Fprintln(os.Stderr, "--scenario=read-probe requires --jwt and --project-id")
			os.Exit(2)
		}
	default:
		fmt.Fprintf(os.Stderr, "unknown --scenario %q (expected throughput|read-probe)\n", cfg.scenario)
		os.Exit(2)
	}

	ctx, cancel := signal.NotifyContext(context.Background(), syscall.SIGINT, syscall.SIGTERM)
	defer cancel()

	deadline := time.Now().Add(cfg.duration)
	ctx, cancelDeadline := context.WithDeadline(ctx, deadline)
	defer cancelDeadline()

	httpClient := &http.Client{
		Timeout: 30 * time.Second,
		Transport: &http.Transport{
			MaxIdleConns:        500,
			MaxIdleConnsPerHost: 200,
			IdleConnTimeout:     60 * time.Second,
		},
	}

	startedAt := time.Now().UTC()
	ingestStats := newLatencyTracker()
	ing, err := newIngester(cfg, httpClient, ingestStats)
	if err != nil {
		fmt.Fprintln(os.Stderr, err)
		os.Exit(2)
	}

	out := finalReport{
		Tier:      cfg.tier,
		Mode:      cfg.mode,
		Signal:    cfg.signal,
		Scenario:  cfg.scenario,
		StartedAt: startedAt.Format(time.RFC3339),
	}

	switch cfg.scenario {
	case "throughput":
		phase1 := runBatchSizeRamp(ctx, cfg, ing, ingestStats)
		phase2 := runRequestRateRamp(ctx, cfg, ing, ingestStats, phase1)
		out.Phase1 = &phase1
		out.Phase2 = &phase2
	case "read-probe":
		probe := runReadProbe(ctx, cfg, ing, ingestStats, httpClient)
		out.ReadProbe = &probe
	}
	out.EndedAt = time.Now().UTC().Format(time.RFC3339)
	out.computeHeadline()

	f, err := os.Create(cfg.reportOut)
	if err != nil {
		fmt.Fprintf(os.Stderr, "create %s: %v\n", cfg.reportOut, err)
		os.Exit(1)
	}
	defer f.Close()
	enc := json.NewEncoder(f)
	enc.SetIndent("", "  ")
	if err := enc.Encode(&out); err != nil {
		fmt.Fprintf(os.Stderr, "write %s: %v\n", cfg.reportOut, err)
		os.Exit(1)
	}
	switch cfg.scenario {
	case "throughput":
		fmt.Fprintf(os.Stderr, "wrote %s: signal=%s max sustainable %s/sec = %.0f\n",
			cfg.reportOut, cfg.signal, cfg.signal, out.MaxSustainableItemsPerSec)
	case "read-probe":
		fmt.Fprintf(os.Stderr, "wrote %s: signal=%s max fill level passed = %d rows\n",
			cfg.reportOut, cfg.signal, out.MaxFillLevelPassed)
	}
}

func parseInt64s(s string) ([]int64, error) {
	parts := strings.Split(s, ",")
	out := make([]int64, 0, len(parts))
	for _, p := range parts {
		p = strings.TrimSpace(p)
		if p == "" {
			continue
		}
		v, err := strconv.ParseInt(p, 10, 64)
		if err != nil {
			return nil, fmt.Errorf("parse %q: %w", p, err)
		}
		out = append(out, v)
	}
	if len(out) == 0 {
		return nil, fmt.Errorf("empty list")
	}
	return out, nil
}

func parseInts(s string) ([]int, error) {
	parts := strings.Split(s, ",")
	out := make([]int, 0, len(parts))
	for _, p := range parts {
		p = strings.TrimSpace(p)
		if p == "" {
			continue
		}
		v, err := strconv.Atoi(p)
		if err != nil {
			return nil, fmt.Errorf("parse %q: %w", p, err)
		}
		out = append(out, v)
	}
	if len(out) == 0 {
		return nil, fmt.Errorf("empty list")
	}
	return out, nil
}

func parseFloats(s string) ([]float64, error) {
	parts := strings.Split(s, ",")
	out := make([]float64, 0, len(parts))
	for _, p := range parts {
		p = strings.TrimSpace(p)
		if p == "" {
			continue
		}
		v, err := strconv.ParseFloat(p, 64)
		if err != nil {
			return nil, fmt.Errorf("parse %q: %w", p, err)
		}
		out = append(out, v)
	}
	if len(out) == 0 {
		return nil, fmt.Errorf("empty list")
	}
	return out, nil
}
