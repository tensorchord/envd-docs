# 创建一个 Julia 环境

这份指南包含如何通过 `envd` 配置 Julia 环境。如果你还没有用过 `envd`，请先阅读我们的 [教程](/guide/getting-started) 和 [搭建配置指南](/guide/build-envd)。

## 指定 Julia

首先，你可以通过 `base` 函数来指定使用 Julia 语言。

<custom-title title="build.envd">

```python 
def build():
    base(os="ubuntu20.04", language="julia")
```

</custom-title>

## Julia 包

你可以使用 `install.julia_packages` 函数来安装 Julia 包。下面的例子安装了 `Example` 包。

<custom-title title="build.envd">

```python 
def build():
    base(os="ubuntu20.04", language="julia")
    install.julia_packages(name = [
        "Example",
    ])
```
</custom-title>

## 配置 Julia 包服务

默认情况下，会通过 Julia 包服务 `"pkg.julialang.org"` 来下载安装 Julia 包。不过，你也可以使用 `config.julia_pkg_server()` 来指定任何其他服务，比如下面这个例子：

<custom-title title="build.envd">

```python 
def build():
    base(os="ubuntu20.04", language="julia")
    config.julia_pkg_server(url="https://mirrors.tuna.tsinghua.edu.cn/julia")
    install.julia_packages(name = [
        "Example",
    ])
```

</custom-title>

## 指定 shell 程序

你可以通过 `shell` 函数来指定环境中使用的 `shell` 程序。下面的例子里使用了 `zsh` ：

<custom-title title="build.envd">

```python 
def build():
    base(os="ubuntu20.04", language="julia")
    shell("zsh")
```

</custom-title>

## 指定 VSCode 插件

你可以使用 `install.vscode_extensions` 函数来指定 VSCode 插件。下面的例子安装了 [`julialang.language-julia`](https://open-vsx.org/extension/julialang/language-julia)[^1]：


<custom-title title="build.envd">

```python 
def build():
    base(os="ubuntu20.04", language="julia")
    install.vscode_extensions(["julialang.language-julia"])
```

</custom-title>

[^1]: 因为[许可证问题](https://github.com/tensorchord/envd/issues/160)，这里用 [open-vsx](https://open-vsx.org/) 替代了 Microsoft VSCode Marketplace。
