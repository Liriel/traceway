CREATE MATERIALIZED VIEW IF NOT EXISTS metric_points_1h_mv TO metric_points_1h AS
SELECT
    project_id,
    name,
    tags,
    toStartOfHour(recorded_at) AS recorded_at,
    minState(value) AS min_val,
    maxState(value) AS max_val,
    sumState(value) AS sum_val,
    countState() AS count_val
FROM metric_points
GROUP BY project_id, name, tags, recorded_at
