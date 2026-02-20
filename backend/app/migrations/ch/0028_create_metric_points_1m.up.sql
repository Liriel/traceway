CREATE TABLE IF NOT EXISTS metric_points_1m (
    `project_id` UUID,
    `name` LowCardinality(String),
    `tags` Map(LowCardinality(String), String),
    `recorded_at` DateTime64(3),
    `min_val` AggregateFunction(min, Float64),
    `max_val` AggregateFunction(max, Float64),
    `sum_val` AggregateFunction(sum, Float64),
    `count_val` AggregateFunction(count)
) ENGINE = AggregatingMergeTree
PARTITION BY toYYYYMMDD(recorded_at)
ORDER BY (project_id, name, recorded_at, tags)
SETTINGS index_granularity = 8192
