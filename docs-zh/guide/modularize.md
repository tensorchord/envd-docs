# 模块化你的构建函数

`envd` 允许你轻松创建可复用的组件，这样可以更有调理地组织构建文件。

## 定义你自己的包

`envd` 支持绝大部分 Python 语法，包括字符串格式化，for 循环，if 语句，函数定义等。


比如，你可以像这样为 tensorflow 包定义一个函数：
```python
def tensorflow(version):
    if version.startswith("1"):
        # execute command to install tf1.x
        run(["pip install tensorflow-gpu=={}".format(version)])
    else:
        # execute command to install tf2.x
        run(["pip install tensorflow=={}".format(version)]) 
```
语言规范的完整列表可以在这个位置找到 https://github.com/google/starlark-go/blob/master/doc/spec.md.

::: tip
更多例子请参见这里 https://github.com/tensorchord/envdlib/tree/main/src.
:::

## 通过 envdlib 使用预定义包

`envd` 提供了一组预定义库，这些苦通常被用于机器学习任务。你可以在 https://github.com/tensorchord/envdlib 找到它们。

如果你需要使用，只需要在你的 envd 文件中添加一行：
```python
# import envdlib packages
envdlib = include("https://github.com/tensorchord/envdlib")

# use it in your build function
def build():
    base(os="ubuntu20.04", language="python")
    envdlib.tensorboard(host_port=8888)
```

现在你可以访问 tensorboard 了，就在你的 8888 端口。

:::tip
你还可以创建你自己的包，比如针对内部的或者像 [envdlib](https://github.com/tensorchord/envdlib) 特定于领域的工具，然后与其他人分享。
:::

## 给 envdlib 做贡献

We're extending our package coverage of envdlib. Please don't hesitate to file a pull request or raise an issue if you have any need. Your contribution is welcomed.
我们正在扩展 `envdlib`  包的覆盖范围。如果你有任何需要，请毫不犹豫地提出 PR 或 issue。欢迎你的贡献。
