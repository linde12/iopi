package main

import (
	"fmt"
	"iobox/sd/mdns"
)

func main() {
	done := false
	resCh := make(chan *mdns.Result)
	doneCh := make(chan bool)
	mdns.Discover("_http._tcp", resCh, doneCh, 10)

	for !done {
		select {
		case res := <-resCh:
			fmt.Printf("Found service: %v, %v, %v\r\n",
				res.HostName,
				res.Port,
				res.Text)
		case done = <-doneCh:
		}
	}
}
