-- Test metric data for verifying widget types and aggregation methods
-- Run: clickhouse-client --multiquery < backend/test_metric_data.sql
-- Then visit /metrics with time range "3h" to see the data
--
-- Project ID: 5f6ca55f-a6b6-417e-b941-ee78d5fd5b6e
-- Duration: 3 hours, 30-second intervals = 360 points per metric

USE traceway;

-- 1. test.sine — Sine wave, 3 full cycles, range 10–90
-- Purpose: Line chart verification (smooth oscillation)
INSERT INTO metric_points (project_id, name, value, tags, recorded_at)
SELECT
    '5f6ca55f-a6b6-417e-b941-ee78d5fd5b6e' AS project_id,
    'test.sine' AS name,
    50 + 40 * sin(2 * pi() * 3 * number / 360) AS value,
    map('source', 'test') AS tags,
    now() - toIntervalSecond((360 - number) * 30) AS recorded_at
FROM numbers(360);

-- 2. test.ramp — Linear increase, range 0–100
-- Purpose: Area chart verification (triangular fill, steady climb)
INSERT INTO metric_points (project_id, name, value, tags, recorded_at)
SELECT
    '5f6ca55f-a6b6-417e-b941-ee78d5fd5b6e' AS project_id,
    'test.ramp' AS name,
    100 * number / 359 AS value,
    map('source', 'test') AS tags,
    now() - toIntervalSecond((360 - number) * 30) AS recorded_at
FROM numbers(360);

-- 3. test.stairs — 6 flat steps of 30 min each: 20→40→60→80→60→40
-- Purpose: Bar chart comparison, step rendering
INSERT INTO metric_points (project_id, name, value, tags, recorded_at)
SELECT
    '5f6ca55f-a6b6-417e-b941-ee78d5fd5b6e' AS project_id,
    'test.stairs' AS name,
    multiIf(
        step = 0, 20,
        step = 1, 40,
        step = 2, 60,
        step = 3, 80,
        step = 4, 60,
        40
    ) AS value,
    map('source', 'test') AS tags,
    now() - toIntervalSecond((360 - number) * 30) AS recorded_at
FROM (
    SELECT number, intDiv(number, 60) AS step
    FROM numbers(360)
);

-- 4. test.spikes — Baseline 10, spike to 90 every ~30 min (every 60th point)
-- Purpose: Aggregation test (avg≈15, min=10, max=90)
INSERT INTO metric_points (project_id, name, value, tags, recorded_at)
SELECT
    '5f6ca55f-a6b6-417e-b941-ee78d5fd5b6e' AS project_id,
    'test.spikes' AS name,
    if(number % 60 = 0, 90, 10) AS value,
    map('source', 'test') AS tags,
    now() - toIntervalSecond((360 - number) * 30) AS recorded_at
FROM numbers(360);

-- 5. test.multi_server — 3 sine waves with different phases (server=web-1/web-2/web-3)
-- Purpose: GroupBy test, should render 3 distinct colored lines

-- web-1: phase offset 0
INSERT INTO metric_points (project_id, name, value, tags, recorded_at)
SELECT
    '5f6ca55f-a6b6-417e-b941-ee78d5fd5b6e' AS project_id,
    'test.multi_server' AS name,
    50 + 40 * sin(2 * pi() * 2 * number / 360) AS value,
    map('source', 'test', 'server', 'web-1') AS tags,
    now() - toIntervalSecond((360 - number) * 30) AS recorded_at
FROM numbers(360);

-- web-2: phase offset 2π/3 (120°)
INSERT INTO metric_points (project_id, name, value, tags, recorded_at)
SELECT
    '5f6ca55f-a6b6-417e-b941-ee78d5fd5b6e' AS project_id,
    'test.multi_server' AS name,
    50 + 40 * sin(2 * pi() * 2 * number / 360 + 2 * pi() / 3) AS value,
    map('source', 'test', 'server', 'web-2') AS tags,
    now() - toIntervalSecond((360 - number) * 30) AS recorded_at
FROM numbers(360);

-- web-3: phase offset 4π/3 (240°)
INSERT INTO metric_points (project_id, name, value, tags, recorded_at)
SELECT
    '5f6ca55f-a6b6-417e-b941-ee78d5fd5b6e' AS project_id,
    'test.multi_server' AS name,
    50 + 40 * sin(2 * pi() * 2 * number / 360 + 4 * pi() / 3) AS value,
    map('source', 'test', 'server', 'web-3') AS tags,
    now() - toIntervalSecond((360 - number) * 30) AS recorded_at
FROM numbers(360);

-- 6. test.constant — Flat line at 42
-- Purpose: Single value shows "42", table shows all aggregations = 42
INSERT INTO metric_points (project_id, name, value, tags, recorded_at)
SELECT
    '5f6ca55f-a6b6-417e-b941-ee78d5fd5b6e' AS project_id,
    'test.constant' AS name,
    42 AS value,
    map('source', 'test') AS tags,
    now() - toIntervalSecond((360 - number) * 30) AS recorded_at
FROM numbers(360);

-- Total: 8 INSERT statements, 2880 rows (360 × 8)
--
-- Cleanup (run when done testing):
-- ALTER TABLE metric_points DELETE WHERE tags['source'] = 'test' AND project_id = '5f6ca55f-a6b6-417e-b941-ee78d5fd5b6e';
