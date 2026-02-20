CREATE TABLE IF NOT EXISTS widget_group_widgets (
    id SERIAL PRIMARY KEY,
    widget_group_id INTEGER NOT NULL REFERENCES widget_groups(id) ON DELETE CASCADE,
    title VARCHAR(200) NOT NULL,
    widget_type VARCHAR(50) NOT NULL,
    config JSONB NOT NULL DEFAULT '{}',
    position INTEGER NOT NULL DEFAULT 0,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
