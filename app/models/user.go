package models

import "github.com/nvellon/hal"

type User struct {
	Id        int
	Email     string
	Password  string
	Firstname string
	Lastname  string
}

func (a User) GetMap() hal.Entry {
	return hal.Entry{
		"id":        a.Id,
		"email":     a.Email,
		"firstname": a.Firstname,
		"lastname":  a.Lastname,
	}
}
