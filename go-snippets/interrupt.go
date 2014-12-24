package main

import (
	"bufio"
	"fmt"
	"os"
	"os/signal"
	"syscall"
)

func startup() {
	fmt.Printf("Hello, world!\n")
}

func cleanup() {
	fmt.Printf("\nBye, world...\n")
}

func handleInterrupt(hander func()) {
	c := make(chan os.Signal, 1)
	signal.Notify(c,
		syscall.SIGHUP,
		syscall.SIGINT,
		syscall.SIGTERM,
		syscall.SIGQUIT,
	)

	go func() {
		<-c
		hander()
		os.Exit(1)
	}()
}

func readPrintLoop() {
	buf := bufio.NewReader(os.Stdin)

	for {
		fmt.Print("> ")
		read, err := buf.ReadString('\n')
		if err != nil {
			fmt.Println(err)
			os.Exit(1)
		}

		input := string(read[0 : len(read)-1])
		fmt.Println(input + "?")
	}
}

func main() {
	fmt.Printf("Hello, world!\n")
	handleInterrupt(func() {
		fmt.Printf("\nBye, world...\n")
	})
	readPrintLoop()
}

