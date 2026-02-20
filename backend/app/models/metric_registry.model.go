package models

import (
	"time"

	"github.com/google/uuid"
)

type MetricRegistry struct {
	Id          int       `json:"id" lit:"id"`
	ProjectId   uuid.UUID `json:"projectId" lit:"project_id"`
	Name        string    `json:"name" lit:"name"`
	MetricType  string    `json:"metricType" lit:"metric_type"`
	Unit        string    `json:"unit" lit:"unit"`
	Description string    `json:"description" lit:"description"`
	CreatedAt   time.Time `json:"createdAt" lit:"created_at"`
}
