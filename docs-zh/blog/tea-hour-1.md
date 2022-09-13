---
author: 'Ce Gao'
avatar: 'https://www.github.com/gaocegege.png'
github: 'https://github.com/gaocegege'
twitter: 'https://twitter.com/gaocegege'
introduction: 'Ce Gao 是 envd 的维护者之一。与此之外，他还是机器学习基础设施开源项目 Kubeflow 的 Co-chair。他主要关注机器学习的模型训练、自动机器学习等领域。'
---

# TensorChord Tea Hour: Buildkit Internals

Buildkit 是 `docker build` 背后的顶梁柱，当我们在利用 docker 构建镜像时，背后就是 buildkit 的功劳。所以大家可能都是 Buildkit 的用户，尽管它的光芒大部分都被 docker 所隐藏。[tensorchord/envd](https://github.com/tensorchord/envd) 也是基于 buildkit 来实现的，为算法工程师和 AI 基础设施团队提供镜像和开发环境构建的新选择。

除此之外，还有一些传统基础设施领域的新项目如 [dagger](https://github.com/dagger/dagger)、[earthly](https://github.com/earthly/earthly)、[acorn](https://github.com/acorn-io/acorn) 等也都是基于 buildkit 设计的。buildkit 正在各个领域默默地发光发热，堪称容器领域的扫地僧项目。

[之前的文章中](http://gaocegege.com/Blog/kubernetes/buildkit)，我们介绍了 buildkit 支持的特性与功能。在北京时间 8 月 26 日的 16:00，我们在 TensorChord Tea Hour 上分享 buildkit 的更多设计与实现细节。分享的 slides 也[公开放送](https://docs.google.com/presentation/d/1Z8JLeNbH_pDWwO7JsOUNAgZtULxur99eMCLIyLGCTYk/edit?usp=sharing)。

TensorChord Tea Hour 是 [TensorChord](https://github.com/tensorchord) 每月一次的技术分享系列。每个月的最后一个星期五，我们会围绕深度学习、容器、集群调度等相关领域的话题进行分享或是讨论。感兴趣可以订阅[谷歌日历](https://calendar.google.com/calendar/u/0?cid=c2FwYmU3NWtlNm0xbHVpbWVsa2k4djZsN29AZ3JvdXAuY2FsZW5kYXIuZ29vZ2xlLmNvbQ)长期关注。

<iframe style="margin: 0 auto;" width="560" height="315" src="https://www.youtube.com/embed/ELpl6Dax3Gk?start=2" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

最后放出本次技术分享的[录制视频](https://www.youtube.com/channel/UCCA7u-PLO1fP8j1X7Pgut1Q)，希望对各位技术爱好者有所帮助。

---

<Author/>
