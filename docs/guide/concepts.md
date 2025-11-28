# `envd` Concepts

This doc describes concepts in the `envd`. The name `envd` is inspired by systemd. [^1]

[^1]: [Thread about the name on GitHub](https://github.com/tensorchord/envd/issues/2#issuecomment-1119175904).

## Concepts

The core abstractions in `envd` are **environments** and **images**. Images are built from the given `build.envd`s and follow [docker image spec](https://github.com/moby/docker-image-spec/blob/main/spec.md). Thus you can use the images built by `envd` with Docker directly.

Environments are containers run by docker, Kubernetes, or some other OCI runtime spec-compatible runtimes (e.g. runc, crun, containerd).

### Execution Model

`build.envd` is written in [Starlark](https://github.com/bazelbuild/starlark), a simplified dialect of Python 3. The default function `build()` will be invoked on startup.

```python
# build.envd
# The function `build` will be evaluated by default.
def build():
    # envd instructions here.
```

Functions like [`install.python_packages`](/api/starlark/v0/install#python_packages) and [`config.jupyter`](/api/starlark/v0/config#jupyter) can be used to register information. The information will be kept in a static graph in the memory. `envd` uses the static graph to build the environment at the `envd` of execution.

`envd` evaluates the `build` function with the starlark interpreter, thus you can use loops, if/else conditional execution or other statements in `build.envd`.

:::warning

Code below is for conceptual demonstration purposes only. Some features are not yet implemented.

:::


```python
# build.envd
# The function `build` will be evaluated by default.
def build():
    base(dev=True)
    install.conda()
    install.python()
    version = "2.9.1"
    dev_env(version, "zsh")

# Here is a new function and it is used in `build()`
def dev_env(version, custom_shell):
    install.python_packages(name=[
        "tensorflow=="+version,
        "tensorboard"
    ])
    config.jupyter()
    # Configure zsh if it is specified.
    if custom_shell == "zsh":
      shell("zsh")
```
