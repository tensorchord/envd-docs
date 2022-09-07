# io

IO functions

::: tip
Note that the documentation is automatically generated from [envd/api](https://github.com/tensorchord/envd/tree/main/envd/api) folder
in [tensorchord/envd](https://github.com/tensorchord/envd/tree/main/envd/api) repo.
Please update the python file there instead of directly editing file inside envd-docs repo.
:::

## copy

```python
def copy(host_path: str, envd_path: str)
```

Copy from host path to container path (build time)

**Arguments**:

- `host_path` _str_ - source path in the host machine
- `envd_path` _str_ - destination path in the envd container

## mount

```python
def mount(host_path: str, envd_path: str)
```

Mount from host path to container path (runtime)

**Arguments**:

- `host_path` _str_ - source path in the host machine
- `envd_path` _str_ - destination path in the envd container

