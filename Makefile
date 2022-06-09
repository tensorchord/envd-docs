# Copyright 2022 envd Authors.
#
# The old school Makefile, following are required targets. The Makefile is written
# to allow building multiple binaries. You are free to add more targets or change
# existing implementations, as long as the semantics are preserved.

#
# Tweak the variables based on your project.
#

# This repo's root import path (under GOPATH).
ROOT := github.com/tensorchord/envd-docs

# Enable CGO by default.
CGO_ENABLED ?= 1

#
# These variables should not need tweaking.
#

# It's necessary to set this because some environments don't link sh -> bash.
export SHELL := bash

# It's necessary to set the errexit flags for the bash shell.
export SHELLOPTS := errexit

# Build direcotory.
BUILD_DIR := ./build

#
# Define all targets. At least the following commands are required:
#

# All targets.
.PHONY: generate-cli-ref build dev

generate-cli-ref:
	@go mod tidy
	@go run hack/generate-cli-ref.go

build: 
	@yarn build

dev:
	@yarn start
