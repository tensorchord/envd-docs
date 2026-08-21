# 多目标构建

有时你需要为开发、服务或其他目的构建不同的镜像。本章展示了`envd build`如何支持多目标构建。


一个 `build.envd` 可以有多个构建目标。 `build.envd` 默认的构建目标是 `build`：

```py
def build():
    # ...
```

## 创建一个新的构建目标

新的构建目标可以被定义为 `build.envd` 中的函数：

```py
def build():
    # ...
def serve():
    # ...
```

## 例子

`envd build -f :<target>` 执行对指定目标的构建。下面是一个[例子](https://github.com/tensorchord/envd/tree/main/examples/streamlit-mnist)。

```py
def build():
    base(dev=True)
    install.conda()
    install.python()
    install.vscode_extensions([
        "ms-python.python",
    ])

    configure_mnist()
    # Configure jupyter notebooks.
    config.jupyter()
    # Configure zsh.
    shell("zsh")

def serve():
    base(dev=False)
    install.conda()
    install.python()
    configure_streamlit(8501)
    configure_mnist()

def configure_streamlit(port):
    install.python_packages([
        "streamlit",
        "streamlit_drawable_canvas",
    ])
    runtime.expose(envd_port=port, host_port=port, service="streamlit")
    runtime.daemon(commands=[
        ["streamlit", "run", "~/streamlit-mnist/app.py"]
    ])

def configure_mnist():
    # config.pip_index(url = "https://pypi.tuna.tsinghua.edu.cn/simple")
    install.apt_packages([
        "libgl1",
    ])
    install.python_packages([
        "tensorflow",
        "numpy",
        "opencv-python",
        "matplotlib",
    ])
```

这个演示包含两个部分：使用 mnist 数据集训练一个简单的数字识别模型和一个实时演示该模型的 web 应用程序。


<p align="center">

![](./assets/demo.gif){ style="display: block; margin: 0 auto" }

</p>

运行该例子的步骤在此显示。

1. 首先创建开发环境。

   ```
   envd up
   ```

2. 训练模型

    手动运行 [train.ipynb](https://github.com/tensorchord/envd/blob/main/examples/streamlit-mnist/train.ipynb) 的所有单元。

3. 运行示例 web 应用程序。

   ```
   envd up -f :serve
   ```
