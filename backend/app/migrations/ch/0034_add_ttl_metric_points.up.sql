ALTER TABLE metric_points MODIFY TTL toDateTime(recorded_at) + INTERVAL 7 DAY
