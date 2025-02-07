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
    base(dev=True)
    install.conda()
    install.python()
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

pip install --upgrade envd
```

```bash [uv]
# if you are using `uv`
uv tool install envd
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

```bash
git clone https://github.com/tensorchord/envd-quick-start.git
```

声明文件 `build.envd` 是这样的：

```python title=build.envd
def build():
    config.repo(url="https://github.com/tensorchord/envd", description="envd quick start example")
    base(dev=True)
    install.conda()
    install.python()
    # Configure pip index if needed.
    # config.pip_index(url = "https://pypi.tuna.tsinghua.edu.cn/simple")
    install.python_packages(name = [
        "numpy",
    ])
    shell("fish")
```

:::tip
我们在这里使用 Python 作为例子，除此之外，`envd` 也支持其他语言，如 R 和 Julia，参见[这里](https://github.com/tensorchord/envd/tree/main/examples)。
:::

然后可以运行下面的命令来建立一个新的环境：

```bash
cd envd-quick-start && envd up
```

```bash
$ cd envd-quick-start && envd up
[+] ⌚ parse build.envd and download/cache dependencies 6.2s ✅ (finished) 
[+] build envd environment 19.0s (47/47) FINISHED                                                 
 => CACHED [internal] setting pip cache mount permissions                                     0.0s
 => docker-image://docker.io/tensorchord/envd-sshd-from-scratch:v0.4.3                        2.3s
 => => resolve docker.io/tensorchord/envd-sshd-from-scratch:v0.4.3                            2.3s
 => docker-image://docker.io/library/ubuntu:22.04                                             0.0s
......
 => [internal] pip install numpy                                                              2.5s
 => CACHED [internal] download fish shell                                                     0.0s
 => [internal] configure user permissions for /opt/conda                                      1.0s
 => [internal] create dir for ssh key                                                         0.5s
 => [internal] install ssh keys                                                               0.2s
 => [internal] copy fish shell from the builder image                                         0.2s
 => [internal] install fish shell                                                             0.5s
......
 => [internal] create work dir: /home/envd/envd-quick-start                                   0.2s
 => exporting to image                                                                        7.7s
 => => exporting layers                                                                       7.7s
 => => writing image sha256:464a0c12759d3d1732404f217d5c6e06d0ee4890cccd66391a608daf2bd314e4  0.0s
 => => naming to docker.io/library/envd-quick-start:dev                                       0.0s
------
 > importing cache manifest from docker.io/tensorchord/python-cache:envd-v0.4.3:
------
⣽ [5/5] attach the environment  [2s]            
Welcome to fish, the friendly interactive shell
Type help for instructions on how to use fish

envd-quick-start on git master [!] via Py v3.11.11 via 🅒 envd as sudo 
⬢ [envd]❯ # You are in the container-based environment!
```

### 设置 Jupyter Notebook

修改 `build.envd` 开启 Jupyter Notebook 支持：

```python title=build.envd
def build():
    config.repo(url="https://github.com/tensorchord/envd", description="envd quick start example")
    base(dev=True)
    install.conda()
    install.python()
    # Configure pip index if needed.
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

[**约个时间聊聊！**](https://forms.gle/9HDBHX5Y3fzuDCDAA)
