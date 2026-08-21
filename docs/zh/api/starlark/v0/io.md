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

## http

```python
def http(url: str, checksum: Optional[str], filename: Optional[str])
```

Download file with HTTP to `/home/envd/extra_source`

**Arguments**:

- `url` _str_ - URL
- `checksum` _Optional[str]_ - checksum for the downloaded file
- `filename` _Optional[str]_ - rewrite the filename

