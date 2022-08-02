# `envd` 路线图

欢迎加入我们的讨论，一起构建社区。

- 加入我们的 Discord 社区 [💬 Discord](https://discord.gg/KqswhpVgdU)
- 查看 [good first issue 💖](https://github.com/tensorchord/envd/issues?q=is%3Aissue+is%3Aopen+label%3A%22good+first+issue+%E2%9D%A4%EF%B8%8F%22) 问题！
- 社区贡献指南 [contributing page](./contributing.md)

## 短期目标 - 我们正在做什么 🎉

我们正在努力打造 MVP(最简可行产品)！

- **构建语言**
    - 支持更多语言。参见 [feat: Support environments with multiple languages](https://github.com/tensorchord/envd/issues/407), [feat: Support Julia language](https://github.com/tensorchord/envd/issues/408)
    - [支持多目标构建](https://github.com/tensorchord/envd/issues/403)
    - [实现 `envd` 的语言服务器](https://github.com/tensorchord/envd/issues/358)
    - [支持 oh-my-zsh 插件配置](https://github.com/tensorchord/envd/issues/106)
    - [支持自定义基础镜像](https://github.com/tensorchord/envd/issues/261)

- **运行时**
    - 收集GPU/CPU 的指标，通过 Web UI 展示： [Add agent to collect metrics in the container (or in the host)](https://github.com/tensorchord/envd/issues/218)
    - 在 dockerd 22.06-beta 中支持 buildkitd moby worker: [Support buildkitd moby worker in dockerd 22.06-beta](https://github.com/tensorchord/envd/issues/51)。这是一项重大的改进，可以加速构建过程。我们在 docker 22.06 中使用 moby worker，并在 docker 20.10 中回退到 docker worker。

- **生态系统**
    - `envd` 的 vscode 扩展：[Contribute the vscode-envd extension](https://github.com/tensorchord/vscode-envd)
    - 提供 Web 界面

## 中期目标 - 我们接下来要做什么！🏃

- **构建语言**
    - 支持数据集管理：[Support data management in the environment](https://github.com/tensorchord/envd/issues/5)

- **运行时**
    - 支持 Kubernetes、Docker 运行时：[Support both Kubernetes and Docker runtimes](https://github.com/tensorchord/envd/issues/179)。数据科学家或 AI/ML 团队不仅在他们的主机上进行开发，也需要 GPU 集群来运行大规模的训练作业。`envd` 支持 Kubernetes 和 Docker 运行时。用户无需更改任何代码即可迁移到云端。

- **生态系统**
    - 设计拓展机制加载用户自定义函数：[Design the extension mechanism to reuse user-defined build funcs](https://github.com/tensorchord/envd/issues/91)。用户可以运行 `load(<custom-package>)` 来加载自定义函数。

## 长期目标 - 正在规划中！⏩

下列工作对于 MVP 来说不是必需的，但它们是我们长期计划的一部分。如果您有兴趣，请随意查看！

- **运行时**
    - 性能分析器：从 `envd` 环境中持续收集行级分析性能数据，帮助工程师找到训练代码中的瓶颈。
    - 支持与 OCI 规范兼容的运行时：[Support the OCI runtime spec-compatible runtime](https://github.com/tensorchord/envd/issues/282)。

 - **生态系统**
    - 集成其他开源工具。例如：[aim](https://github.com/aimhubio/aim)

持续更新中。
