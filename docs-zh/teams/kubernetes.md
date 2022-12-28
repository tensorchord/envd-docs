# 在 Kubernetes 上 使用 envd (试验性)

:::warning

**这个特性还在试验阶段，这意味着它可能发生变化。**

:::

`envd` 允许你在 Kubernetes 上管理你的开发环境。你可以使用 `envd` 命令来创建、删除和更新开发环境。

## 在 Kubernetes 上运行 envd-server 

这个功能需要在 Kubernetes 上运行一个 envd-server。envd-server 是一个软件，它可以帮助你更有效地管理你的 AI/ML 环境。它很容易使用，并包括广泛的功能。

你需要用 [envd-server](https://github.com/tensorchord/envd-server) 资源库中提供的 helm chart 来部署它。

```bash
$ git clone https://github.com/tensorchord/envd-server
$ cd ./envd-server
$ helm install envd-server ./manifests
```

你可以通过修改 `values.yaml` 文件来定制 envd-server。例如，你可以把`server.debug` 的值改为 `true` 以启用调试模式。

```yaml
# envd server debug mode
server:
  debug: false
  noauth: true
  imagePullSecret: ""
  # Whether to run the database migration process
  migration: true
  # Leave blank will use ${image.Repository}-migration:${image.tag} as the migration image
  migrationImage: ""
```

### 配置镜像拉取 Secret (可选)

本页展示了如何创建一个 envd 服务实例，该实例使用一个 Secret 来从私有容器镜像注册或存储库中提取镜像。

如果你已经运行了 docker login，你可以将该凭证复制到 Kubernetes 中：

```bash
kubectl create secret generic regcred \
    --from-file=.dockerconfigjson=<path/to/.docker/config.json> \
    --type=kubernetes.io/dockerconfigjson
```

然后你就可以检查这个 secret 了：


```bash
kubectl get secret regcred --output=yaml
```

输出应该与下面类似：

```yaml
apiVersion: v1
kind: Secret
metadata:
  ...
  name: regcred
  ...
data:
  .dockerconfigjson: eyJodHRwczovL2luZGV4L ... J0QUl6RTIifX0=
type: kubernetes.io/dockerconfigjson
```

你可以使用这个 secret 来拉取镜像了：

```bash
$ helm install --set server.imagePullSecret=regcred envd-server ./manifests
```

服务器将使用该 secret 来拉取镜像。如果你有任何问题，请看一下[Kubernetes文档中的指南](https://kubernetes.io/docs/tasks/configure-pod-container/pull-image-private-registry/)。

## 端口转发

然后，你需要把两个 TCP 端口转发到 `localhost`。

```bash
$ export POD_NAME=$(kubectl get pods --namespace default -l "app.kubernetes.io/name=envd-server,app.kubernetes.io/instance=envd-server" -o jsonpath="{.items[0].metadata.name}")
$ kubectl --namespace default port-forward $POD_NAME 8080:8080 2222:2222
```

## 创建 `envd` 上下文

为了创建一个开发环境，你可以创建一个新的 `envd` [上下文](./context.md)，以告诉 `envd` 我们将使用 envd-server 来管理 Kubernetes 上的环境。

```bash
$ envd context create --name envd-server --use --builder docker-container --runner envd-server --runner-address http://localhost:8080 
```

## 在 Kubernetes 上创建环境

之后，你可以通过运行 `envd run` 命令（目前是一个隐藏的命令）来创建环境。

```bash
$ envd login
$ envd run --image tensorchord/python-basic
```

或者你可以自己建立镜像并将其推送到注册站，然后运行 `envd run` 命令来创建环境。

```bash
$ envd run --image <your-image>
```

你可以建立并将镜像推送到一个公共注册站。


```bash
$ envd build --output type=image,name=docker.io/<loginname in docker hub>/<image>,push=true
$ envd login --username <username>
$ envd run --image <your-image>
```

## 定制化

你可以通过在 Kubernetes 集群中添加一个 [pod defaulting webhook](https://kubernetes.io/docs/reference/access-authn-authz/extensible-admission-controllers/) 来定制这个环境。下面是一个例子[envd-server-pod-webhook](https://github.com/tensorchord/envd-server-pod-webhook)。

这个 webhook 将会给 pod [添加一个环境变量](https://github.com/tensorchord/envd-server-pod-webhook/blob/main/pkg/mutation/inject_env.go#L28) `KUBE=true`:

```go
// Mutate returns a new mutated pod according to set env rules
func (se injectEnv) Mutate(pod *corev1.Pod) (*corev1.Pod, error) {
	se.Logger = se.Logger.WithField("mutation", se.Name())
	mpod := pod.DeepCopy()

	// build out env var slice
	envVars := []corev1.EnvVar{{
		Name:  "KUBE",
		Value: "true",
	}}

	// inject env vars into pod
	for _, envVar := range envVars {
		se.Logger.Debugf("pod env injected %s", envVar)
		injectEnvVar(mpod, envVar)
	}

	return mpod, nil
}
```

你可以用下面的命令来部署该 webhook。

```bash
$ git clone https://github.com/tensorchord/envd-server-pod-webhook
$ cd ./envd-server-pod-webhook
$ make deploy
```
