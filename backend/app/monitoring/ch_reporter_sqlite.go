//go:build !pgch

package monitoring

import "context"

func StartClickHouseReporter(_ context.Context) {}
