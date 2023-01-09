# 用户配置

对于有些配置项，你会想为每个项目都配置上。比如 git 的配置，或者软件镜像配置。

你可以通过创建一个 `config.envd` 文件来达到这个目的：

<custom-title title="config.envd">


```python 
config.pip_index(url = "https://pypi.tuna.tsinghua.edu.cn/simple")
git_config(name="My Name", email="my@email.com", editor="vim")
```
</custom-title>

这个文件应该被放置在 [XDG](https://specifications.freedesktop.org/basedir-spec/basedir-spec-latest.html) 配置路径中：

- Linux & macOS: `~/.config/envd/config.envd`

当你运行 `envd build` 或 `envd up` 时，该文件会被自动加载。所以，你可以在 `config.envd` 放置你的配置来为所有你的项目启用它们。
