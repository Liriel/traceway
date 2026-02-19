ALTER TABLE metric_points_1m MODIFY TTL toDateTime(recorded_at) + INTERVAL 30 DAY
