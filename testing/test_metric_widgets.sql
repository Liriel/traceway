-- PostgreSQL widget groups + widgets for the test metric data
-- Run: psql -d traceway -f backend/test_metric_widgets.sql
-- Requires: test_metric_data.sql loaded into ClickHouse first
--
-- Project ID: 5f6ca55f-a6b6-417e-b941-ee78d5fd5b6e

-- Step 1: Register test metrics
INSERT INTO metric_registry (project_id, name, metric_type, unit, description)
VALUES
    ('5f6ca55f-a6b6-417e-b941-ee78d5fd5b6e', 'test.sine', 'gauge', '', 'Sine wave, 3 cycles, range 10-90'),
    ('5f6ca55f-a6b6-417e-b941-ee78d5fd5b6e', 'test.ramp', 'gauge', '', 'Linear ramp 0-100'),
    ('5f6ca55f-a6b6-417e-b941-ee78d5fd5b6e', 'test.stairs', 'gauge', '', '6-step staircase'),
    ('5f6ca55f-a6b6-417e-b941-ee78d5fd5b6e', 'test.spikes', 'gauge', '', 'Baseline 10, spikes to 90'),
    ('5f6ca55f-a6b6-417e-b941-ee78d5fd5b6e', 'test.multi_server', 'gauge', '', '3 sine waves with server tag'),
    ('5f6ca55f-a6b6-417e-b941-ee78d5fd5b6e', 'test.constant', 'gauge', '', 'Flat line at 42')
ON CONFLICT (project_id, name) DO NOTHING;

-- Step 2: Create widget groups and widgets
DO $$
DECLARE
    pid UUID := '5f6ca55f-a6b6-417e-b941-ee78d5fd5b6e';
    g1_id INT;
    g2_id INT;
    g3_id INT;
BEGIN
    -- Group 1: Type Tests
    INSERT INTO widget_groups (project_id, name, description, is_default, created_by)
    VALUES (pid, 'Type Tests', 'One widget per chart type', false, NULL)
    RETURNING id INTO g1_id;

    INSERT INTO widget_group_widgets (widget_group_id, title, widget_type, config, position) VALUES
    (g1_id, 'Sine Wave', 'line_chart',
     '{"sources": [{"type": "metric", "name": "test.sine", "aggregation": "avg"}]}', 0),
    (g1_id, 'Ramp', 'area_chart',
     '{"sources": [{"type": "metric", "name": "test.ramp", "aggregation": "avg"}]}', 1),
    (g1_id, 'All Metrics', 'bar_chart',
     '{"sources": [{"type": "metric", "name": "test.sine", "aggregation": "avg"}, {"type": "metric", "name": "test.ramp", "aggregation": "avg"}, {"type": "metric", "name": "test.stairs", "aggregation": "avg"}, {"type": "metric", "name": "test.constant", "aggregation": "avg"}]}', 2),
    (g1_id, 'Constant', 'single_value',
     '{"sources": [{"type": "metric", "name": "test.constant", "aggregation": "avg"}]}', 3),
    (g1_id, 'Spikes', 'table',
     '{"sources": [{"type": "metric", "name": "test.spikes", "aggregation": "avg"}]}', 4);

    -- Group 2: Aggregations
    INSERT INTO widget_groups (project_id, name, description, is_default, created_by)
    VALUES (pid, 'Aggregations', 'Same metric with different aggregation methods', false, NULL)
    RETURNING id INTO g2_id;

    INSERT INTO widget_group_widgets (widget_group_id, title, widget_type, config, position) VALUES
    (g2_id, 'Spikes (avg)', 'line_chart',
     '{"sources": [{"type": "metric", "name": "test.spikes", "aggregation": "avg"}]}', 0),
    (g2_id, 'Spikes (max)', 'line_chart',
     '{"sources": [{"type": "metric", "name": "test.spikes", "aggregation": "max"}]}', 1),
    (g2_id, 'Spikes (min)', 'line_chart',
     '{"sources": [{"type": "metric", "name": "test.spikes", "aggregation": "min"}]}', 2),
    (g2_id, 'Spikes (count)', 'line_chart',
     '{"sources": [{"type": "metric", "name": "test.spikes", "aggregation": "count"}]}', 3);

    -- Group 3: Multi-Series
    INSERT INTO widget_groups (project_id, name, description, is_default, created_by)
    VALUES (pid, 'Multi-Series', 'GroupBy tag to split into multiple series', false, NULL)
    RETURNING id INTO g3_id;

    INSERT INTO widget_group_widgets (widget_group_id, title, widget_type, config, position) VALUES
    (g3_id, 'By Server', 'line_chart',
     '{"sources": [{"type": "metric", "name": "test.multi_server", "aggregation": "avg", "groupBy": "server"}]}', 0);
END $$;
