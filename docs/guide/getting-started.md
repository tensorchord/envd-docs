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
    base(os="ubuntu20.04", language="python")
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

⏱️ **Builtkit native, build up to 6x faster**

[Buildkit](https://github.com/moby/buildkit) supports parallel builds and software cache (e.g. pip index cache and apt cache). You can enjoy the benefits without knowledge of it.

For example, the PyPI cache is shared across builds and thus the package will be cached if it has been downloaded before.

<p align=center>
  <img src="https://user-images.githubusercontent.com/5100735/189928628-543f4851-87b7-462b-b811-372cbf46ff25.svg" width="65%"/>
</p>

🐍 **One configuration to rule them all**

Development environments are full of Dockerfiles, bash scripts, Kubernetes YAML manifests, and many other clunky files that are always breaking. You just need one configuration file `build.envd`[^1], it works both for local Docker and Kubernetes clusters in the cloud.

![envd](https://user-images.githubusercontent.com/5100735/188821980-dcbd9069-b504-436a-9ffd-05ac5543a6d1.png)

[^1]: The build language is [starlark](https://docs.bazel.build/versions/main/skylark/language.html), which is a dialect of Python.

✍️ **Don't sacrifice your developer experience**

SSH is configured for the created environment. You can use vscode-remote, jupyter, pycharm or other IDEs that you love. Besides this, declare the IDE extensions you want, let `envd` take care of them.

```python
def build():
    install.vscode_extensions([
        "ms-python.python",
    ])
```

☁️ **No polluted environment**

Are you working on multiple projects, all of which need different versions of CUDA? `envd` helps you create isolated and clean environments. 

## Who should use envd?

We’re focused on helping data scientists and teams that develop AI/ML models. And they may suffer from:

- building the development environments with Python/R/Julia, CUDA, Docker, SSH, and so on. Do you have a complicated Dockerfile or build script that sets up all your dev environments, but is always breaking?
- Updating the environment. Do you always need to ask infrastructure engineers how to add a new Python/R/Julia package in the Dockerfile?
- Managing environments and machines. Do you always forget which machines are used for the specific project, because you handle multiple projects concurrently?


## Setup your first `envd` environment in 3 minutes
### Requirements

- Docker (20.10.0 or above)

### Install and bootstrap `envd`

`envd` can be installed with `pip` (only support Python3). After the installation, please run `envd bootstrap` to bootstrap.

```bash
pip3 install --pre --upgrade envd
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

```
git clone https://github.com/tensorchord/envd-quick-start.git
```

The build manifest `build.envd` looks like:

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

*Note that we use Python here as an example but please check out examples for other languages such as R and Julia [here](https://github.com/tensorchord/envd/tree/main/examples).*

Then please run the command below to set up a new environment:

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

### Set up Jupyter notebook

Please edit the `build.envd` to enable jupyter notebook:

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

You can get the endpoint of the running Jupyter notebook via `envd envs ls`.

```bash
$ envd up --detach
$ envd envs ls
NAME                    JUPYTER                 SSH TARGET              CONTEXT                                 IMAGE                   GPU     CUDA    CUDNN   STATUS          CONTAINER ID
envd-quick-start        http://localhost:42779   envd-quick-start.envd   /home/gaocegege/code/envd-quick-start   envd-quick-start:dev    false   <none>  <none>  Up 54 seconds   bd3f6a729e94
```

## More on documentation 📝

See [envd documentation](https://envd.tensorchord.ai/guide/getting-started.html).

## Roadmap 🗂️

Please checkout [ROADMAP](https://envd.tensorchord.ai/community/roadmap.html).

## Contribute 😊

We welcome all kinds of contributions from the open-source community, individuals, and partners.

- Join our [discord community](https://discord.gg/KqswhpVgdU)!
- To build from the source, please read our [contributing documentation](https://envd.tensorchord.ai/community/contributing.html) and [development tutorial](https://envd.tensorchord.ai/developers/development.html).

Develop with gitpod: [![Open in Gitpod](https://gitpod.io/button/open-in-gitpod.svg)](https://gitpod.io/#https://github.com/tensorchord/envd)

### Talk with us

💬 Interested in talking with us about your experience building or managing AI/ML applications?

[**Set up a time to chat!**](https://forms.gle/9HDBHX5Y3fzuDCDAA)
