
# envd CLI Reference

This is a reference for the CLI commands of envd.

::: tip
The documentation is auto-generated from [envd app](https://github.com/tensorchord/envd/blob/main/pkg/app/app.go), please do not edit it manually.
:::

# NAME

envd - Development environment for data science and AI/ML teams

# SYNOPSIS

envd

```
[--analytics-enabled]
[--debug]
[--help|-h]
```

**Usage**:

```
envd [GLOBAL OPTIONS] command [COMMAND OPTIONS] [ARGUMENTS...]
```

# GLOBAL OPTIONS

**--analytics-enabled**: enable analytics

**--debug**: enable debug output in logs

**--help, -h**: show help


# COMMANDS

## bootstrap

Bootstrap the envd installation

**--buildkit, -b**: Download the image and bootstrap buildkit

**--dockerhub-mirror, -m**="": DockerHub mirror to use

**--registry, -r**="": Specify the registry to pull the image from (default: "docker.io")

**--registry-ca-keypair, --ca**="": Specify the ca/key/cert file path for the private registry (format: 'ca=/etc/config/ca.pem,key=/etc/config/key.pem,cert=/etc/config/cert.pem')

**--registry-config**="": Path to a JSON file containing registry configuration. Cannot be used with 'registry' or 'registry-ca-keypair'

**--ssh-keypair, -k**="": Manually specify ssh key pair as `publicKey,privateKey`. envd will generate a keypair at /home/runner/.config/envd/id_rsa_envd.pub and /home/runner/.config/envd/id_rsa_envd if not specified

**--use-http**: Use HTTP instead of HTTPS for the registry

**--with-autocomplete**: Add envd auto-completions

## run, c

Run the envd environment from the existing image

**--cpus**="": Request CPU resources (number of cores), such as 0.5, 1, 2

**--detach**: Detach from the container

**--gpu**="": Request GPU resources (number of gpus), such as 1, 2

**--host**="": Assign the host address for the environment SSH access server listening (default: "127.0.0.1")

**--image**="": image name (default: PROJECT:dev)

**--memory**="": Request Memory, such as 512M, 2G

**--name**="": environment name

**--path, -p**="": Working directory path to be used as project root (default: ".")

**--shm-size**="": Configure the shared memory size (megabyte) (default: 2048)

**--sync**: Sync the local directory with the remote container

**--timeout**="": Timeout of container creation (default: 30m0s)

**--volume, -v**="": Mount host directory into container

## completion

Install shell completion scripts for envd

**--no-install**: Only output the completion script and don't install it

**--shell, -s**="": Shell type to install completion

## context

Manage envd contexts

### create

Create envd context

**--builder**="": Builder to use (docker-container, kube-pod, tcp, unix, moby-worker, nerdctl-container) (default: "docker-container")

**--builder-address**="": Builder address (default: "envd_buildkitd")

**--name**="": Name of the context

**--runner**="": Runner to use(docker, envd-server) (default: "docker")

**--runner-address**="": Runner address

**--use**: Use the context

### ls

List envd contexts

**--format, -f**="": Format of output, could be "json" or "table" (default: "table")

### rm

Remove envd context

**--name**="": Name of the context

### use

Use the specified envd context

**--name**="": Name of the context

## build, b

Build the envd environment

**--export-cache, --ec**="": Export the cache (e.g. `type=registry,ref=<image>`). The default `moby-worker` builder doesn't support this unless the docker-ce has enabled the `containerd` image store. You can run `envd context create --name docker --builder docker-container --use` to use this feature.

**--force**: Force rebuild the image

**--from, -f**="": Function to execute, format `file:func` (default: "build.envd:build")

**--import-cache, --ic**="": Import the cache (e.g. `type=registry,ref=<image>`)

**--output, -o**="": Output destination (e.g. `type=tar,dest=path,push=true`)

**--path, -p**="": Path to the directory containing the build.envd (default: ".")

**--platform**="": Specify the target platforms for the build output (for example, "windows/amd64" or "linux/amd64,darwin/arm64").
Build images with same tags could cause image overwriting, platform suffixes will be added to differentiate the images. (default: linux/amd64)

**--tag, -t**="": Name and optionally a tag in the 'name:tag' format (default: PROJECT:dev)

**--use-proxy, --proxy**: Use HTTPS_PROXY/HTTP_PROXY/NO_PROXY in the build process

## destroy, down, d

Destroy the envd environment

**--name, -n**="": Name of the environment or container ID

**--path, -p**="": Path to the directory containing the build.envd (default: current directory)

## envs, env, e

Manage envd environments

### describe, d

Show details about environments, including dependencies and port binding

**--env, -e**="": Specify the envd environment to use (default: "envd-docs")

**--format, -f**="": Format of output, could be "json" or "table" (default: "table")

### list, ls, l

List envd environments

**--format, -f**="": Format of output, could be "json" or "table" (default: "table")

## images, image

Manage envd images

### describe, d

Show details about image, including dependencies

**--format, -f**="": Format of output, could be "json" or "table" (default: "table")

**--image, -i**="": Specify the image to use

### list, ls, l

List envd images

**--format, -f**="": Format of output, could be "json" or "table" (default: "table")

### prune

Remove unused images

### remove, r, rm

Remove an envd image

**--image, -i**="": Specify the image name to be removed

**--tag, -t**="": Remove the image with a specific tag (default: dev)

## init, i

Automatically generate the build.envd

**--force, -f**: overwrite the build.envd if existed

**--lang, -l**="": language usage. Support Python, R, Julia

**--path, -p**="": Path to the directory containing the build.envd (default: ".")

## login

Login to the envd server defined in the current context

**--password, -p**="": password

**--username, -u**="": the login name in envd server

## pause, p

Pause the envd environment

**--env, -e**="": Environment name

## prune

Clean up the build cache

**--all**: Include internal caches (oh-my-zsh, vscode extensions and other envd caches)

**--keep-duration**="": Keep data newer than this limit (default: 0s)

**--keep-storage**="": Keep data below this limit (in MB) (default: 0)

**--verbose**: Verbose output

## exec

Spawns a command installed into the environment.

**--command, -c**="": Command defined in build.envd to execute

**--from, -f**="": Function to execute, format `file:func` (default: "build.envd:build")

**--name, -n**="": Name of the environment

**--path, -p**="": Path to the directory containing the build.envd (default: ".")

**--raw, -r**="": Raw command to execute

## resume, r

Resume the envd environment

**--env, -e**="": Environment name

## up, u

Build and run the envd environment

**--cpu-set**="": Limit the specific CPUs or cores the environment can use, such as `0-3`, `1,3`

**--cpus**="": Request CPU resources (number of cores), such as 0.5, 1, 2

**--detach**: Detach from the container

**--export-cache, --ec**="": Export the cache (e.g. `type=registry,ref=<image>`). The default `moby-worker` builder doesn't support this unless the docker-ce has enabled the `containerd` image store. You can run `envd context create --name docker --builder docker-container --use` to use this feature.

**--force**: Force rebuild and run the container although the previous container is running

**--from, -f**="": Function to execute, format `file:func` (default: "build.envd:build")

**--gpu-set**="": GPU devices used in this environment, such as `all`, `'"device=1,3"'`, `count=2`(all to pass all GPUs). This will override the `--gpus`

**--gpus**="": Number of GPUs used in this environment, this will override the `config.gpu()` (default: 0)

**--host**="": Assign the host address for the environment SSH access server listening (default: "127.0.0.1")

**--import-cache, --ic**="": Import the cache (e.g. `type=registry,ref=<image>`)

**--memory**="": Request Memory, such as 512Mb, 2Gb

**--name**="": environment name

**--no-gpu**: Launch the CPU container even if it's a GPU image

**--path, -p**="": Path to the directory containing the build.envd (default: ".")

**--platform**="": Specify the target platform for the build output, (for example, windows/amd64, linux/amd64, or darwin/arm64) (default: linux/amd64)

**--shm-size**="": Configure the shared memory size (megabyte) (default: 2048)

**--tag, -t**="": Name and optionally a tag in the 'name:tag' format (default: PROJECT:dev)

**--timeout**="": Timeout of container creation (default: 30s)

**--use-proxy, --proxy**: Use HTTPS_PROXY/HTTP_PROXY/NO_PROXY in the build process

**--volume, -v**="": Mount host directory into container

## debug

Debug commands

### llb, b

dump buildkit LLB in human-readable format.

**--dot**: Output dot format

**--from, -f**="": Function to execute, format `file:func` (default: "build.envd:build")

**--path, -p**="": Path to the directory containing the build.envd (default: ".")

## version, v

Print envd version information

**--detail, -d**: Print details about the envd environment

**--format, -f**="": Format of output, could be "json" or "table" (default: "table")

**--short, -s**: Only print the version number

## top

Show statistics about the containers managed by the environment.

## reference

Print envd reference documentation

**--help, -h**: show help

**--output**="": Output file, if not specified, print to stderr

### help, h

Shows a list of commands or help for one command

## new, n

Create a new `build.envd` file from pre-defined templates

**--force, -f**: Overwrite the build.envd if existed

**--path, -p**="": Path to the directory of the build.envd (default: ".")

**--template, -t**="": Template name to use (`envd bootstrap` will add [torch, uv, conda])
