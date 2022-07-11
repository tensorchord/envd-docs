---
sidebar_position: 4
---

# Multi-target build

envd supports building different container images from one single file, for different purpose. Typical scenario includes:
- Use cpu for model development, need gpu for large scale training jobs
- Use envd in daily development, but want to containerize dependency and publish it for model serving
- Use x86 platform before, but want to use ARM platform also


## Usage
Command `envd up -f {build_file}:{build_func}` can specify the build target, by running the `build_func` in `build_file`. 

For example, you can decalre multiple functions in one `envd` file, following python's syntax
```python title="build.envd"
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
    config.jupyter(password="", port=8888)
    
def build_gpu():
    build() # include all dependency decalred in build function
    install.cuda(version="11.6", cudnn="8")
```

Then, to start with cpu, any of commands below works the same way 
- `envd up`, this will run `build` function in `build.envd` file in 
current working directory
- `envd up -f :build`, explicitly specify `build` function
- `envd up -f build.envd`, explicitly specify `build.envd`
- `envd up -f build.envd:build`, explicitly specify both `build.envd` and `build` function

Simiarly, if you want to start with cuda support declared in `build_gpu` function, you can try
- `envd up -f :build_gpu`, explicitly specify `build_gpu` function
- `envd up -f build.envd:build_gpu`, explicitly specify both `build.envd` and `build_gpu` function

## Future
We're still working on support more scenarios, such as customized base images, multi architecuture support. Feel free to raise questions or feature requests at our [github discusss](https://github.com/tensorchord/envd/discussions)