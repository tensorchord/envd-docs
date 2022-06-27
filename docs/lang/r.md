# Building an R Environment

This guide covers configuring R environments in `envd`. If you’re new to `envd` please read our [Tutorial](../get-started) and [build configuration guides](../build-envd) first.


## Specifying R

First, you can specify to use the R language in the `base` function.

```python title=build.envd
def build():
    base(os="ubuntu20.04", language="r")
```

## R packages

You can install R packages with `install.r_packages` function. The following example installs `remotes` and `rlang` packages:

```python title=build.envd
def build():
    base(os="ubuntu20.04", language="r")
    install.r_packages([
            "remotes",
            "rlang",
        ])
```

## Configuring CRAN Mirror

By default, the RStudio CRAN mirror `"https://cran.rstudio.com"` is used when downloading and installing R packages. However, you can specify any other mirrors via `config.cran_mirror()` like the following:

```python title=build.envd
def build():
    base(os="ubuntu20.04", language="r")
    config.cran_mirror(url="https://cloud.r-project.org/")
    install.r_packages([
            "remotes",
            "rlang",
        ])
```

## Specifying shell program

You can specify shell program used in the environment with `shell` function. The following example uses `zsh`:

```python title=build.envd
def build():
    base(os="ubuntu20.04", language="r")
    shell("zsh")
```

## Setting up RStudio server

Coming soon. Please stay tuned.
