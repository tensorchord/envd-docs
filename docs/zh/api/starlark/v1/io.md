# io

IO functions

::: tip
Note that the documentation is automatically generated from [envd/api](https://github.com/tensorchord/envd/tree/main/envd/api) folder
in [tensorchord/envd](https://github.com/tensorchord/envd/tree/main/envd/api) repo.
Please update the python file there instead of directly editing file inside envd-docs repo.
:::

## copy

```python
def copy(source: str, target: str, image: Optional[str])
```

Copy from host path to container path (build time)

**Arguments**:

- `source` _str_ - source path in the host machine or in the ``image``
- `target` _str_ - destination path in the envd container
- `image(Optional[str])` - image name, if not specified, will use the host
  

**Examples**:

```python
# copy from host to container
io.copy(source='main.py', target='/home/envd/')
# copy from image to container
io.copy(source='/bin/micromamba', target='/usr/local/bin/micromamba', image='mambaorg/micromamba:1.0.0')
```

## http

```python
def http(url: str, checksum: Optional[str], filename: Optional[str])
```

Download file with HTTP to `/home/envd/extra_source`

**Arguments**:

- `url` _str_ - URL
- `checksum` _Optional[str]_ - checksum for the downloaded file
- `filename` _Optional[str]_ - rewrite the filename

