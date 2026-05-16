package main

import (
	"context"
	"math/rand"
	"net/http"
	"sync"
	"sync/atomic"

	"golang.org/x/time/rate"
)

type ingester struct {
	cfg     config
	client  *http.Client
	stats   *latencyTracker
	sender  signalSender
	limiter *rate.Limiter

	batchSize      atomic.Int64
	requestRate    atomic.Int64 // requests/sec, scaled by 1e3 so we keep fractional resolution
	attemptedItems atomic.Int64
	rejectedItems  atomic.Int64

	// rng pool: each worker grabs one to avoid contending on the global source
	rngPool sync.Pool

	// workerWg + workerCancel let the ramp resize the pool between steps.
	workerWg     *sync.WaitGroup
	workerCancel context.CancelFunc
}

func newIngester(cfg config, client *http.Client, stats *latencyTracker) (*ingester, error) {
	sender, err := pickSender(cfg.signal)
	if err != nil {
		return nil, err
	}
	return &ingester{
		cfg:     cfg,
		client:  client,
		stats:   stats,
		sender:  sender,
		limiter: rate.NewLimiter(rate.Limit(1), 1),
		rngPool: sync.Pool{New: func() any { return rand.New(rand.NewSource(rand.Int63())) }},
	}, nil
}

func pickSender(signal string) (signalSender, error) {
	switch signal {
	case "spans":
		return spansSender{}, nil
	case "metrics":
		return metricsSender{}, nil
	case "logs":
		return logsSender{}, nil
	default:
		return nil, errUnknownSignal(signal)
	}
}

type errUnknownSignal string

func (e errUnknownSignal) Error() string {
	return "unknown signal: " + string(e) + " (expected spans|metrics|logs)"
}

func (i *ingester) Name() string {
	return i.sender.Name()
}

func (i *ingester) SetBatchSize(b int) {
	if b < 1 {
		b = 1
	}
	i.batchSize.Store(int64(b))
}

func (i *ingester) SetRequestRate(rps float64) {
	if rps < 0.001 {
		rps = 0.001
	}
	i.limiter.SetLimit(rate.Limit(rps))
	burst := int(rps) + 1
	if burst < 1 {
		burst = 1
	}
	i.limiter.SetBurst(burst)
	i.requestRate.Store(int64(rps * 1000))
}

func (i *ingester) RequestRate() float64 {
	return float64(i.requestRate.Load()) / 1000.0
}

// SnapshotAndResetItems returns attempted/rejected since the last call and
// resets them. Called at step boundaries alongside latencyTracker.
func (i *ingester) SnapshotAndResetItems() (attempted, rejected int64) {
	attempted = i.attemptedItems.Swap(0)
	rejected = i.rejectedItems.Swap(0)
	return
}

// Start launches the worker pool sized for the current request rate. Call Stop
// before changing the worker count via another Start.
func (i *ingester) Start(ctx context.Context) {
	workerCtx, cancel := context.WithCancel(ctx)
	wg := &sync.WaitGroup{}
	i.workerCancel = cancel
	i.workerWg = wg

	workers := workerCountFor(i.RequestRate())
	wg.Add(workers)
	for w := 0; w < workers; w++ {
		go func() {
			defer wg.Done()
			rng := i.rngPool.Get().(*rand.Rand)
			defer i.rngPool.Put(rng)
			for {
				if err := i.limiter.Wait(workerCtx); err != nil {
					return
				}
				batchSize := int(i.batchSize.Load())
				sendOneOTLP(workerCtx, i.client, i.cfg, i.sender, rng, batchSize, i.stats, &i.attemptedItems, &i.rejectedItems)
			}
		}()
	}
}

func (i *ingester) Stop() {
	if i.workerCancel != nil {
		i.workerCancel()
	}
	if i.workerWg != nil {
		i.workerWg.Wait()
	}
	i.workerCancel = nil
	i.workerWg = nil
}

// workerCountFor scales worker count with request rate. 256 workers idling on
// a 5 req/sec limiter is wasteful; on the other hand, a 400 req/sec target
// with 8 workers + a 200ms p99 leaves the limiter starved.
func workerCountFor(rps float64) int {
	n := int(rps * 2)
	if n < 8 {
		n = 8
	}
	if n > 256 {
		n = 256
	}
	return n
}
