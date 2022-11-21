# `envd` 的设计与实现

此章节描述了 `envd` 的设计思路，`envd` 的名字灵感来自于 systemd。 [^1]

[^1]: [GitHub 上我们关于该名字的讨论](https://github.com/tensorchord/envd/issues/2#issuecomment-1119175904).

## 核心设计

`envd` 的核心抽象是 **环境** 和 **镜像**。镜像由 `build.envd` 构建，并且遵循 [docker 镜像规范 v1.2](https://github.com/moby/moby/blob/master/image/spec/v1.2.md)。因此，您可以将 `envd` 构建的镜像使用 Docker 来运行。

环境是由 docker、Kubernetes 或其他一些与 OCI([Open Container Initiative](https://github.com/opencontainers/runtime-spec)) 规范兼容的运行时（如 runc、crun、containerd）运行的容器。

### 实现模型

`build.envd` 是用 [Starlark](https://github.com/bazelbuild/starlark), 编写的，这是 Python 3 的一种简化方言。build() 函数将在启动时调用。

<custom-title title="build.envd">

```python
# 默认调用 `build` 函数。
def build():
    # 在这里编写 envd 命令。
```

</custom-title>

`install.python_packages` 和 `config.jupyter` 等函数用于注册信息。这些信息将被保存在内存的静态图中。`envd` 使用静态图在执行的 `envd` 建立环境。

`envd` 使用 starlark 解释器加载 `build()` 函数，因此您可以在 `build.envd` 中使用 loops、if/else 或其他语句。

<custom-title title="build.envd">

```python
# 默认调用 `build` 函数。
def build():
    version = "2.9.1"
    dev_env(version, "zsh")

# 创建新的函数，并在 `build.envd` 中调用。
def dev_env(version, custom_shell):
    install.python_packages(name=[
        "tensorflow=="+version,
        "tensorboard"
    ])
    config.jupyter()
    # 指定 zsh shell 并配置它
    if custom_shell == "zsh":
      shell("zsh")
```

</custom-title>
