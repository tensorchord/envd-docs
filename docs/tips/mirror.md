# Faster Build with Software Mirrors

There are several ways to accelerate the building process. We will introduce how to use software mirrors (docker hub mirror, pip index mirror, conda channel mirror and so on) in envd.

## Setting up docker hub pull through mirror

If docker image pulls are too slow, you can add a [pull through registry mirror](https://docs.docker.com/registry/recipes/mirror/) to the docker. It may bring additional performance improvements with a pull through registry mirror since network roundtrips to docker hub are reduced.

You can set the mirror when `envd bootstrap`:

<custom-title title="Set docker mirror">

```bash 
envd bootstrap --dockerhub-mirror https://docker.mirrors.sjtug.sjtu.edu.cn
```

</custom-title>

Here are some registry mirrors:

- `https://docker.mirrors.sjtug.sjtu.edu.cn` in China.
- `https://hub-mirror.c.163.com` in China.

## Setting up pip index mirror

Mirroring or caching of PyPI can be used to speed up local package installation, allow offline work, handle corporate firewalls or just plain Internet flakiness.

PyPI index mirror can be set with `config.pip_index(url="<index>", extra_url=<extra>)`:

<custom-title title="Set pip index mirror">

```python 
config.pip_index(url="https://pypi.tuna.tsinghua.edu.cn/simple")
```
</custom-title>

envd will use the index to pull python packages. Here are some pip indexes:

- `https://pypi.tuna.tsinghua.edu.cn/simple` in China.
- `https://mirror.sjtu.edu.cn/pypi/web/simple` in China.

## Setting up apt source mirror

Apt downloads packages from one or more software repositories (sources) and installs them onto your computer.

Official ubuntu apt source is used in envd by default, but you can change to a mirror which is close to you:

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

## Setting up conda channel mirror

Mirroring or caching of conda can be used to speed up local package installation, allow offline work, handle corporate firewalls or just plain Internet flakiness.

You can set up the conda channel mirror via:

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

## Setting up R mirror

To be added
