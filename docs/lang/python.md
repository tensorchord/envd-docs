# Building a Python Environment

This guide covers configuring Python environments in `envd`. If you’re new to `envd` please read our [Tutorial](/guide/getting-started) and [build configuration guides](/guide/build-envd) first.

Let's begin 🐍!

## Specifying Python

The default language in `envd` is Python, thus there is no need to specify language. Or you can use `base` function to specify.

<custom-title title="build.envd">

```python
def build():
    base(os="ubuntu20.04", language="python")
```

</custom-title>

The default version of python in `envd` is 3.9 (the latest patch version can be referred [here](https://anaconda.org/anaconda/python/files)). If you need to specify a particular version, just assign `language` to a string like `pythonX.Y.Z`:

<custom-title title="build.envd">

```python
def build():
    base(os="ubuntu20.04", language="python3.11")
```

</custom-title>

:::warning
Python2 is not supported in `envd`.
:::

## Conda packages

You can install conda packages with `install.conda_packages` function. The following example installs `numpy` and `scipy`:

<custom-title title="build.envd">

```python 
def build():
    base(os="ubuntu20.04", language="python")
    install.conda_packages(name = [
        "numpy",
        "scipy",
    ])
```
</custom-title>

## PyPI packages

You can install Python packages from PyPI with `install.python_packages` function. The following example installs `scikit-learn` and `matplotlib`:

<custom-title title="build.envd">

```python 
def build():
    base(os="ubuntu20.04", language="python")
    install.python_packages(name = [
        "scikit-learn",
        "matplotlib",
    ])
```

</custom-title>

`envd` uses system-wide [pip](https://pip.pypa.io/) to install Python packages in the previous example.

If conda is enabled, you can also install Python packages from PyPI with `install.python_packags` function. The following example installs `numpy` and `scipy` with conda, and installs `scikit-learn` and `matplotlib` with pip:

<custom-title title="build.envd">

```python 
def build():
    base(os="ubuntu20.04", language="python")
    install.conda_packages(name = [
        "numpy",
        "scipy",
    ])
    install.python_packages(name = [
        "scikit-learn",
        "matplotlib",
    ])
```

</custom-title>

`envd` uses pip in the current conda environment to install the packages in this example.

## Specifying shell program

You can specify shell program used in the environment with `shell` function. The following example uses `zsh`:

<custom-title title="build.envd">

```python 
def build():
    base(os="ubuntu20.04", language="python")
    shell("zsh")
```
</custom-title>

## Specifying VSCode extensions

You can specify VSCode extensions with `install.vscode_extensions` function. The following example installs [`ms-python.python`](https://open-vsx.org/extension/ms-python/python)[^1]:

<custom-title title="build.envd">

```python 
def build():
    base(os="ubuntu20.04", language="python")
    install.vscode_extensions(["ms-python.python"])
```
</custom-title>

[^1]: [open-vsx](https://open-vsx.org/) is used instead of Microsoft VSCode Marketplace due to [licensing issues](https://github.com/tensorchord/envd/issues/160).

## Setting up the Jupyter notebook

You can set up the Jupyter notebook with `config.jupyter` function. The following example sets up a Jupyter notebook:

<custom-title title="build.envd">

```python 
def build():
    base(os="ubuntu20.04", language="python")
    # Use `config.jupyter()` 
    # if you do not need to set up password.
    config.jupyter(token="password")
```

</custom-title>

![jupyter](/guide/assets/jupyter.png)

## Setting up PyPI index mirror

Mirroring or caching of PyPI can be used to speed up local package installation, allow offline work, handle corporate firewalls or just plain Internet flakiness.

PyPI index mirror can be set with `config.pip_index(url="<index>", extra_url=<extra>)`:

<custom-title title="pip index mirror">

```python
config.pip_index(url="https://pypi.tuna.tsinghua.edu.cn/simple")
```

</custom-title>
