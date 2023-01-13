---
author: 'Keming'
avatar: 'https://www.github.com/kemingy.png'
github: 'https://github.com/kemingy'
twitter: 'https://twitter.com/urcyanide'
introduction: 'Keming is one of the envd maintainers. He mainly focus on the online machine learning model serving part.'
---

# Develop machine learning applications in the Kubernetes cluster

Kubernetes has become the de facto standard container orchestration system. After data cleaning, model training, and fine-tuning, the model services will be packed into a docker container and deployed to the Kubernetes cluster. The container provides an isolated and clean environment to guarantee that the service can get the needed resources and won't be affected by other services. You may wonder why not bring those cool features to the development environment. So everyone can do their work without affecting others.

We are glad to announce that `envd` already supports this feature with [envd-server](https://github.com/tensorchord/envd-server/). It allows you to create a machine learning development environment directly in the Kubernetes cluster. One of the most benefits is that you will have a consistent environment across multiple machines. Others can also reproduce your results in the same environment. Meanwhile, you can build the online model serving image based on the current one. So there will be less gap to productionalize your machine learning models.

As an admin, you may want to know the current resource usage for different teammates. Now you can get the information from the `envd` dashboard. For teams already using Kubernetes for RBAC and resource control, it's also compatible with the `envd` server. You can set the [ResourceQuota](https://kubernetes.io/docs/concepts/policy/resource-quotas/) to ensure the resources are well utilized.

Check the [`envd` on Kubernetes](/teams/kubernetes.html) documentation to set up the `envd` server in a Kubernetes cluster. We provide a Helm Chart to help you set up all the essential components. You can also customize the installation by editing the [values.yaml](https://github.com/tensorchord/envd-server/blob/main/manifests/values.yaml) file.

In the future, we will support more authentication methods, audit logs, file syncing, etc. We are looking forward to your feedback!

---

<Author/>

