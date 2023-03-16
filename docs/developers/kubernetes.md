# Development Tutorial for `envd-server`

`envd-server` is the backend server for `envd`. It manages environments on Kubernetes and supports multiple concurrent users.

## Workflow

Here is the workflow for how an `envd` environment is created on Kubernetes.

- The user creates an environment using `envd` in the envd console.
- `envd-server` validates the environment and prepares it for provisioning on Kubernetes.
- `envd-server` provisions the environment on Kubernetes.
- The user is notified that the environment is ready to use.
- User attaches to the environment with `ssh`.
- [containerssh](https://github.com/ContainerSSH/libcontainerssh/) is an ssh proxy that captures and forwards the ssh connection to the desired pod.

![](https://user-images.githubusercontent.com/5100735/201919714-0539bb67-3855-42f7-9b39-0d1f6a8f21e5.svg)

## Development Process

The steps below walk you through the setup process. If you have questions, you can ask on [discord](https://discord.gg/KqswhpVgdU) or post an issue that describes the place you are stuck, and we'll do our best to help.

First, you could run the command in `envd-server` to build and push the development image.

```bash
$ BASE_REGISTRY_USER=<username in docker hub> make build-image
```

After that, you could use helm to install the `envd-server` with the new image:

```bash
$ helm install --set image.repository=<username in docker hub>/envd-server --set image.tag=dev envd-server ./manifests
```

Then forward these two ports to localhost for debug purpose:

```bash
$ export POD_NAME=$(kubectl get pods --namespace default -l "app.kubernetes.io/name=envd-server,app.kubernetes.io/instance=envd-server" -o jsonpath="{.items[0].metadata.name}")
$ kubectl --namespace default port-forward $POD_NAME 8080:8080
$ kubectl --namespace default port-forward $POD_NAME 2222:2222
```

Then login to the `envd-server`, and create the environment to test if it works.

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

## References

- [envd-server design proposal](https://github.com/tensorchord/envd/blob/main/docs/proposals/20220603-kubernetes-vendor.md)
- [envd-server community issue](https://github.com/tensorchord/envd/issues/179)
