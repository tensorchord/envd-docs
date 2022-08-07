# `envd` vs. Other tools

## What is `envd`?

`envd` is a tool to build portable environment for machine learning and data science scenarios, with Python-like syntax. 


## `envd` Benefits
Benefits of using `envd` include:
- Clear dev environment setup and management for each project. No longer need to worry about the conflict of CUDA, system package, virtualenv, and so on. Each project will have its own dev environment. And you can easily use the environment on any machines, and share it with your collaborators. 
- Unify dev and production environments by `envd`'s multi-target supports.
- Integrate with container ecosystem. `envd` can be used in any container, such as Docker, Kubernetes, and so on.
- Dataset support. `envd` can be used to download and preprocess datasets.

## How does it work?
- Parallize the image build process. Powered by buildkit, `envd` can parallize different tools installation to minimize the build time.
- Cache support for common installation tools, such as pip, conda, apt, and so on. In normal dockerfile build, each layer depends on the previous layer. Any change happens before will trigger the re-build for all the later stages, which increases the build time a lot. `envd` had builtin cache support for most common-used tools and reduce the dependency between them, which minimize the time to wait when you make modifications to your environment. 
- Python-like language syntax. `envd` use a python dialects called starlark as the language, and provide a set of builtin functions to simplify your burden. Declare what you want, and `envd` will take care of the rest, including user permission, ssh server, entrypoint setup, and etc..


## `envd` vs. conda
`envd` doesn't conflict with conda. You can also use conda inside `envd` by `install.conda_packages`
- `envd` environment is built from the pure official image, there will be no legacy installation artifacts. Only those you declare in the file will appear in the environment. conda's environment isolation functionality depends on environment variable and rewrite library's rpath. User might meet conflict between system package and conda package (such as CUDA). In corner cases, it might results in unexpected behaviors.
- `envd` can export container used for production or pipeline stages, which narrow down the gap between development and production. You can build multiple environments for different purposes(research, development, serving, data processing, etc.) from the same file.
<!-- We can add data related section once finished -->


## `envd` vs. docker
`envd` is build on top of the docker ecosystem, and fully compatible with docker.
- `envd` parallize the image build process, which accelerates the build process. 
- docker uses dockerfile as the major language. `envd` uses starlark as the language, which is more familiar to the data science workers.
- `envd` supports multi-target build from single file, while docker usually need to write multiple files, which makes reuse of the building block difficult.