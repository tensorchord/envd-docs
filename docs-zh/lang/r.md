# 创建一个 R 环境

这份指南包含如何通过 `envd` 配置 R 环境。如果你还没有用过 `envd`，请先阅读我们的 [教程](/guide/getting-started) 和 [搭建配置指南](/guide/build-envd)。

## 指定 R

首先，你可以通过 `base` 函数来指定使用 R 语言。

<custom-title title="build.envd">

```python 
def build():
    base(dev=True)
    install.r_lang()
```

</custom-title>

## R 包

你可以使用 `install.r_packages` 函数来安装 R 包。下面的例子安装了 `remotes` 和 `rlang` 包。

<custom-title title="build.envd">

```python 
def build():
    base(dev=True)
    install.r_lang()
    install.r_packages([
            "remotes",
            "rlang",
        ])
```
</custom-title>

## 配置 CRAN 镜像

默认情况下，会通过 RStudio CRAN 镜像 `"https://cran.rstudio.com"` 来下载安装 R 包。不过，你也可以使用 `config.cran_mirror()` 来指定任何其他的镜像站，比如下面这个例子：

<custom-title title="build.envd">

```python 
def build():
    base(dev=True)
    install.r_lang()
    config.cran_mirror(url="https://cloud.r-project.org/")
    install.r_packages([
            "remotes",
            "rlang",
        ])
```
</custom-title>

## 指定 shell 程序

你可以通过 `shell` 函数来指定环境中使用的 `shell` 程序。下面的例子里使用了 `zsh` ：

<custom-title title="build.envd">

```python 
def build():
    base(dev=True)
    install.r_lang()
    shell("zsh")
```

</custom-title>

## 指定 VSCode 插件

你可以使用 `install.vscode_extensions` 函数来指定 VSCode 插件。下面的例子安装了 [`REditorSupport.r-lsp`](https://open-vsx.org/extension/REditorSupport/r-lsp)[^1]：

<custom-title title="build.envd">

```python 
def build():
    base(dev=True)
    install.r_lang()
    install.vscode_extensions(["REditorSupport.r-lsp"])
```
</custom-title>

[^1]: 因为[许可证问题](https://github.com/tensorchord/envd/issues/160)，这里用 [open-vsx](https://open-vsx.org/) 替代了 Microsoft VSCode Marketplace。

## 设定 RStudio server

你可以使用 `config.rstudio_server` 来设定 [RStudio server](https://www.rstudio.com/products/rstudio/download-server/)。

<custom-title title="build.envd">

```python
def build():
    ...
    config.rstudio_server()
```

</custom-title>

可以使用 `envd envs list` 命令来获得 Endpoint。

```
$ envd envs list
NAME    ENDPOINT                        SSH TARGET      IMAGE           GPU     CUDA    CUDNN   STATUS          CONTAINER ID 
r-basic rstudio: http://localhost:34621 r-basic.envd    r-basic:dev     false   <none>  <none>  Up 6 hours      1eb7d40e5a8a
```

然后你可以在你的浏览器里打开 `http://localhost:34621` 来连接到 RStudio server。用户名是 `envd` ，密码则可以是任何字符串。

![](./assets/rstudio.png)

![](./assets/rstudio-main.png)
