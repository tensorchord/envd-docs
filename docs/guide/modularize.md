# Modularize your build function

`envd` allows you to easily create reusable components, so that the building file can be more organized.

## Defining your own package

`envd` support most Python syntax, including string format, for-loop, if-statement, function definition. 

For example, you can define a function for tensorflow package like this
```python
def tensorflow(version):
    if version.startswith("1"):
        # execute command to install tf1.x
        run(["pip install tensorflow-gpu=={}".format(version)])
    else:
        # execute command to install tf2.x
        run(["pip install tensorflow=={}".format(version)]) 
```
The full list of language spec can be found at https://github.com/google/starlark-go/blob/master/doc/spec.md.

::: tip
More examples can be found at https://github.com/tensorchord/envdlib/tree/main/src.
:::

## Using predefined package by envdlib

envd provided a set of predefined libraries which are commonly used in machine learning tasks. You can find them at https://github.com/tensorchord/envdlib. 

To use it you just need one line in your envd file
```python
# import envdlib packages
envdlib = include("https://github.com/tensorchord/envdlib")

# use it in your build function
def build():
    base(os="ubuntu20.04", language="python")
    envdlib.tensorboard(host_port=8888)
```

And now you'll have tensorboard on your 8888 port.

:::tip
You can also build your own package such as for internal or domain-specific tools following [envdlib](https://github.com/tensorchord/envdlib) and share it with others.
:::

## Contribute to envdlib

We're extending our package coverage of envdlib. Please don't hesitate to file a pull request or raise an issue if you have any need. Your contribution is welcomed.
