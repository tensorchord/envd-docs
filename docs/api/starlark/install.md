---
sidebar_label: install
title: install
---

#### system\_packages

```python
def system_packages(name: List[str])
```

Install package by system-level package manager(apt on Ubuntu)

#### python\_packages

```python
def python_packages(name: List[str])
```

Install python package by pip

#### conda\_packages

```python
def conda_packages(name: List[str])
```

Install python package by Conda

**Arguments**:

- `name` _List[str]_ - List of package names with optional version assignment,
  such as ['pytorch', 'tensorflow==1.13.0']

#### r\_packages

```python
def r_packages(name: List[str])
```

Install R packages by R package manager

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

- `name` _list of str_ - extension names, such as ['ms-python.python']

