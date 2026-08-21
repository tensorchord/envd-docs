# notebook

## jupyter\_lab

```python
def jupyter_lab(envd_port=8888, host_port=0, token="''")
```

Configure Jupyter Lab.

**Arguments**:

- `envd_port` _Optional[int]_ - port used by envd container (default=8888)
- `host_port` _Optional[int]_ - port used by host, if not specified or equals to 0,
  envd will randomly choose a free port
- `token` _Optional[str]_ - access token

## jupyter\_notebook

```python
def jupyter_notebook(envd_port=8888, host_port=0, token="''")
```

Configure Jupyter Notebook.

**Arguments**:

- `envd_port` _Optional[int]_ - port used by envd container (default=8888)
- `host_port` _Optional[int]_ - port used by host, if not specified or equals to 0,
  envd will randomly choose a free port
- `token` _Optional[str]_ - access token

