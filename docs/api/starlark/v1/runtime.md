# runtime

Runtime functions

::: tip
Note that the documentation is automatically generated from [envd/api](https://github.com/tensorchord/envd/tree/main/envd/api) folder
in [tensorchord/envd](https://github.com/tensorchord/envd/tree/main/envd/api) repo.
Please update the python file there instead of directly editing file inside envd-docs repo.
:::

::: warning
Enable v1 by adding `# syntax=v1` to the 1st line of your envd file.

v1 is experimental and may change in the future. Make sure to freeze the envd version for online CI/CD.
:::

## command

```python
def command(commands: Dict[str, str])
```

Execute commands during runtime

**Arguments**:

- `commands` _Dict[str, str]_ - map name to command, similar to Makefile
  
  Example usage:
```python
runtime.command(commands={
    "train": "python train.py --epoch 20 --notify me@tensorchord.ai",
    "run": "python server.py --batch 1 --host 0.0.0.0 --port 8000",
})
```
  
  You can run `envd exec --command train` to train the model.

## expose

```python
def expose(envd_port: int, host_port: Optional[int], service: Optional[str],
           listen_addr: Optional[str])
```

Expose port to host
Proposal: https://github.com/tensorchord/envd/pull/780

**Arguments**:

- `envd_port` _int_ - port in `envd` container
- `host_port` _Optional[int]_ - port in the host, if not provided or
  `host_port=0`, `envd` will randomly choose a free port
- `service` _Optional[str]_ - service name
- `listen_addr` _Optional[str]_ - address to listen on

## daemon

```python
def daemon(commands: List[List[str]])
```

Run daemon processes in the container
Proposal: https://github.com/tensorchord/envd/pull/769

It's better to redirect the logs to local files for debugging purposes.

You can find the generated horust config files under `/etc/horust/services`
and log files under `/var/log/horust` in the container.

**Arguments**:

- `commands` _List[List[str]]_ - run multiple commands in the background
  
  Example usage:
```python
runtime.daemon(commands=[
    ["jupyter-lab", "--port", "8080"],
    ["python3", "serving.py", ">>serving.log", "2>&1"],
])
```

## environ

```python
def environ(env: Dict[str, str], extra_path: List[str])
```

Add runtime environments

**Arguments**:

- `env` _Dict[str, str]_ - environment name to value
- `extra_path` _List[str]_ - additional PATH
  
  Example usage:
```python
runtime.environ(env={"ENVD_MODE": "DEV"}, extra_path=["/usr/bin/go/bin"])
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

You can find the generated horust config files under `/etc/horust/services`
and log files under `/var/log/horust` in the container.

**Arguments**:

- `commands` _List[str]_ - list of commands

