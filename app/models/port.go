package models

import "github.com/nvellon/hal"

type Port struct {
	Id           int
	CurrentState int
	DefaultState int
	Name         string
}

func (a Port) GetMap() hal.Entry {
	return hal.Entry{
		"id":            a.Id,
		"current_state": a.CurrentState,
		"default_state": a.DefaultState,
		"name":          a.Name,
	}
}
