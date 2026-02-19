CREATE MATERIALIZED VIEW IF NOT EXISTS metric_points_1d_mv TO metric_points_1d AS
SELECT
    project_id,
    name,
    tags,
    toStartOfDay(recorded_at) AS recorded_at,
    minState(value) AS min_val,
    maxState(value) AS max_val,
    sumState(value) AS sum_val,
    countState() AS count_val
FROM metric_points
GROUP BY project_id, name, tags, recorded_at
