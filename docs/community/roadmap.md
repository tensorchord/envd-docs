# `envd` Roadmap

Want to jump in? Welcome discussions and contributions! 

- Chat with us on [💬 Discord](https://discord.gg/KqswhpVgdU)
- Have a look at [`good first issue 💖`](https://github.com/tensorchord/envd/issues?q=is%3Aissue+is%3Aopen+label%3A%22good+first+issue+%E2%9D%A4%EF%B8%8F%22) issues!
- More on [contributing page](./contributing.md)

## Short term - what we're working on now 🎉

We are working on these features!

- **Runtime**
    - [Support data management in the environment](https://github.com/tensorchord/envd/issues/5)
    - [Support both Kubernetes and Docker runtimes](https://github.com/tensorchord/envd/issues/179). Data science or AI/ML teams usually do not only develop on their laptops. They need GPU clusters to run the large scale training jobs. `envd` supports both Kubernetes and Docker runtimes. Thus users can move to cloud without any code change.
- **Ecosystem**
    - Integrate with other open source development tools e.g. [Flyte](https://flyte.org).
    - Provide web-based UI

## Medium term - what we're working on next! 🏃

- **Language**
    - [Support oh-my-zsh plugins configuration](https://github.com/tensorchord/envd/issues/106)
    - [Implement our own language server](https://github.com/tensorchord/envd-lsp)
- **Runtime**
    - [Support buildkitd moby worker in dockerd 22.06-beta](https://github.com/tensorchord/envd/issues/51). It is a huge enhancement which accelerates the build process. We use moby worker in docker 22.06, and fallback to docker worker in docker 20.10.
    - [Add agent to collect metrics in the container (or in the host)](https://github.com/tensorchord/envd/issues/218). We need to collect and show the metrics of GPUs/CPUs to users, maybe via a web-based UI.
- **Ecosystem**
    - [Design the extension mechanism to reuse user-defined build funcs](https://github.com/tensorchord/envd/issues/91). Users can run `load(<custom-package>)` to load and use their own build functions.
    - [Contribute the vscode-envd extension](https://github.com/tensorchord/vscode-envd)

## Longer term items - working on this soon! ⏩

These items are not essential for an MVP, but are a part of our longer term plans. Feel free to jump in on these if you're interested!

- **Language**
    - Support more languages. See [feat: Support environments with multiple languages](https://github.com/tensorchord/envd/issues/407), [feat: Support Julia language](https://github.com/tensorchord/envd/issues/408)
- **Runtime**
    - Continuous profiler that continuously collects line-level profiling performance data from `envd` environments, helps engineers find bottlenecks in the training code.
    - [Support the OCI runtime spec-compatible runtime](https://github.com/tensorchord/envd/issues/282)

To be added in the future.
