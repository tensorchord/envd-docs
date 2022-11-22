# 创建一个 Python 环境

这份指南包含如何通过 `envd` 配置 Python 环境。如果你还没有用过 `envd`，请先阅读我们的 [教程](/guide/getting-started) 和 [搭建配置指南](/guide/build-envd)。


让我们开始 🐍 吧!

## 指定 Python

`envd` 默认的语言就是 Python，因此你不需要特意指定语言。或者你可以使用 `base` 函数来指定。

<custom-title title="build.envd">

```python
def build():
    base(os="ubuntu20.04", language="python")
```

</custom-title>

`envd` 中 Python 的默认版本是 3.9（最新的修订号可以参考[这里](https://anaconda.org/anaconda/python/files)）。如果你需要使用特定版本，只需要用类似 `pythonX.Y.Z` 的字符串来填充 `language` 项：

<custom-title title="build.envd">

```python
def build():
    base(os="ubuntu20.04", language="python3.11")
```

</custom-title>

:::warning
Python2 不被 `envd` 所支持。
:::

## Conda 包

你可以使用 `install.conda_packages` 函数来安装 conda 包。 下面的例子安装了 `numpy` 和 `scipy`：

<custom-title title="build.envd">

```python 
def build():
    base(os="ubuntu20.04", language="python")
    install.conda_packages(name = [
        "numpy",
        "scipy",
    ])
```
</custom-title>

## PyPI 包

你可以使用 `install.python_packages` 函数来从 PyPI 安装 Python 包。 下面的例子安装了 `scikit-learn` 和 `matplotlib`：

<custom-title title="build.envd">

```python 
def build():
    base(os="ubuntu20.04", language="python")
    install.python_packages(name = [
        "scikit-learn",
        "matplotlib",
    ])
```

</custom-title>

前面的例子中，`envd` 使用系统范围内的 [pip](https://pip.pypa.io/) 来安装 Python 包。

如果 conda 已启用，你也可以使用  `install.python_packags` 函数来从 PyPI 安装 Python 包。下面的例子里，使用 conda 安装了 `numpy` and `scipy`，与此同时，使用 pip 安装了 `scikit-learn` 和 `matplotlib`：

<custom-title title="build.envd">

```python 
def build():
    base(os="ubuntu20.04", language="python")
    install.conda_packages(name = [
        "numpy",
        "scipy",
    ])
    install.python_packages(name = [
        "scikit-learn",
        "matplotlib",
    ])
```

</custom-title>

这个例子里，`envd` 在当前 conda 环境中使用了 pip 来安装包。

## 指定 shell 程序

你可以通过 `shell` 函数来指定环境中使用的 `shell` 程序。下面的例子里使用了 `zsh` ：

<custom-title title="build.envd">

```python 
def build():
    base(os="ubuntu20.04", language="python")
    shell("zsh")
```
</custom-title>

## 指定 VSCode 插件

你可以使用 `install.vscode_extensions` 函数来指定 VSCode 插件。下面的例子安装了 [`ms-python.python`](https://open-vsx.org/extension/ms-python/python)[^1]：

<custom-title title="build.envd">

```python 
def build():
    base(os="ubuntu20.04", language="python")
    install.vscode_extensions(["ms-python.python"])
```
</custom-title>

[^1]: 因为[许可证问题](https://github.com/tensorchord/envd/issues/160)，这里用 [open-vsx](https://open-vsx.org/) 替代了 Microsoft VSCode Marketplace。

## 建立 Jupyter notebook

你可以使用 `config.jupyter` 来建立 Jupyter notebook。接下来的例子里建立了一个 Jupyter notebook：

<custom-title title="build.envd">

```python 
def build():
    base(os="ubuntu20.04", language="python")
    # Use `config.jupyter()` 
    # if you do not need to set up password.
    config.jupyter(token="password")
```

</custom-title>

![jupyter](/guide/assets/jupyter.png)

## 设定 PyPI 索引镜像

PyPI 的镜像或缓存可用于加快本地包安装、允许脱机工作、处理公司防火墙或单纯的网络不稳定。

PyPI 索引镜像可以使用 `config.pip_index(url="<index>", extra_url=<extra>)` 来设定：

<custom-title title="pip index mirror">

```python
config.pip_index(url="https://pypi.tuna.tsinghua.edu.cn/simple")
```

</custom-title>
