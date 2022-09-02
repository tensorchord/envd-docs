# 使用镜像加速构建

本章我们将介绍在 `envd` 中设置下列镜像加速构建：
- Docker Hub
- PyPI
- Conda

## 设置 Docker hub 镜像

如果 docker pull 时很慢，你可以在 `docker` 中添加  [pull through registry mirror](https://docs.docker.com/registry/recipes/mirror/)，由于减少了到 docker hub 的网络往返，可能会给 docker 带来额外的性能改进。

你可以通过 `envd bootstrap` 来设置 docker 镜像：

<custom-title title="Set docker mirror">

```bash
envd bootstrap --dockerhub-mirror https://docker.mirrors.sjtug.sjtu.edu.cn
```

</custom-title>

国内其他 Docker hub 镜像站：
- https://docker.mirrors.sjtug.sjtu.edu.cn
- https://hub-mirror.c.163.com

## 设置 PyPI 镜像

PyPI 的镜像或缓存可以加快本地软件包的安装，支持离线工作。

你可以通过 `config.pip_index(url="<index>", extra_url=<extra>)` 来设置 PyPI 的镜像。

<custom-title title="Set pip index mirror">

```python
config.pip_index(url="https://pypi.tuna.tsinghua.edu.cn/simple")
```

</custom-title>

国内其他的 PyPI 镜像站：

- https://pypi.tuna.tsinghua.edu.cn/simple
- https://mirror.sjtu.edu.cn/pypi/web/simple

## 设置 apt source 镜像

apt 从一个或多个软件库源下载软件包，并将它们安装到你的计算机上。在 `envd` 中默认使用官方 ubuntu apt 源，你可以通过下列方式更换 apt 的软件源。

<custom-title title="Set apt source mirror">

```python
config.apt_source(source="""
# See http://help.ubuntu.com/community/UpgradeNotes for how to upgrade to
# newer versions of the distribution.
deb https://mirror.sjtu.edu.cn/ubuntu focal main restricted
# deb-src https://mirror.sjtu.edu.cn/ubuntu focal main restricted
deb https://mirror.sjtu.edu.cn/ubuntu focal-updates main restricted
# deb-src https://mirror.sjtu.edu.cn/ubuntu focal-updates main restricted
deb https://mirror.sjtu.edu.cn/ubuntu focal universe
# deb-src https://mirror.sjtu.edu.cn/ubuntu focal universe
deb https://mirror.sjtu.edu.cn/ubuntu focal-updates universe
# deb-src https://mirror.sjtu.edu.cn/ubuntu focal-updates universe
deb https://mirror.sjtu.edu.cn/ubuntu focal multiverse
# deb-src https://mirror.sjtu.edu.cn/ubuntu focal multiverse
deb https://mirror.sjtu.edu.cn/ubuntu focal-updates multiverse
# deb-src https://mirror.sjtu.edu.cn/ubuntu focal-updates multiverse
deb https://mirror.sjtu.edu.cn/ubuntu focal-backports main restricted universe multiverse
# deb-src https://mirror.sjtu.edu.cn/ubuntu focal-backports main restricted universe multiverse
deb http://archive.canonical.com/ubuntu focal partner
# deb-src http://archive.canonical.com/ubuntu focal partner
deb https://mirror.sjtu.edu.cn/ubuntu focal-security main restricted universe multiverse
# deb-src https://mirror.sjtu.edu.cn/ubuntu focal-security main restricted universe multiverse
""")
```

</custom-title>

## 设置 Conda 镜像

Conda 的镜像或缓存可以加速本地软件包安装，支持离线工作。

你可以通过以下方式设置镜像：

<custom-title title="Set conda channel mirror">

```python
config.conda_channel(channel="""
channels:
  - defaults
show_channel_urls: true
default_channels:
  - https://mirrors.tuna.tsinghua.edu.cn/anaconda/pkgs/main
  - https://mirrors.tuna.tsinghua.edu.cn/anaconda/pkgs/r
  - https://mirrors.tuna.tsinghua.edu.cn/anaconda/pkgs/msys2
  - https://mirrors.tuna.tsinghua.edu.cn/anaconda/pkgs/free
custom_channels:
  conda-forge: https://mirrors.tuna.tsinghua.edu.cn/anaconda/cloud
  msys2: https://mirrors.tuna.tsinghua.edu.cn/anaconda/cloud
  bioconda: https://mirrors.tuna.tsinghua.edu.cn/anaconda/cloud
  menpo: https://mirrors.tuna.tsinghua.edu.cn/anaconda/cloud
  pytorch: https://mirrors.tuna.tsinghua.edu.cn/anaconda/cloud
  pytorch-lts: https://mirrors.tuna.tsinghua.edu.cn/anaconda/cloud
  simpleitk: https://mirrors.tuna.tsinghua.edu.cn/anaconda/cloud
""")
```
</custom-title>

## 设置 R 包镜像

待补充。
