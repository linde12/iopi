package models

import "github.com/nvellon/hal"

type Response struct {
	Page  int
	Count int
}

func (r Response) GetMap() hal.Entry {
	return hal.Entry{
		"page":  r.Page,
		"count": r.Count,
	}
}
