---
sidebar_label: global functions
title: global functions
---

Global functions

#### base

```python
def base(os: str, language: str)
```

Set base image

**Arguments**:

- `os` _str_ - The operating system(i.e. `ubuntu20.04`)
- `language` _str_ - The programing language dependency(i.e. `python3.8`)

#### shell

```python
def shell(name: str)
```

Interactive shell

**Arguments**:

- `name` _str_ - shell name(i.e. `zsh`)

#### run

```python
def run(commands: str)
```

Execute command

**Arguments**:

- `commands` _str_ - command to run

#### git\_config

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

