CREATE TABLE IF NOT EXISTS metric_registry (
    id SERIAL PRIMARY KEY,
    project_id UUID NOT NULL REFERENCES projects(id),
    name VARCHAR(300) NOT NULL,
    metric_type VARCHAR(20) NOT NULL DEFAULT 'gauge',
    unit VARCHAR(50) DEFAULT '',
    description TEXT DEFAULT '',
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    UNIQUE(project_id, name)
);
