# monitoring

## tensorboard

```python
def tensorboard(envd_port=6006,
                envd_dir="/home/envd/logs",
                host_port=0,
                host_dir="/tmp")
```

Configure TensorBoard.

Make sure you have permission for `host_dir`

**Arguments**:

- `envd_port` _Optional[int]_ - port used by envd container
- `envd_dir` _Optional[str]_ - log storage mount path in the envd container
- `host_port` _Optional[int]_ - port used by the host, if not specified or equals to 0,
  envd will randomly choose a free port
- `host_dir` _Optional[str]_ - log storage mount path in the host

