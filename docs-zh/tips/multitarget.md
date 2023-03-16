# Multi-target Build

`envd` supports building different container images from one single file, for different purpose. Typical scenario includes:

- Use CPU for model development, need GPU for large scale training jobs
- Use `envd` in daily development, but want to containerize dependency and publish it for model serving
- Require both X86 and ARM platforms.

## Usage

Command `envd up -f {build_file}:{build_func}` can specify the build target, by running the `build_func` in `build_file`.

For example, you can declare multiple functions in one `envd` file, following python's syntax

<custom-title title=" build.envd">

```python
def build():
    base(os="ubuntu20.04", language="python3")
    install.vscode_extensions([
        "ms-python.python",
    ])

    install.python_packages([
        "tensorflow",
        "numpy",
    ])
    shell("zsh")
    config.jupyter(token="", port=8888)

def build_gpu():
    build() # include all dependency declared in build function
    install.cuda(version="11.2.2", cudnn="8")
```

</custom-title>

Then, to start with cpu, any of commands below works the same way

- `envd up`, this will run `build` function in `build.envd` file in
  current working directory
- `envd up -f :build`, explicitly specify `build` function
- `envd up -f build.envd`, explicitly specify `build.envd`
- `envd up -f build.envd:build`, explicitly specify both `build.envd` and `build` function

Simiarly, if you want to start with cuda support declared in `build_gpu` function, you can try

- `envd up -f :build_gpu`, explicitly specify `build_gpu` function
- `envd up -f build.envd:build_gpu`, explicitly specify both `build.envd` and `build_gpu` function
