# Non-Root Tasks & AI Traces

## Problem

`backend/app/controllers/otelcontrollers/trace_converter.go:98` classifies a span as an Endpoint, Task, or AiTrace only when `isRoot := len(span.ParentSpanId) == 0`. Three real-world cases violate that assumption:

1. **Queue jobs with propagated trace context.** keepsuit's `QueueInstrumentation::recordJobProcessing` (`vendor/keepsuit/laravel-opentelemetry/src/Instrumentation/QueueInstrumentation.php:106`) — and the equivalents in `opentelemetry-instrumentation-celery`, Symfony Messenger without `messenger_root_spans: true`, etc. — calls `setParent($context)` on the worker's CONSUMER span using the trace context serialized into the job payload by the dispatcher. The consumer span has `parent_span_id = <producer span id>` from the originating request, so `isRoot == false`. It falls through to the generic `spans` table and the Tasks page stays empty.
2. **Child LLM spans.** A request span (root) makes an LLM call as a child span. The child has `gen_ai.*` attributes but a non-empty `parent_span_id`, so it never reaches the `aiTraces = append(...)` branch and the AI Traces page stays empty.
3. **Scheduled console commands.** keepsuit's `ConsoleInstrumentation` (`ConsoleInstrumentation.php:77-79`) emits a root span with kind INTERNAL (the OTel default — no `setSpanKind` call) and the `console.command` attribute. It has no HTTP attrs, so today it falls into the `else { continue }` branch and is dropped. zentigo runs `schedule:run`, `bookings:expire-unconfirmed`, and `bookings:send-reminders` under this instrumentation — all silently dropped.

All three are the same line. The fix promotes spans by their Kind / attributes instead of by their root-ness, and adds enough schema and UI to make the resulting non-root rows distinguishable from real roots.

## Approach

Two new columns on the entity tables, one ingestion change, and one query-time change:

- **`is_root Bool`** on `endpoints` / `tasks` / `ai_traces` — explicit because once `distributed_trace_id` is auto-filled from the OTel trace_id, both the root and its non-root siblings carry the same `distributed_trace_id` and "is_root" is no longer derivable from `distributed_trace_id IS NULL`.
- **`distributed_trace_id Nullable(UUID)`** on `ai_traces` (already exists on the other three) — populated from the OTel trace_id, not a vendor attribute, so it works for any OTLP source out of the box.
- **Converter promotes by Kind/attrs**, not by root-ness. Non-root entities get an id derived from their own `span_id` (not the shared OTel trace_id) so they don't collide with the root entity's id.
- **Spans are re-rooted at ingestion to their nearest enclosing entity within the batch.** `spans.trace_id` (and `exception_stack_traces.trace_id`) is repurposed from "OTel trace_id" to "owning entity id" so each waterfall query stays clean.

### Decisions

- **Drop the `isRoot` gate on _all_ classifications, including endpoints.** Non-root SERVER+HTTP spans (cross-service inbound hops) become endpoint rows with `is_root=false`. The "Non-root" chip applies to endpoints too.
- **Promote console spans to tasks.** Detect via the `console.command` attribute keepsuit attaches. Root INTERNAL spans without HTTP attrs that carry `console.command` become task rows.
- **Keep `rootFilter` on the endpoints API/page** — endpoints can now legitimately be non-root.
- **Tasks search ships in the same PR.** Today the tasks page has no search; this change adds it alongside `rootFilter`.

### Worked example (queue case)

OTel trace_id `X`, spans:
- `A` — SERVER, root, HTTP attrs — request handler
- `B` — PRODUCER, parent=`A` — `send queue`
- `C` — CONSUMER, parent=`B` — `process queue` (arrives in a separate worker OTLP batch)
- `D` — child of `C` — `SELECT …` (arrives in the worker's batch)

Resulting rows:

| | `id` | `distributed_trace_id` | `is_root` |
|---|---|---|---|
| endpoints | `otelTraceIDToUUID(A.trace_id)` = **X** | **X** | true |
| tasks | `otelSpanIDToUUID(C.span_id)` = **Y** | **X** | false |
| spans | `B`'s span_id, `trace_id = X` (owner = endpoint) | — | — |
| spans | `D`'s span_id, `trace_id = Y` (owner = task) | — | — |

`SELECT spans WHERE trace_id = X` returns `B` only. `SELECT spans WHERE trace_id = Y` returns `D` only. `FindByDistributedTraceId(X)` returns both the endpoint and the task.

### Worked example (inline gen_ai case)

`A` is a SERVER root, `L` is a child of `A` with `gen_ai.*` attrs. They arrive in the same batch.

| | `id` | `distributed_trace_id` | `is_root` |
|---|---|---|---|
| endpoints | `X` (from `A.trace_id`) | `X` | true |
| ai_traces | `otelSpanIDToUUID(L.span_id)` = `Z` | `X` | false |

Spans between `A` and `L` (e.g. middleware/DB spans) get `trace_id = X` (owner = endpoint). Anything that turns out to be a descendant of `L` (rare — LLM spans are usually leaves; tool-call children would be the case) gets `trace_id = Z`.

### Worked example (scheduled console command)

`bookings:send-reminders` runs under keepsuit's `ConsoleInstrumentation`. The span has kind INTERNAL, no parent, no HTTP attrs, and attribute `console.command = "bookings:send-reminders"`. Children include the database queries it issues.

| | `id` | `distributed_trace_id` | `is_root` |
|---|---|---|---|
| tasks | `otelTraceIDToUUID(trace_id)` = **X** | **X** | true |
| spans | each DB child, `trace_id = X` (owner = task) | — | — |

---

## Backend

### Migrations

ClickHouse — one statement per file (per project rule). Next free number is 0058:

- `0058_add_is_root_to_endpoints.up.sql`
  ```sql
  ALTER TABLE endpoints ADD COLUMN is_root Bool DEFAULT true
  ```
- `0059_add_is_root_to_tasks.up.sql`
  ```sql
  ALTER TABLE tasks ADD COLUMN is_root Bool DEFAULT true
  ```
- `0060_add_distributed_trace_id_to_ai_traces.up.sql`
  ```sql
  ALTER TABLE ai_traces ADD COLUMN distributed_trace_id Nullable(UUID) DEFAULT NULL
  ```
- `0061_add_distributed_trace_id_index_ai_traces.up.sql`
  ```sql
  ALTER TABLE ai_traces ADD INDEX idx_distributed_trace_id_ai_traces distributed_trace_id TYPE bloom_filter(0.001) GRANULARITY 1
  ```
- `0062_add_is_root_to_ai_traces.up.sql`
  ```sql
  ALTER TABLE ai_traces ADD COLUMN is_root Bool DEFAULT true
  ```

SQLite (`backend/app/migrations/sqlite_telemetry/`, next number is 0009). The SQLite migration runner splits on `;` (see `migrations_sqlite.go:80`), so a single multi-statement file is fine:

- `0009_add_is_root_and_distributed_trace_id.up.sql`
  ```sql
  ALTER TABLE endpoints ADD COLUMN is_root INTEGER NOT NULL DEFAULT 1;
  ALTER TABLE tasks ADD COLUMN is_root INTEGER NOT NULL DEFAULT 1;
  ALTER TABLE ai_traces ADD COLUMN is_root INTEGER NOT NULL DEFAULT 1;
  ALTER TABLE ai_traces ADD COLUMN distributed_trace_id TEXT DEFAULT NULL;
  ```

> Default `true`/`1` so backfill is correct — every existing row was promoted under the old `isRoot` gate, so it was a root span by definition.

### Models

`backend/app/models/endpoint.model.go`, `task.model.go`, `ai_trace.model.go`:

- Add `IsRoot bool \`json:"isRoot" ch:"is_root"\``
- For `AiTrace`, also add `DistributedTraceId *uuid.UUID \`json:"distributedTraceId,omitempty" ch:"distributed_trace_id"\``

Aggregate result models — `TaskStats`, `AiTraceStats`, `EndpointStats` (`models/*.go` and inline in repositories) gain `HasRoot bool` and `HasNonRoot bool` so the grouped list page can show the chip on names that contain at least one non-root run.

### Converter (`backend/app/controllers/otelcontrollers/trace_converter.go`)

Rewrite the per-span classification block (currently lines 92–178). Two passes inside the existing `for _, rs := range req.ResourceSpans` loop.

**Pass 1 — classify each span as one of `endpoint`, `task`, `ai_trace`, or `span`.** Drop the `isRoot` gate from all three entity branches. Rule table:

| Condition | Promoted to |
|---|---|
| `Kind ∈ {SERVER, INTERNAL}` AND `hasHTTPAttributes(attrs)` | endpoint |
| `Kind == CONSUMER` | task |
| `Kind == INTERNAL` AND attribute `console.command` is present AND `isRoot` | task |
| `hasGenAiAttributes(attrs)` | ai_trace |
| otherwise | (handled in pass 2) |

For each promoted entity, compute its id:
- `is_root = len(span.ParentSpanId) == 0`
- if root: `id = otelTraceIDToUUID(span.TraceId)` (preserves today's invariant that the root entity's id equals the OTel trace_id)
- if non-root: `id = otelSpanIDToUUID(span.SpanId)` (distinct from any root entity sharing the same trace)
- `distributed_trace_id = otelTraceIDToUUID(span.TraceId)` for **both** root and non-root (this is the change from "vendor attribute only" to "auto-derived"). The vendor attribute `traceway.distributed_trace_id` still wins if present, for backwards compatibility with manually-linked traces from the Go SDK.

Build `spanIdToEntityId map[string]uuid.UUID` from these promotions (keyed by `string(span.SpanId)`).

> Console rule rationale: keepsuit's `ConsoleInstrumentation.commandStarting` sets `console.command` explicitly (`ConsoleInstrumentation.php:78`). We don't use "any root INTERNAL with no HTTP attrs" because it would scoop up arbitrary manual roots from other instrumentations. `console.command` is a concrete signal.

**Pass 2 — emit span rows for the unpromoted spans, re-rooted to their nearest enclosing entity.**

For each unpromoted span, walk parents via `parentMap` until you find one in `spanIdToEntityId`. That entity's id becomes the span's `trace_id`. If no enclosing entity exists in this batch, fall back to `otelTraceIDToUUID(span.TraceId)` (preserves today's behavior for orphan spans whose parent was emitted from another process and never matched any promoted entity — they remain linkable via `distributed_trace_id` on the cross-trace page).

Skip emitting a span row for any span that was itself promoted to an entity (today, only root entities are skipped; the new logic skips all promoted entities including non-root ones).

**Exceptions.** `exc.TraceId` is set to the owning entity's id (the same value the span's `trace_id` would have gotten), not the raw OTel trace_id. `traceType` is `"endpoint"` / `"task"` / `"ai_trace"` based on which kind owned it. Exceptions on unpromoted spans use the entity walked up the parent chain.

### Repositories

Files to update — every read/write that touches `endpoints`, `tasks`, `ai_traces`, `exception_stack_traces`, or `spans`. Each has a ClickHouse variant (`*.repository.go`) and a SQLite variant (`*.repository_sqlite.go`).

- `endpoint.repository.go` + `endpoint.repository_sqlite.go`:
  - `BatchInsert` — add `is_root` to the INSERT column list and `Append` call.
  - `FindAll`, `FindGroupedByEndpoint`, `FindByEndpoint`, `FindById`, `FindByDistributedTraceId` — add `is_root` to SELECT and Scan.
  - Add `rootFilter` parameter to `FindGroupedByEndpoint` (`all` | `root` | `non_root`); when set to `root` add `AND is_root = true`, when `non_root` add `AND is_root = false`. Grouped projection includes `has_root = max(is_root)` and `has_non_root = max(NOT is_root)` so the list row can show the chip if any run in the group is non-root.
- `task.repository.go` + `task.repository_sqlite.go`:
  - Same as endpoints: `BatchInsert`, all reads, root filter on `FindGroupedByTaskName`, `has_root` / `has_non_root` in the grouped projection.
  - Add `search` parameter (substring match on `task_name` — `positionCaseInsensitive` in ClickHouse, `LIKE` lowercased in SQLite). Currently tasks have no search; this brings them in line with endpoints.
  - Add `FindByDistributedTraceId(ctx, distributedTraceId, projectIds)` — mirrors `EndpointRepository.FindByDistributedTraceId`.
- `ai_trace.repository.go` + `ai_trace.repository_sqlite.go`:
  - `BatchInsert` — add `is_root` and `distributed_trace_id` columns.
  - All reads — add `is_root` and `distributed_trace_id` to SELECT/Scan.
  - Same `rootFilter` parameter + grouped projection as tasks.
  - Add `FindByDistributedTraceId` (mirrors `EndpointRepository.FindByDistributedTraceId`).
- `exception_stack_trace.repository.go` + `_sqlite`:
  - No schema change here — `trace_id` already exists. Only the value being stored changes (owning entity id, not raw OTel trace_id). Existing callers don't need to change.
- `span.repository.go` + `_sqlite`:
  - No schema change. `FindByTraceId(projectId, traceId)` still works — it will now be called with `endpoint.id` or `task.id` or `ai_trace.id` (the owning entity id), all of which are valid values to look up.

### Controllers

- `tasks.controller.go` — `FindGrouped` accepts new request fields `search string` and `rootFilter string`. Forward both to the repository. Emit `hasRoot` / `hasNonRoot` per row in the response.
- `ai_trace.controller.go` — same change as tasks (search already exists, just add `rootFilter` + `hasRoot` / `hasNonRoot`).
- `endpoints.controller.go` — `FindGrouped` accepts new `rootFilter` field. (Search already exists.) Emit `hasRoot` / `hasNonRoot` per row.
- `distributed_trace.controller.go` — add a third call to `repositories.AiTraceRepository.FindByDistributedTraceId` and emit `ai_trace` nodes in the response alongside `endpoint` and `task`. Render in the same `Nodes` list.
- Detail controllers (`endpoint.controller.go`, `task.controller.go`, `ai_trace.controller.go`) — include `isRoot` and `distributedTraceId` in their JSON responses so the detail pages can render the chip and the cross-trace link.

### Tests

`trace_converter_test.go` additions:

1. CONSUMER span with non-empty `ParentSpanId` →
   - one row in `tasks` with `is_root == false`, `id == otelSpanIDToUUID(span.SpanId)`, `distributed_trace_id == otelTraceIDToUUID(span.TraceId)`
   - no row in `endpoints`
   - any child spans in the batch land in `spans` with `trace_id == task.id`
2. Child span with `gen_ai.*` attrs under a SERVER root, both in one batch →
   - root endpoint row with `is_root == true`, `id == distributed_trace_id == otelTraceIDToUUID(trace_id)`
   - ai_trace row with `is_root == false`, `id == otelSpanIDToUUID(child.SpanId)`, same `distributed_trace_id` as the endpoint
   - intermediate spans (if any) get `trace_id == endpoint.id`; descendants of the ai_trace span get `trace_id == ai_trace.id`
3. Root INTERNAL span carrying `console.command` attribute, no HTTP attrs →
   - one row in `tasks` with `is_root == true`, `id == otelTraceIDToUUID(span.TraceId)`
   - child spans get `trace_id == task.id`
4. Non-root SERVER+HTTP span (cross-service inbound hop) →
   - one row in `endpoints` with `is_root == false`, `id == otelSpanIDToUUID(span.SpanId)`
5. Existing test — root SERVER + HTTP → endpoint with `is_root == true` — must still pass unchanged.
6. Exception event on the consumer span → `exc.TraceId == task.id`, `exc.TraceType == "task"`.
7. Orphan span whose parent isn't in the batch and which isn't itself promoted → falls back to `trace_id = otelTraceIDToUUID(span.TraceId)` (the OTel trace_id). Document this fallback in the test name.

Repository tests (`endpoint_repository_test.go`, `task_repository_test.go`, the soon-to-exist `ai_trace_repository_test.go`):
- `is_root` round-trips through insert + select.
- `rootFilter` parameter narrows results correctly (`all` / `root` / `non_root`).
- Grouped queries surface `has_root` and `has_non_root`.
- Task `search` parameter filters by task name substring.

---

## Frontend

### Shared component

New `frontend/src/lib/components/ui/root-filter/root-filter.svelte` — a `Select.Root` matching the existing inline-select styling, dropped via the SearchBar's `children` snippet so it joins the bar visually (mirroring how `issues/+page.svelte` uses `typeOptions`).

Options:
```ts
const rootFilterOptions = [
    { value: 'all', label: 'All' },
    { value: 'root', label: 'Root' },
    { value: 'non_root', label: 'Non-root' }
];
```

URL param `rootFilter` (`all` is the default and is omitted from the URL, matching how `searchType` is handled on the issues page).

### Chip

New `frontend/src/lib/components/ui/non-root-chip/non-root-chip.svelte` — small `Badge variant="secondary"` reading `Non-root` (or `Mixed` when both `hasRoot` and `hasNonRoot` are true), with tooltip "Triggered by another trace — see the distributed trace view." Rendered:
- On Endpoint, Task, and AI Trace list rows where `hasNonRoot && !hasRoot` ("Non-root") or where both flags are true ("Mixed").
- On detail pages (`/endpoints/[endpoint]/[id]`, `/tasks/[task]/[id]`, `/ai-traces/[traceName]/[id]`) next to the title when the specific instance being displayed has `isRoot === false`.

### `frontend/src/routes/tasks/+page.svelte`

Currently has no search. Add:
- `searchQuery` state + URL persistence (`?search=…`), copying the pattern from `ai-traces/+page.svelte` lines 62–112.
- `rootFilter` state + URL persistence (`?rootFilter=root` etc.).
- `<SearchBar placeholder="Search tasks..." bind:value={searchQuery} onSearch={handleSearch}>` wrapping the new `<RootFilter bind:value={rootFilter} />` in its `children` snippet.
- Send `search` and `rootFilter` in the `/tasks/grouped` POST body.
- Render `<NonRootChip mixed={task.hasRoot && task.hasNonRoot} />` next to `task.taskName` when `task.hasNonRoot` is true.

`/tasks/[task]/+page.svelte` (instance list): pass `rootFilter` through to `/tasks/task` and render the chip per-row using each instance's `isRoot`.

### `frontend/src/routes/ai-traces/+page.svelte`

Already has search. Add:
- `rootFilter` state + URL persistence.
- Pass the filter via the SearchBar `children` snippet (same as tasks).
- Send `rootFilter` in the API call.
- Render `<NonRootChip>` next to `trace.traceName` when `trace.hasNonRoot`.

`/ai-traces/[traceName]/+page.svelte` — chip per instance row using `aiTrace.isRoot`.

### `frontend/src/routes/endpoints/+page.svelte`

- `rootFilter` state + URL persistence (endpoints can now be non-root after this change).
- Render `<NonRootChip>` next to the endpoint name when `endpoint.hasNonRoot`.

`/endpoints/[endpoint]/+page.svelte` — chip per instance row using `endpoint.isRoot`.

### Distributed-trace page

Wherever `DistributedTraceResponse.Nodes` are rendered, add a case for `traceType === "ai_trace"` so the new third entity type shows up alongside endpoints and tasks. Reuse the existing node card styling.

### Detail pages — cross-trace link

On `/tasks/[task]/[id]`, `/ai-traces/[traceName]/[id]`, and `/endpoints/[endpoint]/[id]`, when `distributedTraceId` is set and there are sibling entities, show a "View distributed trace" link to `/distributed-traces/<distributedTraceId>`. (Today this link is only meaningful when the vendor attribute was set; after this change it's meaningful for every OTel-sourced trace.)

---

## Verification

1. **Unit/integration tests** — `cd backend && go test ./...` covers converter + repo round-trips on both ClickHouse and SQLite paths.
2. **End-to-end against a real Laravel/keepsuit app (zentigo is the canonical reproduction):**
   - Build backend on this branch, point the app at it via `OTEL_EXPORTER_OTLP_ENDPOINT`.
   - **Queue task (non-root):** `php artisan tinker --execute='\App\Jobs\TestTracewayJob::dispatch();'`, then run a queue worker. Confirm a new row appears on `/tasks` with the **Non-root** chip. Open it and confirm the "View distributed trace" link reaches a page showing both endpoint (dispatcher request) and task (worker) nodes.
   - **Console task (root):** `php artisan bookings:send-reminders`. Confirm a Tasks row with the command name, no chip (root).
   - **HTTP+queue together:** trigger a request that dispatches a notification (e.g. `NewReviewNotification`). On the endpoint detail page confirm the cross-trace link; on the distributed-trace view confirm both nodes.
   - **AI trace (non-root):** easiest is a synthetic OTLP payload (`curl` a hand-rolled JSON with a SERVER root and a child span carrying `gen_ai.system="openai"` etc.). Confirm the AI Traces page shows the child with the chip and that the cross-trace view includes endpoint + ai_trace nodes.
3. **`rootFilter` UI** — toggle the dropdown on `/tasks`, `/ai-traces`, `/endpoints` and confirm URL persistence (`?rootFilter=non_root` etc., `all` omitted from URL).
4. **Backfill sanity** — after migration run, query `SELECT count(), sum(is_root) FROM endpoints / tasks / ai_traces`; both numbers should match (every row defaults to `is_root=1`).

---

## Migration / Backfill Notes

- All existing rows default to `is_root = true` — correct because the old converter only ever inserted root spans.
- `ai_traces.distributed_trace_id` is `NULL` on existing rows. That's fine — the cross-trace lookup degrades gracefully and there's no UI that requires it to be present on historical rows.
- The change to `spans.trace_id` semantics (owning entity id, not OTel trace_id) is forward-only — existing span rows still have OTel trace_id stored there, which equals the endpoint's id for the single-process case (the only case the old converter produced), so existing waterfalls keep working.

---

## Out of Scope

- Cross-service SERVER hops where you'd want one node per hop in the cross-trace view — endpoints now accept non-root SERVER spans, but the UX for showing per-hop endpoint nodes (e.g., a tree view of cross-service requests) is a separate decision.
- Reconciling the legacy `/api/report` distributed-trace flow with the new auto-derivation. The Go SDK's opt-in `distributedTraceId` field on `clientmodels` continues to work unchanged.
- A "show me only the root trace" view at the distributed-trace page — current behavior shows everything, which is what users want for debugging.
