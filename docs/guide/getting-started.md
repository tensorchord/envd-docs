# Getting Started

## What is envd?

envd (`ɪnˈvdɪ`) is a command-line tool that helps you create the container-based development environment for AI/ML.

Development environments are full of python and system dependencies, CUDA, BASH scripts, Dockerfiles, SSH configurations, Kubernetes YAMLs, and many other clunky things that are always breaking. envd is to solve the problem:

1. Declare the list of dependencies (CUDA, python packages, your favorite IDE, and so on) in `build.envd`
2. Simply run `envd up`.
3. Develop in the isolated environment.

<p align="center">
  <img src="https://user-images.githubusercontent.com/5100735/189058399-3865a039-9459-4e74-83dd-3ee2ecadfef5.svg" width="75%"/>
</p>

## Why use `envd`?

Environments built with `envd` provide the following features out-of-the-box:

❤️ **Knowledge reuse in your team**

`envd` build functions can be reused. Use `include` function to import any git repositories. No more copy/paste Dockerfile instructions, let's reuse them.

```python
envdlib = include("https://github.com/tensorchord/envdlib")

def build():
    base(dev=True)
    install.conda()
    install.python()
    envdlib.tensorboard(8888)
```

<details>
  <summary><code>envdlib.tensorboard</code> is defined in <a href="https://github.com/tensorchord/envdlib/blob/main/src/monitoring.envd">github.com/tensorchord/envdlib</a></summary>

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
</details>

⏱️ **BuiltKit native, build up to 6x faster**

[BuildKit](https://github.com/moby/buildkit) supports parallel builds and software cache (e.g. pip index cache and apt cache). You can enjoy the benefits without knowledge of it.

For example, the PyPI cache is shared across builds and thus the package will be cached if it has been downloaded before.

<p align=center>
  <img style="background-color:white" src="https://user-images.githubusercontent.com/5100735/189928628-543f4851-87b7-462b-b811-372cbf46ff25.svg" width="65%"/>
</p>

## Setup your first `envd` environment in 3 minutes
### Requirements

- Docker (20.10.0 or above)

### Install and bootstrap `envd`

::: code-group

```bash [Pip]
# envd can be installed with pip.
pip install --upgrade envd
```

```bash [uv]
# if you are using `uv`
uv tool install envd
```

```bash [Homebrew]
# If you are on MacOS, envd can be installed with homebrew.
brew install envd
```

```bash [Pipx]
# envd can be installed with pipx.
pipx install envd
```

```bash [Install Script]
# Run the following command in your terminal to install the latest release of envd.
curl -sSfL https://envd.tensorchord.ai/install.sh | sudo bash
```

:::

After the installation, please run `envd bootstrap` to bootstrap:

```bash
envd bootstrap
```

::: tip

You can add `--dockerhub-mirror` or `-m` flag when running `envd bootstrap`, to configure the mirror for docker.io registry:

```bash
envd bootstrap --dockerhub-mirror https://docker.mirrors.sjtug.sjtu.edu.cn
```

:::

### Create an `envd` environment

Please clone the [`envd-quick-start`](https://github.com/tensorchord/envd-quick-start):

```bash
git clone https://github.com/tensorchord/envd-quick-start.git
```

The build manifest `build.envd` looks like:

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

*Note that we use Python here as an example but please check out examples for other languages such as R and Julia [here](https://github.com/tensorchord/envd/tree/main/examples).*

Then please run the command below to set up a new environment:

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

### Set up Jupyter notebook

Please edit the `build.envd` to enable jupyter notebook:

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

You can get the endpoint of the running Jupyter notebook via `envd envs ls`.

```bash
$ envd up --detach
$ envd envs ls
NAME                    JUPYTER                 SSH TARGET              CONTEXT                                 IMAGE                   GPU     CUDA    CUDNN   STATUS          CONTAINER ID
envd-quick-start        http://localhost:42779   envd-quick-start.envd   /home/gaocegege/code/envd-quick-start   envd-quick-start:dev    false   <none>  <none>  Up 54 seconds   bd3f6a729e94
```

## Roadmap 🗂️

Please check out [ROADMAP](../community/roadmap).

## Contribute 😊

We welcome all kinds of contributions from the open-source community, individuals, and partners.

- Join our [discord community](https://discord.gg/KqswhpVgdU)!
- To build from the source, please read our [contributing documentation](../community/contributing) and [development tutorial](../developers/development).

Develop with gitpod: [![Open in Gitpod](https://gitpod.io/button/open-in-gitpod.svg)](https://gitpod.io/#https://github.com/tensorchord/envd)

### Talk with us

💬 Interested in talking with us about your experience building or managing AI/ML applications?

[**Set up a time to chat!**](https://forms.gle/9HDBHX5Y3fzuDCDAA)
