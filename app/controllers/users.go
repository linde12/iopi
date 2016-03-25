package controllers

import (
	"fmt"
	"ioboxrevel/app"
	"ioboxrevel/app/models"
	"strconv"

	"github.com/nvellon/hal"
	"github.com/revel/revel"
)

type Users struct {
	*revel.Controller
}

const oneUser = "/api/users/%v"

func (c Users) List() revel.Result {
	users := []models.User{}

	rows, err := app.DB.Query("SELECT Id, Email, Password, Firstname, Lastname FROM users")
	defer rows.Close()
	if err != nil {
		revel.ERROR.Println("Error executing query", err)
	}
	for rows.Next() {
		var u models.User
		err = rows.Scan(&u.Id, &u.Email, &u.Password, &u.Firstname, &u.Lastname)
		users = append(users, u)
	}

	api := hal.NewResource(models.Response{Count: len(users)}, "/api/users")
	for _, u := range users {
		res := hal.NewResource(u, fmt.Sprintf(oneUser, u.Id))
		if u.Id == 2 {
			res.AddNewLink("addfriend", "/api/user/"+strconv.Itoa(u.Id)+"/addfriend")
		}
		api.Embed("users", res)
	}
	return c.RenderJson(api)
}

func (c Users) Get(id int) revel.Result {
	var u models.User
	err := app.DB.QueryRow("SELECT * FROM users WHERE Id=?", id).
		Scan(&u.Id, &u.Email, &u.Password, &u.Firstname, &u.Lastname)
	if err != nil {
		revel.ERROR.Println("Error while selecting user:", err)
	}
	api := hal.NewResource(u, "/api/users/"+strconv.Itoa(u.Id))

	return c.RenderJson(api)
}
