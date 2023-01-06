# 构建你的 envd 环境

`envd` 通过读取 `build.envd` 文件中的配置来自动构建镜像。`build.envd` 是一个文本文件，其中包含所有用户能在命令行中调用以组装镜像的命令。

## 基础命令

- `envd build`：从 `build.envd` 构建镜像。
- `envd up`：从 `build.envd` 构建镜像并立即运行。
- `envd build/envd up --path/-p` : 指定镜像的构建目录（指定目录下必须包含 `build.envd` 文件）。

```bash
# 在当前目录下构建镜像
$ ls
build.envd ...
$ envd build
```

```bash
# 在自定义目录下构建镜像
$ tree .
./examples
└── mnist
    ├── build.envd
    ├── main.py
    ├── mnist.ipynb
    └── README.md
$ envd build --path examples/mnist
```

## build.envd 示例

`build.envd` 使用 [Starlark](https://bazel.build/rules/language)（Python3 的一种简化方言）语法编写，如果您了解 Python，那么您也可以毫无障碍编写 build.envd。

以下是 `build.envd` 的示例代码：

<custom-title title="build.envd">

```python
def build():
    base(os="ubuntu20.04", language="python3")
    install.python_packages(name = [
        "numpy",
    ])
    shell("zsh")
    config.jupyter()
```

</custom-title>

别担心，我们将在以下部分探讨它是如何工作的。

### Hello World

1. 新建配置，创建 `build.envd` 文件，输入以下代码：

<custom-title title="build.envd">

```python
def build():
    base(os="ubuntu20.04", language="python3")
```

</custom-title>

2. 运行环境，在控制台使用 `envd up` 命令运行它。恭喜！您成功构建了第一个 `envd` 环境。

<custom-title title="envd up shell">

```bash
$ envd up
[+] ⌚ parse build.envd and download/cache dependencies 0.0s ✅ (finished)
[+] 🐋 build envd environment 7.9s (16/16) ✅ (finished)
 ...
 => exporting to oci image format                                      0.4s
 => => exporting layers                                                0.0s
 => => exporting manifest sha256:7ef2e8571485ce51d966b4cf5fe83232520f  0.0s
 => => exporting config sha256:abec960de30fce69dc19126577c7aaae3f9b62  0.0s
 => => sending tarball                                                 0.4s
envd@588f26349c61 $
```

</custom-title>

3. 重新进入您的环境，如果您退出了当前 `shell`，使用 `ssh <project-directory-name>.envd` 命令将重新进入环境。

```bash
envd@588f26349c61 $ exit
$ ssh demo.envd
envd@588f26349c61 $ # 欢迎回来！
```

4. 删除环境，如果您不再使用它，请不要忘记使用 `envd destroy` 命令来删除环境。

<custom-title title="删除环境">

```bash
$ envd destroy
INFO[2022-06-10T19:09:49+08:00] <project-directory-name> is destroyed
```

</custom-title>

### build.envd

让我们来看一下 `build.envd` 文件。

<custom-title title="build.envd">

```python
def build():
    base(os="ubuntu20.04", language="python3")
```

</custom-title>

`build()` 是 `build.envd` 中的主函数。当您运行 `envd build` 或 `envd up`命令时，`envd` 程序会调用该函数。

:::warning 注意

**`build.envd` 文件中必须包含 `build()` 函数**。

:::

`base` 将声明您在该环境中使用的操作系统和语言。

### 安装 Python 包

通过 [`envd` install API](../api/starlark/v0/install) 中的 `install.python_packages` 函数在环境中安装 Python 包：

<custom-title title="build.envd">

```python
def build():
    base(os="ubuntu20.04", language="python3")
    install.python_packages(name = [
        "numpy",
    ])
```

</custom-title>

该函数支持通用 pip 语法：

```python
    install.python_packages(name = [
        "numpy==1.4.1",
        "numpy>=1,<2",
        "numpy~=1.4",
    ])
```

如果您遇到有关软件包安装的问题，请随时在 [Discord](https://discord.gg/KqswhpVgdU) 中与我们交流。您可以验证它是否工作：

```
$ envd up
envd@2c14bff847f8:$ python3
Python 3.8.10 (default, Mar 15 2022, 12:22:08)
[GCC 9.4.0] on linux
Type "help", "copyright", "credits" or "license" for more information.
>>> import numpy as np
>>> a = np.array([2, 3, 4])
>>> a
array([2, 3, 4])
```

### 配置 ZSH Shell

通过 [`envd` API](../api/starlark/v0/global) 中的 `Shell` 函数配置环境中的 `Shell` 程序：

<custom-title title="build.envd">

```python
def build():
    base(os="ubuntu20.04", language="python3")
    install.python_packages(name = [
        "numpy",
    ])
    shell("zsh")
```

</custom-title>

`envd` 自动配置 `ZSH Shell` 和 [oh-my-zsh](https://ohmyz.sh/)，无需您手动操作。

```bash
$ envd up
(envd) ➜  docs # 环境中的 ZSH shell
```

### 使用 Jupyter Notebooks

Jupyter Notebook 是使用 Python 进行数据分析的互动计算环境。`envd` 通过 `config.jupyter` [API 函数](../api/starlark/v0/config) 帮助您在环境中配置 Jupyter Notebook。

<custom-title title="build.envd">

```python
def build():
    base(os="ubuntu20.04", language="python3")
    install.python_packages(name = [
        "numpy",
    ])
    shell("zsh")
    config.jupyter()
```

</custom-title>

`envd up` 命令执行成功后，通过 `envd envs list` 查看 Jupyter Notebook 的地址。

```bash
$ envd up --detach
$ envd get env
NAME                    JUPYTER                 SSH TARGET              CONTEXT                                 IMAGE                   GPU     CUDA    CUDNN   STATUS          CONTAINER ID
envd-quick-start        http://localhost:48484   envd-quick-start.envd   /home/gaocegege/code/envd-quick-start   envd-quick-start:dev    false   <none>  <none>  Up 54 seconds   bd3f6a729e94
```

![jupyter](./assets/jupyter.png)

### 配置 PyPI 源（可选）

如果通过默认源安装 Python 包太过缓慢，请使用 `envd` API 函数 `config.pip_index` 配置新的 PyPI 源。

<custom-title title="build.envd">

```python
def build():
    config.pip_index(url="https://pypi.tuna.tsinghua.edu.cn/simple")
    base(os="ubuntu20.04", language="python3")
    install.python_packages(name = [
        "numpy",
    ])
    shell("zsh")
    config.jupyter()
```

</custom-title>

配置成功后，Python 包将从新的源下载，而不是 [pypi.org](https://pypi.org/)。

### 更多 build.envd 示例

```python
def build():
    config.apt_source(source="""
deb https://mirror.sjtu.edu.cn/ubuntu focal main restricted
deb https://mirror.sjtu.edu.cn/ubuntu focal-updates main restricted
deb https://mirror.sjtu.edu.cn/ubuntu focal universe
deb https://mirror.sjtu.edu.cn/ubuntu focal-updates universe
deb https://mirror.sjtu.edu.cn/ubuntu focal multiverse
deb https://mirror.sjtu.edu.cn/ubuntu focal-updates multiverse
deb https://mirror.sjtu.edu.cn/ubuntu focal-backports main restricted universe multiverse
deb http://archive.canonical.com/ubuntu focal partner
deb https://mirror.sjtu.edu.cn/ubuntu focal-security main restricted universe multiverse
""")
    config.pip_index(url = "https://mirror.sjtu.edu.cn/pypi/web/simple")
    install.vscode_extensions([
        "ms-python.python",
    ])
    base(os="ubuntu20.04", language="python3")
    install.python_packages(name = [
        "numpy",
    ])
    install.cuda(version="11.2.2", cudnn="8")
    shell("zsh")
    install.apt_packages(name = [
        "htop"
    ])
    git_config(name="Ce Gao", email="cegao@tensorchord.ai", editor="vim")
    run(["ls -la"])
```

## 下一步

恭喜你已经成功配置好了 `envd` 环境！

如果你在使用本指南时遇到任何问题，请随时在 [Discord](https://discord.gg/KqswhpVgdU) 与我们交流。

如果你想进一步探索 `envd` ，以下是一些快速链接：

- [`envd` GitHub 仓库](https://github.com/tensorchord/envd)
- [为什么使用 `envd`？](../faq/why)
- [`envd` CLI 命令](../cli)
