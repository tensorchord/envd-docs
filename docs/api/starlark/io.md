# io

IO functions

::: tip
Note that the documentation is automatically generated from [envd/api](https://github.com/tensorchord/envd/tree/main/envd/api) folder
in [tensorchord/envd](https://github.com/tensorchord/envd/tree/main/envd/api) repo.
Please update the python file there instead of directly editing file inside envd-docs repo.
:::

## copy

```python
def copy(src: str, dest: str)
```

Copy from host `src` to container `dest` (build time)

**Arguments**:

- `src` _str_ - source path
- `dest` _str_ - destination path

## mount

```python
def mount(src: str, dest: str)
```

Mount from host `src` to container `dest` (runtime)

**Arguments**:

- `src` _str_ - source path
- `dest` _str_ - destination path

