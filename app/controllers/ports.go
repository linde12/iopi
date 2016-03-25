package controllers

import (
	"fmt"
	"ioboxrevel/app"
	"ioboxrevel/app/models"
	"strconv"

	"github.com/nvellon/hal"
	"github.com/revel/revel"
)

type Ports struct {
	*revel.Controller
}

const onePort = "/api/ports/%v"

func (c Ports) List() revel.Result {
	ports := []models.Port{}

	rows, err := app.DB.Query("SELECT * FROM ports")
	defer rows.Close()
	if err != nil {
		revel.ERROR.Println("Error executing query", err)
	}
	for rows.Next() {
		var p models.Port
		err = rows.Scan(&p.Id, &p.CurrentState, &p.DefaultState, &p.Name)
		ports = append(ports, p)
	}

	api := hal.NewResource(models.Response{Count: len(ports)}, "/api/ports")
	for _, p := range ports {
		api.Embed("ports", hal.NewResource(p, fmt.Sprintf(onePort, p.Id)))
	}
	return c.RenderJson(api)
}

func (c Ports) Get(id int) revel.Result {
	var p models.Port
	err := app.DB.QueryRow("SELECT * FROM ports WHERE Id=?", id).
		Scan(&p.Id, &p.CurrentState, &p.DefaultState, &p.Name)
	if err != nil {
		revel.ERROR.Println("Error while selecting port:", err)
	}
	api := hal.NewResource(p, "/api/ports/"+strconv.Itoa(p.Id))
	return c.RenderJson(api)
}
