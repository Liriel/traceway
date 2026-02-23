# Embedded Backend Example

> **WARNING: Linux and macOS only.**
> The embedded backend uses [chdb](https://github.com/chdb-io/chdb) (embedded ClickHouse), which does **not** support Windows.

A single-file Go example that runs the Traceway backend and an OTel-instrumented Gin app in one process. No external databases required — everything is embedded (SQLite + embedded ClickHouse).

## What it does

1. Starts the Traceway backend on `:8082` with a pre-seeded user and project
2. Configures an OTLP HTTP trace exporter that sends spans to the backend
3. Runs a Gin server on `:8080` with a single `/hello/:name` endpoint that creates a child span and optionally records an error

## Prerequisites

Install `libchdb` (the embedded ClickHouse C library). Supports macOS and Linux:

```bash
curl -sL https://lib.chdb.io | bash
```

## Running

```bash
go run .
```

Then try:

- `http://localhost:8080/hello/world` — successful request with a `db.lookup` span
- `http://localhost:8080/hello/error` — request that records an error with stack trace

Open the dashboard at `http://localhost:8082` and log in with `admin@localhost` / `admin` to see the traces.
