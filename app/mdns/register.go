package mdns

import (
	"fmt"
	"log"

	"github.com/noroutine/bonjour"
)

func Register(props map[string]string) {
	kvs := make([]string, len(props))

	i := 0
	for k, v := range props {
		kvs[i] = k + "=" + v
		i++
	}

	fmt.Println(kvs)
	_, err := bonjour.Register("iobox", "_iobox._tcp", "", 9999, kvs, nil)

	if err != nil {
		log.Print(err)
	}
}
