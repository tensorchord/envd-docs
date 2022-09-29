# 在团队里使用 envd

`envd`是为团队使用设计的! 🥰

这个教程将展示了如何轻松 `envd` 成到你的基础设施。如果你遇到问题，请在[💬 Discord](https://discord.gg/KqswhpVgdU)上联系我们，我们很乐意帮助你！

## 它是如何工作的？

你的 git 仓库中的`build.envd`将负责描述`envd`的环境配置。运行 `envd build` 来构建和推送镜像，您可以轻松地集成在现有 CI/CD 系统中，如 GitHub Actions、Jenkins 或 Argo。

用户可以将镜像推送到任何 OCI 兼容的镜像仓库，如 Docker Hub、Harbor 或 Quay。之后您就可以在内部额 AI/ML 平台上使用。

![](./assets/how.png)

AI/ML 工程师和基础设施工程师都可以从 `envd` 中受益。AI/ML 工程师能够：

- **轻松构建环境**：你可以用 Python 编写简单的指令，而不是用 Bash / Makefile / Dockerfile / ...，来构建开发环境。
- **重现结果**： `envd` 构建是隔离的、干净的。你可以在你的笔记本电脑、公共云虚拟机或 Docker 容器上复制相同的开发环境，而不需要改变任何设置。
- **与同事分享你的工作**：你可以通过 Docker Hub 或其他 OCI 镜像仓库共享、版本化控制及发布 `envd` 的镜像。

基础设施工程师能够：

- **厘清 infra 与 AI/ML 团队的边界和期望**。 `envd` 有助于在基础设施和 AI/ML 团队之间建立明确的界限和合理的期望。AI/ML 工程师可以建立环境而不需要向基础设施工程师寻求帮助。你可以有更多的时间来关注基础设施。
- **无痛维护 `envd`**：`envd` 图像可以在任何 OCI 图像注册处发布。对使用 `envd` 没有新的要求。
- **在 CI/CD 平台中使用 `envd`**：`envd` 与 CI/CD 平台整合得很好。
- **节省你的时间和资源**。`envd` 支持共享构建缓存和[远程构建]（/teams/context）等功能。它可以节省了大量的时间。

## 构建和推送镜像

你可以使用下面的命令来构建和推送镜像到 Docker Hub。

```bash
$ envd build --output type=image,name=docker.io/<username>/<image>, push=true
```

`envd build --output`支持的选项

- `type=image`：指定输出类型是镜像。
- `name=<value>`: 指定镜像名称
- `push=true`：在创建镜像之后推送

## 使用镜像

`envd`镜像默认包含一个 sshd 服务器和一个名为`envd`的 conda 环境。sshd 服务器的默认端口是 2222。你可能需要在你的 Kubernetes 部署中公开该端口的访问。

除此之外，git 仓库源代码不会在镜像中。因此，你可能需要另外操作将 git 仓库里的源代码集成到镜像中。
