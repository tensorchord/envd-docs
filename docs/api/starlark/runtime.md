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

Execute commands during runtime

**Arguments**:

- `commands` _Dict[str, str]_ - map name to command, similar to Makefile
  
  Example usage:
```
runtime.command(commands={
    "train": "python train.py --epoch 20 --notify me@tensorchord.ai",
    "run": "python server.py --batch 1 --host 0.0.0.0 --port 8000",
})
```
  
  You can run `envd run --command train` to train the model.

## expose

```python
def expose(envd_port: str, host_port: Optional[str], service: Optional[str])
```

Expose port to host
Proposal: https://github.com/tensorchord/envd/pull/780

**Arguments**:

- `envd_port` _str_ - port in `envd` container
- `host_port` _Optional[str]_ - port in the host, if not provided or
  `host_port=0`, `envd` will randomly choose a free port
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
runtime.daemon(commands=[
    ["jupyter-lab", "--port", "8080"],
    ["python3", "serving.py", ">>serving.log", "2>&1"],
])
```

## environ

```python
def environ(env: Dict[str, str])
```

Add runtime environments

**Arguments**:

- `env` _Dict[str, str]_ - environment name to value
  
  Example usage:
```
runtime.environ(env={"ENVD_MODE": "DEV"})
```

## mount

```python
def mount(host_path: str, envd_path: str)
```

Mount from host path to container path (runtime)

**Arguments**:

- `host_path` _str_ - source path in the host machine
- `envd_path` _str_ - destination path in the envd container

## init

```python
def init(commands: List[str])
```

Commands to be executed when start the container

**Arguments**:

- `commands` _List[str]_ - list of commands

