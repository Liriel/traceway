package models

import (
	"github.com/tracewayapp/lit"
)

var ExtensionModelRegistrations []func()

type metricRegistryNaming struct{ lit.DefaultDbNamingStrategy }

func (metricRegistryNaming) GetTableNameFromStructName(string) string {
	return "metric_registry"
}

func Init() {
	lit.RegisterModel[Project](lit.PostgreSQL)
	lit.RegisterModel[User](lit.PostgreSQL)
	lit.RegisterModel[Organization](lit.PostgreSQL)
	lit.RegisterModel[OrganizationUser](lit.PostgreSQL)
	lit.RegisterModel[OrganizationMember](lit.PostgreSQL)
	lit.RegisterModel[Invitation](lit.PostgreSQL)
	lit.RegisterModel[InvitationWithInviter](lit.PostgreSQL)
	lit.RegisterModel[UserOrganizationResponse](lit.PostgreSQL)
	lit.RegisterModel[CountResult](lit.PostgreSQL)
	lit.RegisterModel[SourceMap](lit.PostgreSQL)
	lit.RegisterModelWithNaming[MetricRegistry](lit.PostgreSQL, metricRegistryNaming{})
	lit.RegisterModel[WidgetGroup](lit.PostgreSQL)
	lit.RegisterModel[WidgetGroupWidget](lit.PostgreSQL)

	for _, register := range ExtensionModelRegistrations {
		register()
	}
}
