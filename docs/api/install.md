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

- `version` _str_ - CUDA version, such as &#x27;11.6&#x27;
- `cudnn` _optional, str_ - CUDNN version, such as &#x27;6&#x27;

#### vscode\_extensions

```python
def vscode_extensions(name: List[str])
```

Install VS Code extensions

**Arguments**:

- `name` _list of str_ - extension names, such as [&#x27;ms-python.python&#x27;]

