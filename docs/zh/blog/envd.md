---
author: 'Ce Gao'
avatar: 'https://www.github.com/gaocegege.png'
github: 'https://github.com/gaocegege'
twitter: 'https://twitter.com/gaocegege'
introduction: 'Ce Gao 是 envd 的维护者之一。与此之外，他还是机器学习基础设施开源项目 Kubeflow 的 Co-chair。他主要关注机器学习的模型训练、自动机器学习等领域。'
---

# envd：配置深度学习炼丹环境的新选择

在训练和调试深度学习模型时，经常需要在数据服务器、训练服务器、本地调试环境等等之间来回穿梭。这就是目前每一个算法工程师的工作现状。

而这个过程充满了痛苦，我们不得不与各种各样的工具和系统搏斗。一行行查 Manual 写出来的 Bash 脚本、花样繁多的 Dockerfile、Kubernetes YAML 配置。当然，一定少不了最让人头秃的 CUDA 相关问题了。

> A: 你的代码在我这里跑不起来啊，报错 CUDA 版本不一致
>
> B: 啊？在我这里是好的，你的 CUDA 是什么版本啊
>
> A: 我的版本和你一样啊（挠头）

[envd](https://github.com/tensorchord/envd) 希望能够让 AI/ML 领域的环境配置不再让人困扰。envd 为使用者提供了通过 Python 来描述环境的可能。你甚至不需要专门学习就能利用 [envd](https://github.com/tensorchord/envd) 来完成一些复杂的环境构建过程。其次 [envd](https://github.com/tensorchord/envd) 仍在支持更多的运行时，其中包括 Kubernetes、远端服务器、本地 Docker 或 Podman 等。确保使用者可以在任何地方都可以自信地进行模型训练和推理。这一切都是建立在不需要了解 Kubernetes 等基础设施的基础上。作为基础设施领域的工程师，我们坚信，使用 Kubernetes 体验最好的方式就是你永远不需要了解它。

```python
def build():
    base(os="ubuntu20.04", language="python")
    install.cuda(version="11.6", cudnn="8")
    install.python_packages(name=[
        "tensorflow-gpu"
    ])
```

最后，在 AI/ML 的场景下，[envd](https://github.com/tensorchord/envd) 的构建速度比 Docker[^1] **快 6 倍**。更快的构建帮助使用者更快地迭代模型。

[^1]: Dockerfile v1

## envd 的起源

让我们回到 [envd](https://github.com/tensorchord/envd) 出生的那天。2022 年初，我和我的朋友金晶聊起了我们在 AI/ML 领域遇到的令人讨厌的问题。

问题非常多，但是要说最烦人的，毫无疑问是与训练开发环境相关的一系列问题。作为 AI 基础设施的工程师，我最常被我所服务的算法工程师们问到的问题包括但不限于：

- 为什么我的训练任务在我本地是好的，但是到了你的集群上就跑不起来啦？
- 为什么我的这个容器，只是更新了一下 python 依赖，整个就不能用了？
- 为什么我的训练在之前的节点上能跑，到了你这儿就 CUDA 报错了？
- 为什么我的训练到现在还没有调度起来？
- 为什么我只是 `docker commit` 了一下提交了一个不到 10MB 的依赖，你一下把我的镜像搞大了 2GB？

于是我们就此陷入了对各自遇到的稀奇古怪的环境问题的吐槽中去了。当然我们也交流了 VSCode Remote 和 Jupyter notebook 哪个更好用之类的。2022 年了，我们讨论的话题仍旧离不开程序员三大件：编程语言、编程环境、和编辑器。

讨论结束后，我们一起脑洞了一个好的体验应该是什么样子的。这就是 [envd](https://github.com/tensorchord/envd) 的由来。

## 问题在哪里

我们认为，目前体验糟糕最主要的原因，在于目前 AI 基础设施领域的产品或项目，都是面向基础设施的（Infrastructure oriented）。它们更像是为基础设施工程师设计的，而不是为终端用户：算法工程师和数据科学家们设计的。所以这些产品都以资源利用率、GPU 共享、完善的运维支持等为卖点。

但，我们作为基础设施工程师和算法工程师在技术背景和使用习惯等方面都有着显著且不可忽视的差异。这些差异都使得算法工程师们并不能很好地使用那些原本就是面向基础设施工程师设计的产品，比如 Kubernetes。

当然，我们也坚定地认为不应该让算法工程师们学习如何使用 Kubernetes。Kubernetes 能够做绝大多数你想做的事情，你甚至还能[利用 Kubernetes 管理喷气式飞机](https://www.youtube.com/watch?v=YjZ4AZ7hRM0&ab_channel=CNCF%5BCloudNativeComputingFoundation%5D)。但是它就像是 Cloud 时代的 Linux kernel，没有道理让每一个工程师都了解内核的工作原理吧。

如果把问题聚焦在 AI/ML 领域，那么更进一步，Docker 也可以被更简单的抽象。我们相信也没有算法工程师想了解 containerd、runc、buildkit、OCI spec 这些底层晦涩的知识。

## envd 是如何设计的

所以，[envd](https://github.com/tensorchord/envd) 希望能够将这些目前已经在工业界广泛使用的基础设施，面向 AI/ML 领域进一步抽象，为算法工程师和数据科学家团队们提供更加简单易用的工具和产品。[envd](https://github.com/tensorchord/envd) 的愿景是使用者再也不需要关心基础设施，只需要通过 TensorFlow、PyTorch、Jax 等框架开发模型即可。

<div align="center">
<img src='https://user-images.githubusercontent.com/5100735/188788542-269d1049-6b19-4c9d-82c2-5fb828ebdc6d.png' width='60%'>
</div>

为此，[envd](https://github.com/tensorchord/envd) 引入了基于 python 的构建文件 `build.envd`。它不再像 Kubernetes 的 YAML 配置或者是 Dockerfile 一样，围绕基础设施或者是通用容器的构建来定义配置。而是围绕 AI/ML 的模型开发与推理来进行。

下面是一个非常简单的示例。展示了如何构建一个 TensorFlow 的开发环境。

<div align="center">
<img src='https://user-images.githubusercontent.com/5100735/189038209-9d400aff-c816-4cfc-a68f-1b6c481806ae.svg'>
</div>

为了能够在 Kubernetes、远端服务器等不同的环境下使用 [envd](https://github.com/tensorchord/envd) 构建的环境，我们维护了一个非常轻量级的 sshd 的实现，并内置于其中。因此用户可以通过 ssh 协议连接到环境进行开发和调试。当然，你可以可以通过 [envd](https://github.com/tensorchord/envd) 提供的语法在环境中安装需要的 vscode extension，或者是配置使用 Jupyter。

```python
def build():
    base(os="ubuntu20.04", language="python3")
    install.vscode_extensions([
        "ms-python.python",
    ])
    # Configure jupyter notebooks.
    config.jupyter()
    # Configure zsh.
    shell("zsh")
```

## envd 的构建速度

因为聚焦在 AI/ML 领域，因此我们对 Docker 和 buildkit 的使用进行了特殊的优化。使得在这一场景下的 [envd](https://github.com/tensorchord/envd) 构建速度比 Docker **快 6 倍**。

<p align=center>
  <img src="https://user-images.githubusercontent.com/5100735/188601795-8c37f5a3-b13b-422b-816f-8a0c51f1f8b1.svg" width="65%"/>
</p>

这得益于 [envd](https://github.com/tensorchord/envd) 在各个层次上的 cache。举个例子来说明，在 Docker 中如果 Dockerfile 前面的命令缓存失效了，那么后续的命令都要重新执行，也包括 `pip install` 命令。它需要重新下载。

而 [envd](https://github.com/tensorchord/envd) 会在多次构建间维护 pip index 的 cache，使得后续的构建不需要再重新下载 wheel，只需要使用已经被缓存的包即可。

<table>
<tr>
<td> envd </td> <td> Docker </td>
</tr>
<tr>
<td>

```diff
$ envd build
=> pip install tensorflow       5s
+ => Using cached tensorflow-...-.whl (511.7 MB)
```

</td>
<td>

```diff
$ docker build
=> pip install tensorflow      278s
- => Downloading tensorflow-...-.whl (511.7 MB)
```

</td>
</tr>
</table>


## 在你的团队中使用

在一个团队里，通常大家会基于相同的基础配置进行修改的方式配置环境。在之前只能通过口耳相传的 Dockerfile 进行。而在 [envd](https://github.com/tensorchord/envd) 中可以定义 python 函数来完成。下面例子中的 `configure_streamlit` 和 `configure_mnist` 就可以被复用。在团队内的构建需要可以以 [envd](https://github.com/tensorchord/envd) 中定义的函数的形式积累下来，形成 envd Hub（目前正在进一步设计中，通过它可以在团队内更好地共享环境配置）。

```python
def build():
    base(os="ubuntu20.04", language="python3")
    configure_mnist()

def configure_streamlit(port):
    install.python_packages([
        "streamlit",
        "streamlit_drawable_canvas",
    ])
    runtime.expose(envd_port=port, host_port=port, service="streamlit")
    runtime.daemon(commands=[
        ["streamlit", "run", "~/streamlit-mnist/app.py"]
    ])

def configure_mnist():
    install.apt_packages([
        "libgl1",
    ])
    install.python_packages([
        "tensorflow",
        "numpy",
        "opencv-python",
        "matplotlib",
    ])
```

团队的使用还有很多方式，比如 CI/CD 的集成支持等，后续我们通过单独的文章进行介绍。

## 结论

[envd](https://github.com/tensorchord/envd) 目前仍处于非常早期的阶段，我们只是踏出了第一步，帮助算法工程师和数据科学家团队关注于 AI/ML 业务，而非基础设施。在近期 [envd](https://github.com/tensorchord/envd) 会着眼于更好的团队需求支持，提供更加完善的 Kubernetes 运行时。

欢迎大家保持关注!

🍻

---

<Author/>
