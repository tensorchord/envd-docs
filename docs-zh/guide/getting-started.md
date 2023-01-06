# 快速开始

## envd 是什么？

envd（`ɪnˈvdɪ`）是一个命令行工具，可以帮助你为 AI/ML 创建基于容器的开发环境。

开发环境通常包括了 Python，系统依赖，CUDA，BASH 脚本，Dockerfiles，SSH 配置，Kubernetes YAMLs，以及许多其他冗长的设置。在长年累月的开发中，系统里的东西总会越来越多，改动无法追踪，最终导致错误。envd 就是要解决这样的问题。

1. 在 `build.envd` 中声明需要的软件依赖（CUDA、Python 包、你最喜欢的 IDE 等）。
2. 在命令行里运行 `envd up` 。
3. 在独立且隔离的环境中开发。

<p align="center">
  <img src="https://user-images.githubusercontent.com/5100735/189058399-3865a039-9459-4e74-83dd-3ee2ecadfef5.svg" width="75%"/>
</p>

## 为什么使用 `envd` ？

使用 `envd` 构建的环境提供了以下开箱即用的功能。

❤️ **团队的知识积累**。

`envd` 构建函数可以被重用。使用 `include` 函数来导入任何 git 仓库中的 envd 函数。复用不再需要复制粘贴 Dockerfile 中的命令，可以直接复用已有函数。

```python
envdlib = include("https://github.com/tensorchord/envdlib")

def build():
    base(os="ubuntu20.04", language="python")
    envdlib.tensorboard(8888)
```

::: details `envdlib.tensorboard` 来自 [github.com/tensorchord/envdlib](https://github.com/tensorchord/envdlib/blob/main/src/monitoring.envd)

```python
def tensorboard(envd_port=6006, envd_dir="/home/envd/logs",
        host_port=0, host_dir="/var/log/tensorboard"):
    """Configure TensorBoard.

    Make sure you have permission for `host_dir`

    Args:
        envd_port (Optional[int]): port used by envd container
        envd_dir (Optional[str]): log storage mount path in the envd container
        host_port (Optional[int]): port used by the host, if not specified or equals to 0,
            envd will randomly choose a free port
        host_dir (Optional[str]): log storage mount path in the host
    """
    install.python_packages(["tensorboard"])
    runtime.mount(host_path=host_dir, envd_path=envd_dir)
    runtime.daemon(
        commands=[
            [
                "tensorboard",
                "--logdir",
                "/home/envd/logs",
                "--port",
                str(envd_port),
                "--host",
                "0.0.0.0",
                ">>tensorboard.log",
                "2>&1",
            ],
        ]
    )
    runtime.expose(envd_port=envd_port, host_port=host_port, service="tensorboard")

```

:::

⏱️ **BuildKit 原生，构建速度提高 6 倍**

[BuildKit](https://github.com/moby/buildkit) 支持并行构建和构建时的软件缓存（例如 pip 和 apt 缓存）。你可以在不用了解细节的情况下享受到它的强大之处。

例如，PyPI 缓存是在不同的构建过程中可以被被共享。因此如果软件包以前被下载过，就会直接利用缓存安装。

<p align=center>
  <img src="https://user-images.githubusercontent.com/5100735/189928628-543f4851-87b7-462b-b811-372cbf46ff25.svg" width="65%"/>
</p>

## 三分钟建立你的 envd 环境

### 安装要求

- Docker (20.10.0 or above)

### 安装和初始化 `envd`

::: code-group

```bash [pip]
# envd 也可以用 pip 来安装。

pip3 install --upgrade envd
```

```bash [Homebrew]
# 如果你使用的是 MacOS，可以通过 homebrew 来安装 envd。

brew install envd
```

```bash [Pipx]
# envd 也可以通过 pipx 安装。

pipx install envd
```

```bash [安装脚本]
# 在终端中运行以下命令即可安装最新版本的 envd：

curl -sSfL https://envd.tensorchord.ai/install.sh | sudo bash
```

:::

安装完成后，请运行 `envd bootstrap` 来初始化。

```bash
envd bootstrap
```

::: tip

你可以在运行 `envd bootstrap` 时添加 `--dockerhub-mirror`或`-m`选项，来设置 docker.io 仓库的镜像。

```bash
envd bootstrap --dockerhub-mirror https://docker.mirrors.sjtug.sjtu.edu.cn
```

:::

### 创建一个 `envd` 环境

先克隆仓库[`envd-quick-start`](https://github.com/tensorchord/envd-quick-start):

```
git clone https://github.com/tensorchord/envd-quick-start.git
```

声明文件 `build.envd` 是这样的：

```python title=build.envd
def build():
    base(os="ubuntu20.04", language="python3")
    # Configure the pip index if needed.
    # config.pip_index(url = "https://pypi.tuna.tsinghua.edu.cn/simple")
    install.python_packages(name = [
        "numpy",
    ])
    shell("zsh")
```

:::tip
我们在这里使用 Python 作为例子，envd 也支持其他语言，如 R 和 Julia，参见[这里](https://github.com/tensorchord/envd/tree/main/examples)。
:::

然后可以运行下面的命令来建立一个新的环境：

```
cd envd-quick-start && envd up
```

```
$ cd envd-quick-start && envd up
[+] ⌚ parse build.envd and download/cache dependencies 2.8s ✅ (finished)
 => download oh-my-zsh                                                    2.8s
[+] 🐋 build envd environment 18.3s (25/25) ✅ (finished)
 => create apt source dir                                                 0.0s
 => local://cache-dir                                                     0.1s
 => => transferring cache-dir: 5.12MB                                     0.1s
...
 => pip install numpy                                                    13.0s
 => copy /oh-my-zsh /home/envd/.oh-my-zsh                                 0.1s
 => mkfile /home/envd/install.sh                                          0.0s
 => install oh-my-zsh                                                     0.1s
 => mkfile /home/envd/.zshrc                                              0.0s
 => install shell                                                         0.0s
 => install PyPI packages                                                 0.0s
 => merging all components into one                                       0.3s
 => => merging                                                            0.3s
 => mkfile /home/envd/.gitconfig                                          0.0s
 => exporting to oci image format                                         2.4s
 => => exporting layers                                                   2.0s
 => => exporting manifest sha256:7dbe9494d2a7a39af16d514b997a5a8f08b637f  0.0s
 => => exporting config sha256:1da06b907d53cf8a7312c138c3221e590dedc2717  0.0s
 => => sending tarball                                                    0.4s
envd-quick-start via Py v3.9.13 via 🅒 envd
⬢ [envd]❯ # You are in the container-based environment!
```

### 设置 Jupyter Notebook

修改 `build.envd` 开启 Jupyter Notebook 支持：

```python title=build.envd
def build():
    base(os="ubuntu20.04", language="python3")
    # Configure the pip index if needed.
    # config.pip_index(url = "https://pypi.tuna.tsinghua.edu.cn/simple")
    install.python_packages(name = [
        "numpy",
    ])
    shell("zsh")
    config.jupyter()
```

你可以通过 `envd envs ls` 获得正在运行的 Jupyter Notebook 的端口。

```bash
$ envd up --detach
$ envd envs ls
NAME                    JUPYTER                 SSH TARGET              CONTEXT                                 IMAGE                   GPU     CUDA    CUDNN   STATUS          CONTAINER ID
envd-quick-start        http://localhost:42779   envd-quick-start.envd   /home/gaocegege/code/envd-quick-start   envd-quick-start:dev    false   <none>  <none>  Up 54 seconds   bd3f6a729e94
```

## 路线图 🗂️

我们的路线图在这里 [ROADMAP](../community/roadmap)。

## 为 `envd` 贡献 😊

我们欢迎来自开源社区、个人和合作伙伴的各种贡献。

- 加入我们的 [Discord 社区](https://discord.gg/KqswhpVgdU)!
- 从源码构建可以阅读我们的[贡献指南](../community/contributing)和[开发教程](../developers/development).

利用 Gitpod 来开发：[![Open in Gitpod](https://gitpod.io/button/open-in-gitpod.svg)](https://gitpod.io/#https://github.com/tensorchord/envd)

---

**与我们交谈**

💬 有兴趣和我们交流一下您在构建或管理 AI/ML 应用方面的经验吗？

[**约个时间聊聊!**](https://forms.gle/9HDBHX5Y3fzuDCDAA)
