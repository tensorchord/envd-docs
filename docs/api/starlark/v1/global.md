# \_\_init\_\_

__v1 syntax__


::: tip
Note that the documentation is automatically generated from [envd/api](https://github.com/tensorchord/envd/tree/main/envd/api) folder
in [tensorchord/envd](https://github.com/tensorchord/envd/tree/main/envd/api) repo.
Please update the python file there instead of directly editing file inside envd-docs repo.
:::

::: warning
Enable v1 by adding `# syntax=v1` to the 1st line of your envd file.

v1 is experimental and may change in the future. Make sure to freeze the envd version for online CI/CD.
:::

## base

```python
def base(image: str = "ubuntu:20.04", dev: bool = False)
```

Set up the base env.

**Arguments**:

- `image` _str_ - docker image, can be any Debian-based image
- `dev` _bool_ - enabling the dev env will add lots of development related libraries like
  envd-sshd, vim, git, shell prompt, vscode extensions, etc.

## shell

```python
def shell(name: str = "bash")
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

Setup git config.

**Arguments**:

- `name` _str_ - User name
- `email` _str_ - User email
- `editor` _str_ - Editor for git operations
  
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
    base(os="ubuntu20.04", language="python")
    envd.tensorboard(host_port=8000)
```

