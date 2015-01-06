package main

import (
	"encoding/json"
	"fmt"
	"log"
	"os"
)

type config struct {
	Foo string `json:"foo"`
	Bar string `json:"bar"`
	Baz string `json:"baz"`
}

func main() {
	cfg, err := loadConfig()
	if err != nil {
		log.Fatal(err)
	}

	fmt.Println(cfg.Foo)
	fmt.Println(cfg.Bar)
	fmt.Println(cfg.Baz)
}

func loadConfig() (*config, error) {
	f, err := os.Open(os.ExpandEnv("$HOME/.config/some/config.json"))
	if err != nil {
		return nil, err
	}
	defer f.Close()
	var cfg config
	err = json.NewDecoder(f).Decode(&cfg)
	if err != nil {
		return nil, err
	}
	return &cfg, nil
}
