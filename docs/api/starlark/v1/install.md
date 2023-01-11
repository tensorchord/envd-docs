# install

Install functions

::: tip
Note that the documentation is automatically generated from [envd/api](https://github.com/tensorchord/envd/tree/main/envd/api) folder
in [tensorchord/envd](https://github.com/tensorchord/envd/tree/main/envd/api) repo.
Please update the python file there instead of directly editing file inside envd-docs repo.
:::

::: warning
Enable v1 by adding `# syntax=v1` to the 1st line of your envd file.

v1 is experimental and may change in the future. Make sure to freeze the envd version for online CI/CD.
:::

## python

```python
def python(version: str = "3.9")
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

## r\_lang

```python
def r_lang()
```

Install R Lang.

Not implemented yet. Please use v0 if you need R.

## julia

```python
def julia()
```

Install Julia.

Not implemented yet. Please use v0 if you need Julia.

## apt\_packages

```python
def apt_packages(name: List[str] = [])
```

Install package by system-level package manager (apt on Ubuntu).

**Arguments**:

- `name` _List[str]_ - apt package name list

## python\_packages

```python
def python_packages(name: List[str] = [],
                    requirements: str = "",
                    local_wheels: List[str] = [])
```

Install python package by pip.

**Arguments**:

- `name` _List[str]_ - package name list
- `requirements` _str_ - requirements file path
- `local_wheels` _List[str]_ - local wheels
  (wheel files should be placed under the current directory)

## conda\_packages

```python
def conda_packages(name: List[str] = [],
                   channel: List[str] = [],
                   env_file: str = "")
```

Install python package by Conda

**Arguments**:

- `name` _List[str]_ - List of package names with optional version assignment,
  such as ['pytorch', 'tensorflow==1.13.0']
- `channel` _List[str]_ - additional channels
- `env_file` _str_ - conda env file path

## r\_packages

```python
def r_packages(name: List[str])
```

Install R packages by R package manager.

Not implemented yet. Please use v0 if you need R.

**Arguments**:

- `name` _List[str]_ - package name list

## julia\_packages

```python
def julia_packages(name: List[str])
```

Install Julia packages.

Not implemented yet. Please use v0 if you need Julia.

**Arguments**:

  name (List(str)): List of Julia packages

## vscode\_extensions

```python
def vscode_extensions(name: List[str])
```

Install VS Code extensions

**Arguments**:

- `name` _List[str]_ - extension names, such as ['ms-python.python']

## cuda

```python
def cuda(version: str, cudnn: Optional[str] = "8")
```

Install CUDA dependency

**Arguments**:

- `version` _str_ - CUDA version, such as '11.6.2'
- `cudnn` _optional, str_ - CUDNN version, such as '8'

