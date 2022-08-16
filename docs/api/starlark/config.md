---
sidebar_label: config
title: config
---

#### jupyter

```python
def jupyter(password: str, port: int)
```

Configure jupyter notebook configuration

**Arguments**:

- `password` _str_ - Password for access authentication
- `port` _int_ - Port to serve jupyter notebook

#### pip\_index

```python
def pip_index(url)
```

Configure pypi index mirror

**Arguments**:

- `url` _str_ - Pypi index url (i.e. https://mirror.sjtu.edu.cn/pypi/web/simple)

#### conda\_channel

```python
def conda_channel(channel: str)
```

Configure conda channel mirror

Example usage:
```
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
'''
)
```

**Arguments**:

- `channel` _str_ - Basically the same with file content of an usual .condarc
