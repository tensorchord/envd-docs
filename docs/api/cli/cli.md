
# envd CLI Reference

This is a reference for the CLI commands of envd.

# NAME

envd - Development environment for data science and AI/ML teams

# SYNOPSIS

envd

```
[--buildkitd-container-name]=[value]
[--buildkitd-image]=[value]
[--debug]
```

**Usage**:

```
envd [GLOBAL OPTIONS] command [COMMAND OPTIONS] [ARGUMENTS...]
```

# GLOBAL OPTIONS

**--buildkitd-container-name**="": buildkitd container to use for buildkitd (default: envd_buildkitd)

**--buildkitd-image**="": docker image to use for buildkitd (default: docker.io/moby/buildkit:v0.10.3)

**--debug**: enable debug output in logs


# COMMANDS

## bootstrap

Bootstraps envd installation including shell autocompletion and buildkit image download

**--buildkit, -b**: Download the image and bootstrap buildkit

**--dockerhub-mirror, -m**="": Dockerhub mirror to use

**--with-autocomplete**: Add envd autocompletions

**--registry, -r**: Specify the registry to pull/push the image

**--registry-ca-keypair, -ca**: Specify the ca/key/cert file path for the private registry.

Format:
'ca=/etc/config/ca.pem,key=/etc/config/key.pem,cert=/etc/config/cert.pem'

**--registry-config**: Path to a JSON file containing registry(s) configurations. Cannot be used with 'registry' or 'registry-ca-keypair'. Only name field is required.

Format:
{
    "registries": [
      {
        "name": "my_registry_1",
        "ca": "/etc/my_registry_1/ca.crt",
        "key": "",
        "cert": "",
        "use_http": false
      },
      {
        "name": "my_registry_2",
        "ca": "/etc/my_registry_2/ca.crt",
        "key": "",
        "cert": "",
        "use_http": false
      }
    ]
}


## build, b

build envd environment

**--file, -f**="": Name of the build.envd (default: build.envd)

**--output, -o**="": Output destination (format: type=tar,dest=path)

**--path, -p**="": Path to the directory containing the build.envd (default: .)

**--public-key, --pubk**="": Path to the public key (default: /home/runner/.config/envd/id_rsa_envd.pub)

**--tag, -t**="": Name and optionally a tag in the 'name:tag' format (default: PROJECT:dev)

## destroy, d

destroys the envd environment

**--name, -n**="": Name of the environment

**--path, -p**="": Path to the directory containing the build.envd

## get, g

Get images, or environments

### envs, env, e

List envd environments

#### deps, dep, d

List all dependencies

**--env, -e**="": Specify the envd environment to use

**--private-key, -k**="": Path to the private key (default: /home/runner/.config/envd/id_rsa_envd)

### images, image, i

List envd images

#### deps, dep, d

List all dependencies in the image

**--image, -i**="": Specify the image to use

## pause, p

pause the envd environment

**--env, -e**="": environment name

## resume, r

resume the envd environment

**--env, -e**="": environment name

## up, u

build and run the envd environment

**--detach**: detach from the container

**--file, -f**="": Name of the build.envd (default: build.envd)

**--path, -p**="": Path to the directory containing the build.envd (default: .)

**--private-key, -k**="": Path to the private key (default: /home/runner/.config/envd/id_rsa_envd)

**--public-key, --pubk**="": Path to the public key (default: /home/runner/.config/envd/id_rsa_envd.pub)

**--tag, -t**="": Name and optionally a tag in the 'name:tag' format (default: PROJECT:dev)

**--timeout**="": Timeout of container creation (default: 30s)

**--volume, -v**="": Mount host directory into container

## version, v

Print envd version information

**--short, -s**: Only print the version number

The documentation is auto-generated from [api package](https://github.com/tensorchord/envd/tree/main/envd/api), please do not edit it manually.
