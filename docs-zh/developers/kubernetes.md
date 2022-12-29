# `envd-server` 的开发指南

`envd-server` 是 `envd` 的后端服务。它在 Kubernetes 上管理环境并支持多个并发用户。


## 工作流程


以下是如何在 Kubernetes 上创建 `envd` 环境的工作流程。

- 用户在 envd 控制台使用 `envd` 创建一个环境。
- `envd-server` 对环境进行验证，并为在 Kubernetes 上的配置做准备。
- `envd-server` 在 Kubernetes 上配置环境。
- 用户会被通知环境已经准备好了，可以使用。
- 用户用 `ssh` 连接到环境。
- [containerssh](https://github.com/ContainerSSH/libcontainerssh/)是一个 ssh 代理，捕获并转发 ssh 连接到所需的 pod。

![](https://user-images.githubusercontent.com/5100735/201919714-0539bb67-3855-42f7-9b39-0d1f6a8f21e5.svg)

## 开发过程

下面的步骤指导你完成设置过程。如果你有问题，你可以在 [discord](https://discord.gg/KqswhpVgdU) 上提问，或者发布一个 issue，描述你被卡住的地方，我们会尽力帮助。

首先，你可以运行 `envd-server` 中的命令来构建和推送开发镜像。

```bash
$ BASE_REGISTRY_USER=<username in docker hub> make build-image
```

之后，你可以用 helm 将 `envd-server` 和新镜像一起安装：

```bash
$ helm install --set image.repository=<username in docker hub>/envd-server --set image.tag=dev envd-server ./manifests
```

然后将这两个端口转发到 localhost 用于调试：


```bash
$ export POD_NAME=$(kubectl get pods --namespace default -l "app.kubernetes.io/name=envd-server,app.kubernetes.io/instance=envd-server" -o jsonpath="{.items[0].metadata.name}")
$ kubectl --namespace default port-forward $POD_NAME 8080:8080
$ kubectl --namespace default port-forward $POD_NAME 2222:2222
```

然后登录到 `envd-server`，并创建环境以测试其是否工作：

```bash
# Create the context to tell envd to use the envd-server to run the environments.
$ envd context create --name envd-server --use --builder docker-container --runner envd-server --runner-address http://localhost:8080
# Build the image, and push it to docker hub.
$ envd build --output type=image,name=docker.io/<username>/<image>,push=true
# login to the envd-server.
$ envd login
# Create the environment and attach to the the environment.
$ envd run --image <username>/<image>
```

## 参考资料

- [envd-server design proposal](https://github.com/tensorchord/envd/blob/main/docs/proposals/20220603-kubernetes-vendor.md)
- [envd-server community issue](https://github.com/tensorchord/envd/issues/179)
