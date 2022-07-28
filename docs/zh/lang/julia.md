# Building a Julia Environment

This guide covers configuring Julia environments in envd. If you’re new to envd please read our [Tutorial](/guide/getting-started) and [build configuration guides](/guide/build-envd) first.

## Specifying Julia

First, you can specify to use the Julia language in the `base` function.

<custom-title title="build.envd">

```python 
def build():
    base(os="ubuntu20.04", language="julia")
```

</custom-title>

## Julia packages

You can install Julia packages with `install.julia_packages` function. The following example installs `Example`:

<custom-title title="build.envd">

```python 
def build():
    base(os="ubuntu20.04", language="julia")
    install.julia_packages(name = [
        "Example",
    ])
```
</custom-title>

## Configure Julia package server

By default, the Julia package server `"pkg.julialang.org"` is used when downloading and installing Julia packages. However, you can specify any other servers via `config.julia_pkg_server()` like the following:

<custom-title title="build.envd">

```python 
def build():
    base(os="ubuntu20.04", language="julia")
    config.julia_pkg_server(url="https://mirrors.tuna.tsinghua.edu.cn/julia")
    install.julia_packages(name = [
        "Example",
    ])
```

</custom-title>

## Specifying shell program

You can specify shell program used in the environment with `shell` function. The following example uses `zsh`:

<custom-title title="build.envd">

```python 
def build():
    base(os="ubuntu20.04", language="julia")
    shell("zsh")
```

</custom-title>

## Specifying VSCode extensions

You can specify VSCode extensions with `install.vscode_extensions` function. The following example installs [`julialang.language-julia`](https://open-vsx.org/extension/julialang/language-julia)[^1]:

<custom-title title="build.envd">

```python 
def build():
    base(os="ubuntu20.04", language="julia")
    install.vscode_extensions(["julialang.language-julia"])
```

</custom-title>

[^1]: [open-vsx](https://open-vsx.org/) is used instead of Microsoft VSCode Marketplace due to [licensing issues](https://github.com/tensorchord/envd/issues/160).
