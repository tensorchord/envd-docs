# \_\_init\_\_

Global functions

::: tip
Note that the documentation is automatically generated from [envd/api](https://github.com/tensorchord/envd/tree/main/envd/api) folder
in [tensorchord/envd](https://github.com/tensorchord/envd/tree/main/envd/api) repo.
Please update the python file there instead of directly editing file inside envd-docs repo.
:::

::: warning
v0 syntax is no longer supported from `envd>=v1.0`. Check the [upgrade guide](https://envd.tensorchord.ai/guide/v1.html).

If you want to use v0 syntax, try `pip install 'envd<1'`.
:::

## base

```python
def base(os: str, language: str, image: Optional[str])
```

Set base image

**Arguments**:

- `os` _str_ - The operating system (i.e. `ubuntu22.04`)
- `language` _str_ - The programming language dependency (i.e. `python3.8`)
- `image` _Optional[str]_ - Custom image (i.e. `python:3.11-slim`)

## shell

```python
def shell(name: str)
```

Interactive shell

**Arguments**:

- `name` _str_ - shell name (i.e. `zsh`, `bash`)

## run

```python
def run(commands: List[str], mount_host: bool = False)
```

Execute command

**Arguments**:

- `commands` _List[str]_ - command to run during the building process
- `mount_host` _bool_ - mount the host directory. Default is False.
  Enabling this will disable the build cache for this operation.
  

**Example**:

```python
run(commands=["conda install -y -c conda-forge exa"])
```

## git\_config

```python
def git_config(name: Optional[str] = None,
               email: Optional[str] = None,
               editor: Optional[str] = None)
```

Setup git config

**Arguments**:

- `name` _optional, str_ - User name
- `email` _optional, str_ - User email
- `editor` _optional, str_ - Editor for git operations
  
  Example usage:
```python
git_config(name="My Name", email="my@email.com", editor="vim")
```

## include

```python
def include(git: str)
```

Import from another git repo

This will pull the git repo and execute all the `envd` files. The return value will be a module
contains all the variables/functions defined (except the ones with `_` prefix).

**Arguments**:

- `git` _str_ - git URL
  
  Example usage:
```python
envd = include("https://github.com/tensorchord/envdlib")

def build():
    base(os="ubuntu22.04", language="python")
    envd.tensorboard(8000)
```

