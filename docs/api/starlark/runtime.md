# runtime

Runtime functions

::: tip
Note that the documentation is automatically generated from [envd/api](https://github.com/tensorchord/envd/tree/main/envd/api) folder
in [tensorchord/envd](https://github.com/tensorchord/envd/tree/main/envd/api) repo.
Please update the python file there instead of directly editing file inside envd-docs repo.
:::

## command

```python
def command(commands: Dict[str, str])
```

Execute commands

**Arguments**:

- `commands` _Dict[str, str]_ - map name to command, similar to Makefile

## expose

```python
def expose(envd_port: str, host_port: Optional[str], service: Optional[str])
```

Expose port to host
Proposal: https://github.com/tensorchord/envd/pull/780

**Arguments**:

- `envd_port` _str_ - port in `envd` container
- `host_port` _Optional[str]_ - port in the host, if not provided, `envd` will
  randomly choose a free port
- `service` _Optional[str]_ - service name

## daemon

```python
def daemon(commands: List[List[str]])
```

Run daemon processes in the container
Proposal: https://github.com/tensorchord/envd/pull/769

It's better to redirect the logs to local files for debug purposes.

**Arguments**:

- `commands` _List[List[str]]_ - run multiple commands in the background
  
  Example usage:
```
runtime.daemon([
    ["jupyter-lab", "--port", "8080"],
    ["python3", "serving.py", ">>serving.log", "2>&1"],
])
```

