package controllers

import (
	"bytes"
	"encoding/gob"
	"ioboxrevel/app"
	"ioboxrevel/app/mdns"
	"ioboxrevel/app/models"
	"strconv"
	"strings"

	"github.com/nvellon/hal"
	"github.com/revel/revel"
)

type Discovery struct {
	*revel.Controller
}

func (c Discovery) Create() revel.Result {
	res, err := app.DB.Exec("INSERT INTO discoveries VALUES(NULL, NULL)")
	if err != nil {
		revel.ERROR.Println("Error while creating discovery:", err)
	}

	type Result struct {
		Id int64
	}
	id, err := res.LastInsertId()

	go startDiscovery(id)
	result := Result{id}
	api := hal.NewResource(result, "/api/discovery")
	api.AddNewLink("discovery", "/api/discovery/"+strconv.FormatInt(id, 10))
	return c.RenderJson(api)
}

func (c Discovery) Get(id int) revel.Result {
	var entries []mdns.Result
	byteArr := new([]byte)

	var d models.Discovery
	err := app.DB.QueryRow("SELECT * FROM discoveries WHERE Id=?", id).
		Scan(&d.Id, &byteArr)
	if err != nil {
		revel.ERROR.Println("Error while selecting discovery:", err)
	}

	if byteArr != nil {
		mCache := bytes.NewBuffer(*byteArr)
		decCache := gob.NewDecoder(mCache)
		decCache.Decode(&entries)
		d.Services = entries
	} else {
		d.Services = []mdns.Result{}
	}
	api := hal.NewResource(d, "/api/discovery/"+strconv.Itoa(d.Id))
	return c.RenderJson(api)
}

func startDiscovery(id int64) {
	var entries []mdns.Result
	numDisc := 1
	done := false
	resCh := make(chan *mdns.Result)
	doneCh := make(chan bool)
	mdns.Discover("_services._dns-sd._udp", resCh, doneCh, 5)

	for !done {
		select {
		case res := <-resCh:
			name := strings.Replace(res.ServiceInstanceName(),
				".local._services._dns-sd._udp.local.",
				"", -1)
			numDisc++
			mdns.Discover(name, resCh, doneCh, 5)

			if res.ServiceRecord.Service != "_services._dns-sd._udp" {
				entries = append(entries, *res)
				updateDiscovery(id, &entries)
			}
		case <-doneCh:
			numDisc--
			if numDisc == 0 {
				done = true
				break
			}
		}
	}

	updateDiscovery(id, &entries)
}

func updateDiscovery(id int64, entries *[]mdns.Result) {
	mCache := new(bytes.Buffer)
	encCache := gob.NewEncoder(mCache)
	encCache.Encode(*entries)
	_, err := app.DB.Exec("UPDATE discoveries SET Services=? WHERE Id=?", mCache.Bytes(), id)
	if err != nil {
		revel.ERROR.Println("Error while creating discovery:", err)
	}
}
