# Set Up Experiment Tracking Stack

Experiment tracking can help you better understand your model performance during machine learning model training. `envd` already has built-in features to help you integrate with your favorite tools.

We will use TensorBoard as an example.

```python
def tensorboard(port):
    runtime.mount(host_path="/var/log/tensorboard", envd_path="/home/envd/logs")
    runtime.daemon(commands=[
        ["tensorboard", "--logdir", "/home/envd/logs", "--port", "8888", "--host", "0.0.0.0", ">>tensorboard.log", "2>&1"],
    ])
    runtime.expose(envd_port=port, host_port=port, service="tensorboard")


def build():
    base(dev=True)
    install.conda()
    install.python()
    install.python_packages(name=["tensorboard"])
    tensorboard(8888)
```

Make sure you have permission for the mounted directory.

This example includes `mount`, `daemon` and `expose`. For more details, can check `envd` [API reference](/api/starlark/v0/runtime).
