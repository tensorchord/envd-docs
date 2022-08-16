# install

Install functions

::: tip
Note that the documentation is automatically generated from [envd/api](https://github.com/tensorchord/envd/tree/main/envd/api) folder
in [tensorchord/envd](https://github.com/tensorchord/envd/tree/main/envd/api) repo.
Please update the python file there instead of directly editing file inside envd-docs repo.
:::

#### system\_packages

```python
def system_packages(name: List[str])
```

Install package by system-level package manager(apt on Ubuntu)

**Arguments**:

- `name` _str_ - apt package name list

#### python\_packages

```python
def python_packages(name: List[str], requirements: str)
```

Install python package by pip

**Arguments**:

- `name` _List[str]_ - package name list
- `requirements` - (str): requirements file path

#### conda\_packages

```python
def conda_packages(name: List[str], channel: List[str], env_file: str)
```

Install python package by Conda

**Arguments**:

- `name` _List[str]_ - List of package names with optional version assignment,
  such as ['pytorch', 'tensorflow==1.13.0']
- `channel` _List[str]_ - additional channels
- `env_file` _str_ - conda env file path

#### r\_packages

```python
def r_packages(name: List[str])
```

Install R packages by R package manager

**Arguments**:

- `name` _List[str]_ - package name list

#### cuda

```python
def cuda(version: str, cudnn: Optional[str] = None)
```

Install CUDA dependency

**Arguments**:

- `version` _str_ - CUDA version, such as '11.6'
- `cudnn` _optional, str_ - CUDNN version, such as '6'

#### vscode\_extensions

```python
def vscode_extensions(name: List[str])
```

Install VS Code extensions

**Arguments**:

- `name` _List[str]_ - extension names, such as ['ms-python.python']

#### julia\_packages

```python
def julia_packages(name: List[str])
```

Install Julia packages

**Arguments**:

  name (List(str)): List of Julia packages

