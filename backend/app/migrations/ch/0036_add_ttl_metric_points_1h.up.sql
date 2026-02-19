ALTER TABLE metric_points_1h MODIFY TTL toDateTime(recorded_at) + INTERVAL 1 YEAR
