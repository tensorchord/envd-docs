---
author: 'Keming'
avatar: 'https://www.github.com/kemingy.png'
github: 'https://github.com/kemingy'
twitter: 'https://twitter.com/urcyanide'
introduction: 'Keming 是 envd 的维护者之一，他主要关注机器学习模型在线服务方向。'
---

# 在 Kubernetes 上做机器学习开发

Kubernetes 已经是容器编排方面无可争议的实施标准了。通常在做完数据清洗、模型训练、fine-tuning 之后，我们都会把模型服务打包成一个镜像并部署到 Kubernetes 集群中。容器提供了一个隔离的干净环境，保证服务能得到必须的资源，且不会被其他服务影响。这里你可能会想，这些特性对开发环境同样重要，为什么不在最初开发阶段就用上容器呢？

现在，`envd` 已经实现通过 [envd-server](https://github.com/tensorchord/envd-server/) 在 Kubernetes 上做机器学习开发的功能了。最大的好处之一就是你能有一个跨机器的统一的环境，别人也能使用这个环境来复现你的实验结果，你还可以基于这个实验环境来构建你的线上环境。自此，机器学习从开发到部署都会变得容易。

如果你是集群的管理员，你可能需要了解同事在集群中的资源使用情况。现在你可以通过 `envd` dashboard 来查看详情。如果你的团队已经在使用 RBAC 和资源控制等 Kubernetes 的特性，同样可以无缝接入。你可以设置 [ResourceQuota](https://kubernetes.io/docs/concepts/policy/resource-quotas/) 来确保资源的合理使用。

`envd` server 的具体部署和使用方式可以查看我们的 [在 Kubernetes 上 使用 `envd`](/teams/kubernetes.html) 文档。我们还提供了 Helm Chart 帮助用户一键设置好所有必须的组件。你也可以查看并修改 [values.yaml](https://github.com/tensorchord/envd-server/blob/main/manifests/values.yaml) 文件来客制化安装及相应配置。

未来，我们还会支持更多的认证方式，审查日志，文件同步功能等。期待大家的反馈！

---

<Author/>
