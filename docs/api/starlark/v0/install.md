# install

Install functions

::: tip
Note that the documentation is automatically generated from [envd/api](https://github.com/tensorchord/envd/tree/main/envd/api) folder
in [tensorchord/envd](https://github.com/tensorchord/envd/tree/main/envd/api) repo.
Please update the python file there instead of directly editing file inside envd-docs repo.
:::

::: warning
v0 syntax is no longer supported from `envd>=v1.0`. Check the [upgrade guide](https://envd.tensorchord.ai/guide/v1.html).

If you want to use v0 syntax, try `pip install 'envd<1'`.
:::

## apt\_packages

```python
def apt_packages(name: List[str])
```

Install package using the system package manager (apt on Ubuntu)

**Arguments**:

- `name` _List[str]_ - apt package name list

## python\_packages

```python
def python_packages(name: List[str], requirements: str,
                    local_wheels: List[str])
```

Install python package by pip

**Arguments**:

- `name` _List[str]_ - package name list
- `requirements` _str_ - requirements file path
- `local_wheels` _List[str]_ - local wheels
  (wheel files should be placed under the current directory)

## conda\_packages

```python
def conda_packages(name: List[str], channel: List[str], env_file: str)
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

Install R packages by R package manager

**Arguments**:

- `name` _List[str]_ - package name list

## cuda

```python
def cuda(version: str, cudnn: Optional[str] = "8")
```

Install CUDA dependency

**Arguments**:

- `version` _str_ - CUDA version, such as '11.6.2'
- `cudnn` _optional, str_ - CUDNN version, such as '8'

## vscode\_extensions

```python
def vscode_extensions(name: List[str])
```

Install VS Code extensions

**Arguments**:

- `name` _List[str]_ - extension names, such as ['ms-python.python']

## julia\_packages

```python
def julia_packages(name: List[str])
```

Install Julia packages

**Arguments**:

  name (List(str)): List of Julia packages

