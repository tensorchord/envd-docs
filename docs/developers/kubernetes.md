# Development Tutorial for `envd-server`

`envd-server` is the backend server for `envd`. It manages environments on Kubernetes and supports multiple concurrent users.

## Workflow

Here is the workflow for how an `envd` environment is created on Kubernetes.

- The user creates an environment using `envd` in the envd console.
- `envd-server` validates the environment and prepares it for provisioning on Kubernetes.
- `envd-server` provisions the environment on Kubernetes.
- The user is notified that the environment is ready to use.
- User attaches to the environment with `ssh`.
- [containerssh](https://github.com/ContainerSSH/libcontainerssh/) is a ssh proxy that captures and forwards the ssh connection to the desired pod.

![](https://user-images.githubusercontent.com/5100735/201919714-0539bb67-3855-42f7-9b39-0d1f6a8f21e5.svg)

## References

- [envd-server design proposal](https://github.com/tensorchord/envd/blob/main/docs/proposals/20220603-kubernetes-vendor.md)
- [envd-server community issue](https://github.com/tensorchord/envd/issues/179)
