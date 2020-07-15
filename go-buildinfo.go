package main

import (
	"os"

	"github.com/daaku/buildinfo"
)

func main() {
	os.Stdout.Write(buildinfo.FullInfo())
}
