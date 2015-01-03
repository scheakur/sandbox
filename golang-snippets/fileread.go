package main

import (
	"bufio"
	"fmt"
	"log"
	"os"

	"code.google.com/p/mahonia"
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

	scanner := bufio.NewScanner(mahonia.NewDecoder("Shift_JIS").NewReader(fp))
	for scanner.Scan() {
		fmt.Println(scanner.Text())
	}
	if err := scanner.Err(); err != nil {
		log.Fatal(err)
	}
}
