//go:build !chdb

package chdb

import "fmt"

func initEmbedded() error {
	return fmt.Errorf("embedded ClickHouse not available — rebuild with: go build -tags chdb")
}
