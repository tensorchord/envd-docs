# `envd` Contexts

This guide shows how contexts make it easy for a single `envd` CLI to manage multiple builder instances. You can also use `envd` to build the images in CI/CD systems with the help of `envd` contexts.

A single `envd` CLI can have multiple contexts. Each context contains the endpoint and security information required to manage different builder instances. A builder instance is responsible for building images and storing the building cache. A builder instance runs a separate [buildkit daemon](https://github.com/moby/buildkit).

The docker context command makes it easy to configure these contexts and switch between them.

## The anatomy of a context

There are the properties of a context:

- `name`: name of the context
- `builder`: type of the builder instance (`docker-container`, `kube-pod`, `tcp`)
- `builder-socket`: builder instance endpoint

Viewing the default context is the easiest way to see what a context looks like.

```bash
$ envd context ls
CONTEXT                 BUILDER                 SOCKET                            
default (current)       docker-container        docker-container://envd_buildkitd
```

This shows the default context. `envd` bootstraps a builder container instance `envd_buildkitd` in Docker, and uses it to execute all `envd` commands.

## Create a new context

A new context can be created with the `envd context create` command.

```bash
$ envd context create --name demo \
    --builder-socket buildkitd-demo --use --builder docker-container
INFO[2022-08-15T15:33:24+08:00] Context demo is created                      
INFO[2022-08-15T15:33:24+08:00] Current context is now "demo"       
```

The argument `--use` switches to the newly created context. Then all the commands issued by `envd` will run in the new context.

Or you can use `envd context use` command to switch between the existing contexts.

## Remove a context

A context can be removed with the `envd context rm` command.

```bash
$ envd context rm --name demo
```
