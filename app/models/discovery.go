package models

import (
	"iobox/sd/mdns"

	"github.com/nvellon/hal"
)

type Discovery struct {
	Id       int
	Services []mdns.Result
}

func (a Discovery) GetMap() hal.Entry {
	return hal.Entry{
		"id":       a.Id,
		"services": a.Services,
	}
}
