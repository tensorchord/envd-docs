package main

import (
	"os"
	"path/filepath"

	"github.com/sirupsen/logrus"

	"github.com/tensorchord/envd/pkg/app"
)

func main() {
	app := app.New()
	content, err := app.ToMarkdown()
	if err != nil {
		panic(err)
	}
	header := `
# envd CLI Reference

This is a reference for the CLI commands of envd.

::: tip
The documentation is auto-generated from [api package](https://github.com/tensorchord/envd/tree/main/envd/api), please do not edit it manually.
:::

`

	dir, err := os.Getwd()
	if err != nil {
		panic(err)
	}
	if err := os.WriteFile(
		filepath.Join(dir, "docs/api/cli/cli.md"), []byte(header+content), 0644); err != nil {
		panic(err)
	}
	logrus.Info("cli reference generated")
}
