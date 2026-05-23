package main

import (
	"fmt"
	"time"

	"github.com/spf13/cobra"

	"github.com/tracewayapp/traceway/cli/internal/output"
	"github.com/tracewayapp/traceway/cli/pkg/client"
)

var endpointsOrderBy = []string{"impact", "count", "p95", "lastSeen"}

func newEndpointsCmd() *cobra.Command {
	cmd := &cobra.Command{
		Use:   "endpoints",
		Short: "Query HTTP endpoint performance",
	}
	cmd.AddCommand(newEndpointsListCmd())
	return cmd
}

func newEndpointsListCmd() *cobra.Command {
	cmd := &cobra.Command{
		Use:   "list",
		Short: "List endpoints with p50/p95/p99 latency stats",
		RunE:  runEndpointsList,
	}
	addTimeRangeFlags(cmd)
	addPaginationFlags(cmd)
	cmd.Flags().String("search", "", "Free-text search filter for endpoint names")
	cmd.Flags().String("order-by", "impact", "Sort field (impact, count, p95, lastSeen)")
	cmd.Flags().String("sort-direction", "desc", "Sort direction: asc or desc")
	return cmd
}

func runEndpointsList(cmd *cobra.Command, _ []string) error {
	ctx := cmd.Context()
	mode := output.ResolveMode(flagOutput, output.StdoutIsTerminal())

	sess, err := loadSession()
	if err != nil {
		return renderSessionError(cmd.ErrOrStderr(), mode, err)
	}
	tr, err := resolveTimeRange(cmd)
	if err != nil {
		return renderTimeRangeError(cmd.ErrOrStderr(), mode, err)
	}
	page := resolvePagination(cmd)
	search, _ := cmd.Flags().GetString("search")
	orderBy, _ := cmd.Flags().GetString("order-by")
	if err := validateEnumFlag("--order-by", orderBy, endpointsOrderBy); err != nil {
		return renderUsageError(cmd.ErrOrStderr(), mode, err.Error(),
			enumFlagHint("traceway endpoints list", "--order-by", endpointsOrderBy))
	}
	sortDir, _ := cmd.Flags().GetString("sort-direction")
	if err := validateEnumFlag("--sort-direction", sortDir, sortDirections); err != nil {
		return renderUsageError(cmd.ErrOrStderr(), mode, err.Error(),
			enumFlagHint("traceway endpoints list", "--sort-direction", sortDirections))
	}

	c := client.New(sess.URL, client.WithJWT(sess.JWT))
	resp, err := c.ListEndpoints(ctx, sess.ProjectID, client.ListEndpointsRequest{
		TimeRange:     tr,
		Pagination:    page,
		Search:        search,
		OrderBy:       orderBy,
		SortDirection: sortDir,
	})
	if err != nil {
		return renderAPIError(cmd.ErrOrStderr(), mode, err, false)
	}

	switch mode {
	case output.ModeJSON:
		return output.RenderJSON(cmd.OutOrStdout(), resp, output.ParseFieldsFlag(flagFields))
	case output.ModeYAML:
		return output.RenderYAML(cmd.OutOrStdout(), resp, output.ParseFieldsFlag(flagFields))
	default:
		tw := output.NewTabWriter(cmd.OutOrStdout())
		_, _ = fmt.Fprintln(tw, "ENDPOINT\tCOUNT\tP50\tP95\tP99\tIMPACT\tLAST SEEN")
		for _, e := range resp.Data {
			_, _ = fmt.Fprintf(tw, "%s\t%d\t%s\t%s\t%s\t%.2f\t%s\n",
				e.Endpoint, e.Count,
				formatDuration(e.P50Duration),
				formatDuration(e.P95Duration),
				formatDuration(e.P99Duration),
				e.Impact,
				e.LastSeen.Format("2006-01-02 15:04:05"),
			)
		}
		return tw.Flush()
	}
}

// formatDuration renders a Duration as a human-readable string.
// time.Duration's String() does this already (e.g. "50ms"); we just shorten
// for very small values.
func formatDuration(d time.Duration) string {
	if d == 0 {
		return "0"
	}
	return d.String()
}
