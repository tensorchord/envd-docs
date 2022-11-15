# envd on Kubernetes (Experimental)

:::warning

**This feature is in the experimental stage, which means it may be subject to change.**.

:::

`envd` allows you to manage your development environments on Kubernetes. You can use `envd` command to create, delete, and update development environments.

## Run envd-server on Kubernetes

This feature requires a envd-server running on the Kubernetes. Thus you need to deploy it with the helm chart provided in the [envd-server](https://github.com/tensorchord/envd-server) repository:

```bash
$ git clone https://github.com/tensorchord/envd-server
$ cd ./envd-server
$ helm install envd-server ./manifests
```

After that, you need to forward two TCP ports to `localhost`.

```bash
$ export POD_NAME=$(kubectl get pods --namespace default -l "app.kubernetes.io/name=envd-server,app.kubernetes.io/instance=envd-server" -o jsonpath="{.items[0].metadata.name}")
$ kubectl --namespace default port-forward $POD_NAME 8080:8080
$ kubectl --namespace default port-forward $POD_NAME 2222:2222
```

## Create the `envd` context

To create a development environment, you could create a new `envd` [context](./context.md), to tell `envd` that we are going to use the envd-server to manage environments on Kubernetes.

```bash
$ envd context create --name envd-server --use --builder docker-container --runner envd-server --runner-address localhost:2222
```

## Create the environment on Kubernetes

After that, you could build and push the image to a public registry.

```bash
$ envd build --output type=image,name=docker.io/<username>/<image>,push=true
```

Once you login to envd-server, you can create environments by running the `envd create` command (which is a hidden command for now).

```bash
$ envd login
$ envd create --image <username>/<image>
```
