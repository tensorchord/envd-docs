# config

Config functions

::: tip
Note that the documentation is automatically generated from [envd/api](https://github.com/tensorchord/envd/tree/main/envd/api) folder
in [tensorchord/envd](https://github.com/tensorchord/envd/tree/main/envd/api) repo.
Please update the python file there instead of directly editing file inside envd-docs repo.
:::

## apt\_source

```python
def apt_source(source: Optional[str])
```

Configure apt sources

Example usage:

```python
apt_source(source='''
    deb https://mirror.sjtu.edu.cn/ubuntu jammy main restricted
    deb https://mirror.sjtu.edu.cn/ubuntu jammy-updates main restricted
    deb https://mirror.sjtu.edu.cn/ubuntu jammy universe
    deb https://mirror.sjtu.edu.cn/ubuntu jammy-updates universe
    deb https://mirror.sjtu.edu.cn/ubuntu jammy multiverse
    deb https://mirror.sjtu.edu.cn/ubuntu jammy-updates multiverse
    deb https://mirror.sjtu.edu.cn/ubuntu jammy-backports main restricted universe multiverse
    deb http://archive.canonical.com/ubuntu jammy partner
    deb https://mirror.sjtu.edu.cn/ubuntu jammy-security main restricted universe multiverse
''')
```

**Arguments**:

- `source` _str, optional_ - The apt source configuration

## jupyter

```python
def jupyter(token: str, port: int)
```

Configure jupyter notebook configuration

**Arguments**:

- `token` _str_ - Token for access authentication
- `port` _int_ - Port to serve jupyter notebook

## pip\_index

```python
def pip_index(url: str, extra_url: str = "", trust: bool = False)
```

Configure pypi index mirror

**Arguments**:

- `url` _str_ - PyPI index URL (i.e. https://mirror.sjtu.edu.cn/pypi/web/simple)
- `extra_url` _str_ - PyPI extra index URL. `url` and `extra_url` will be
  treated equally, see https://github.com/pypa/pip/issues/8606
- `trust` _bool_ - trust the provided index

## conda\_channel

```python
def conda_channel(channel: str)
```

Configure conda channel mirror

Example usage:

```python
config.conda_channel(channel='''
channels:
    - defaults
show_channel_urls: true
default_channels:
    - https://mirrors.tuna.tsinghua.edu.cn/anaconda/pkgs/main
    - https://mirrors.tuna.tsinghua.edu.cn/anaconda/pkgs/r
    - https://mirrors.tuna.tsinghua.edu.cn/anaconda/pkgs/msys2
custom_channels:
    conda-forge: https://mirrors.tuna.tsinghua.edu.cn/anaconda/cloud
''')
```

**Arguments**:

- `channel` _str_ - Basically the same with file content of an usual .condarc

## entrypoint

```python
def entrypoint(args: List[str])
```

Configure entrypoint for custom base image

Example usage:

```python
config.entrypoint(["date", "-u"])
```

**Arguments**:

- `args` _List[str]_ - list of arguments to run

## gpu

```python
def gpu(count: int)
```

Configure the number of GPUs required

Example usage:

```python
config.gpu(count=2)
```

**Arguments**:

- `count` _int_ - number of GPUs

## shm\_size

```python
def shm_size(size: int)
```

Configure the shared memory size (megabyte) of docker containers

Example usage:

```python
config.shm_size(size=1024)
```

**Arguments**:

- `size` _int_ - the shared memory size (megabyte) of docker containers

## cran\_mirror

```python
def cran_mirror(url: str)
```

Configure the mirror URL, default is https://cran.rstudio.com

**Arguments**:

- `url` _str_ - mirror URL

## julia\_pkg\_server

```python
def julia_pkg_server(url: str)
```

Configure the package server for Julia.
Since Julia 1.5, https://pkg.julialang.org is the default pkg server.

**Arguments**:

- `url` _str_ - Julia pkg server URL

## rstudio\_server

```python
def rstudio_server()
```

Enable the RStudio Server (only work for `base(os="ubuntu22.04", language="r")`)

## repo

```python
def repo(url: str, description: str)
```

Setup repo related information. Will save to the image labels.

**Arguments**:

- `url` _str_ - repo URL
- `description` _str_ - repo description

## owner

```python
def owner(uid: int, gid: int)
```

Configure uid:gid as the environment owner.
This can also be achieved by using flag `envd --owner uid:gid build` or environment
variable `ENVD_BUILD_OWNER=uid:gid envd build`

**Arguments**:

- `uid` _int_ - UID
- `gid` _int_ - GID

