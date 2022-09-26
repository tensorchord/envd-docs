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




---

**Talk with us**

💬 Interested in talking with us about your experience building or managing AI/ML applications?

[**Set up a time to chat!**](https://forms.gle/9HDBHX5Y3fzuDCDAA)
