package mdns

import (
	"time"

	"github.com/noroutine/bonjour"
)

type Result bonjour.ServiceEntry

func Discover(service string, resultsCh chan *Result, doneCh chan bool, timeout int) error {
	entryCh := make(chan *bonjour.ServiceEntry)
	resolver, err := bonjour.NewResolver(nil)
	if err != nil {
		return err
	}

	go func(entries chan *bonjour.ServiceEntry, exitCh chan<- bool) {
		discover := true
		for discover {
			select {
			case entry := <-entries:
				res := Result(*entry)
				resultsCh <- &res
			case <-time.After(time.Second * time.Duration(timeout)):
				exitCh <- true
				doneCh <- true
				discover = false
			}
		}
	}(entryCh, resolver.Exit)

	err = resolver.Browse(service, "", entryCh)
	if err != nil {
		return err
	}

	return nil
}
