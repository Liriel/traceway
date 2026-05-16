#!/usr/bin/env bash
# Reset the bench database on a managed ClickHouse to an empty state so each
# matrix entry starts from a clean baseline. Reads from the environment:
#   CLICKHOUSE_SERVER       host:nativePort (e.g. cluster.clickhouse.cloud:9440)
#   CLICKHOUSE_USERNAME
#   CLICKHOUSE_PASSWORD
#   CLICKHOUSE_DATABASE     default: traceway
#   BENCH_CH_HTTPS_PORT     default: 8443 (CH Cloud uses 8443; some hosts 8123)
#
# The HTTPS interface lives on the same hostname as the native port, just on a
# different port. We strip the native port off CLICKHOUSE_SERVER to get the
# host, then talk to it over HTTPS.
set -euo pipefail

: "${CLICKHOUSE_SERVER:?required for managed-ch mode}"
: "${CLICKHOUSE_USERNAME:?required for managed-ch mode}"
: "${CLICKHOUSE_PASSWORD:?required for managed-ch mode}"
DB="${CLICKHOUSE_DATABASE:-traceway}"

CH_HOST="${CLICKHOUSE_SERVER%:*}"
CH_HTTPS_PORT="${BENCH_CH_HTTPS_PORT:-8443}"
URL="https://${CH_HOST}:${CH_HTTPS_PORT}/"

echo "resetting managed CH database '${DB}' on ${CH_HOST}:${CH_HTTPS_PORT}" >&2
curl -fsSL --max-time 30 -u "${CLICKHOUSE_USERNAME}:${CLICKHOUSE_PASSWORD}" \
    "${URL}" --data-binary "DROP DATABASE IF EXISTS \`${DB}\`"
curl -fsSL --max-time 30 -u "${CLICKHOUSE_USERNAME}:${CLICKHOUSE_PASSWORD}" \
    "${URL}" --data-binary "CREATE DATABASE \`${DB}\`"
echo "managed CH '${DB}' is empty" >&2
