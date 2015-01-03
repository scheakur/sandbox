package main

import (
	"bufio"
	"fmt"
	"log"
	"os"

	"golang.org/x/text/encoding/japanese"
	"golang.org/x/text/transform"
)

func main() {
	var fp *os.File
	var err error

	if len(os.Args) < 2 {
		fp = os.Stdin
	} else {
		fp, err = os.Open(os.Args[1])
		if err != nil {
			log.Fatal(err)
		}
		defer fp.Close()
	}

	scanner := bufio.NewScanner(transform.NewReader(fp, japanese.ShiftJIS.NewDecoder()))
	for scanner.Scan() {
		fmt.Println(scanner.Text())
	}
	if err := scanner.Err(); err != nil {
		log.Fatal(err)
	}
}
