package models

import "github.com/nvellon/hal"

type API struct {
	Name    string
	Version string
}

func (a API) GetMap() hal.Entry {
	return hal.Entry{
		"name":    a.Name,
		"version": a.Version,
	}
}
