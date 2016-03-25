package controllers

import (
	"ioboxrevel/app/models"

	"github.com/nvellon/hal"
	"github.com/revel/revel"
)

type App struct {
	*revel.Controller
}

func (c App) EntryPoint() revel.Result {
	api := hal.NewResource(models.API{"IOBox", "1.0"}, "/api")
	api.AddNewLink("users", "/api/users")
	api.AddNewLink("user", "/api/users/{id}")

	api.AddNewLink("ports", "/api/ports")
	api.AddNewLink("port", "/api/ports/{id}")

	api.AddNewLink("discovery", "/api/discovery")
	api.AddNewLink("discovery_lookup", "/api/discovery/{id}")

	api.AddNewLink("events", "/api/events")
	return c.RenderJson(api)
}
