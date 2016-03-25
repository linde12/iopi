package models

import "github.com/nvellon/hal"
import "mdns"

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
