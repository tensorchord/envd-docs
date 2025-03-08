# install

Install functions

::: tip
Note that the documentation is automatically generated from [envd/api](https://github.com/tensorchord/envd/tree/main/envd/api) folder
in [tensorchord/envd](https://github.com/tensorchord/envd/tree/main/envd/api) repo.
Please update the python file there instead of directly editing file inside envd-docs repo.
:::

## python

```python
def python(version: str = "3.11")
```

Install python.

If `install.conda` is not used, this will create a solo Python environment. Otherwise, it
will be a conda environment.

**Arguments**:

- `version` _str_ - Python version

## conda

```python
def conda(use_mamba: bool = False)
```

Install MiniConda or MicroMamba.

**Arguments**:

- `use_mamba` _bool_ - use mamba instead of conda

## uv

```python
def uv(python_version: str = "3.11")
```

Install UV (an extremely fast Python package and project manager).

`uv` is much faster than `conda`. Choose this one instead of `conda` if you don't
need any machine learning packages.

This doesn't support installing Python packages through `install.python_packages`
because that part should be managed by `uv`. You can run `uv sync` in the `envd`
environment to install all the dependencies.

**Arguments**:

- `python_version` _str_ - install this Python version through UV

## r\_lang

```python
def r_lang()
```

Install R Lang.

## julia

```python
def julia()
```

Install Julia.

## apt\_packages

```python
def apt_packages(name: Sequence[str] = ())
```

Install package using the system package manager (apt on Ubuntu).

**Arguments**:

- `name` _Sequence[str]_ - apt package name list

## python\_packages

```python
def python_packages(name: Sequence[str] = (),
                    requirements: str = "",
                    local_wheels: Sequence[str] = ())
```

Install python package by pip.

**Arguments**:

- `name` _Sequence[str]_ - package name list
- `requirements` _str_ - requirements file path
- `local_wheels` _Sequence[str]_ - local wheels
  (wheel files should be placed under the current directory)

## conda\_packages

```python
def conda_packages(
        name: Sequence[str] = (),
        channel: Sequence[str] = (), env_file: str = "")
```

Install python package by Conda

**Arguments**:

- `name` _Sequence[str]_ - List of package names with optional version assignment,
  such as ['pytorch', 'tensorflow==1.13.0']
- `channel` _Sequence[str]_ - additional channels
- `env_file` _str_ - conda env file path

## r\_packages

```python
def r_packages(name: Sequence[str])
```

Install R packages by R package manager.

**Arguments**:

- `name` _Sequence[str]_ - package name list

## julia\_packages

```python
def julia_packages(name: Sequence[str])
```

Install Julia packages.

**Arguments**:

- `name` _Sequence[str]_ - List of Julia packages

## vscode\_extensions

```python
def vscode_extensions(name: Sequence[str])
```

Install VS Code extensions

**Arguments**:

- `name` _Sequence[str]_ - extension names, such as ['ms-python.python']

## cuda

```python
def cuda(version: str, cudnn: Optional[str] = "8")
```

Replace the base image with a `nvidia/cuda` image.

This will replace the default base image to an `nvidia/cuda` image. You can
also use a CUDA base image directly like
`base(image="nvidia/cuda:12.2.0-devel-ubuntu22.04", dev=True)`.

**Arguments**:

- `version` _str_ - CUDA version, such as '11.6.2'
- `cudnn` _optional, str_ - CUDNN version, such as '8'
  
  Example usage:
```python
install.cuda(version="11.6.2", cudnn="8")
```

