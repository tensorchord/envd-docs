# 设置实验监控

实验监控（tracking experiments）可以帮助你了解模型训练期间的性能。envd 提供 API 帮助集成你喜欢的工具。

以集成 [TensorBoard](https://www.tensorflow.org/tensorboard?hl=zh-cn) 为例：

<custom-title title="设置 TensorBoard">

```python
def tensorboard(port):
    runtime.mount(host_path="/var/log/tensorboard", envd_path="/home/envd/logs")
    runtime.daemon(commands=[
        ["tensorboard", "--logdir", "/home/envd/logs", "--port", "8888", "--host", "0.0.0.0", ">>tensorboard.log", "2>&1"],
    ])
    runtime.expose(envd_port=port, host_port=port, service="tensorboard")


def build():
    base(os="ubuntu20.04", language="python")
    install.python_packages(name=["tensorboard"])
    tensorboard(8888)
```
</custom-title>

:::tip 提示
请确保你拥有挂载目录的权限。
:::

这个示例包括 mount、daemon 和 expose 操作，更多功能请参考 envd [API reference](/api/starlark/runtime)。
