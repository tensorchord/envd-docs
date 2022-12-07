
## open\_mmlab

```python
def open_mmlab(packages)
```

Install packages from OpenMMLab

**Arguments**:

- `packages` _List[str]_ - package name


## golang

```python
def golang(version="1.18.8")
```

Install Golang.

**Arguments**:

- `version` _Optional[str]_ - golang version


## mirror

```python
def mirror(pip="tuna", conda="tuna", apt="tuna")
```

Set Pypi/Anaconda/Apt mirror repository for installation.

**Arguments**:

- `pip` _Optional[str]_ - alias for pypi source
- `conda` _Optional[str]_ - alias for anaconda source
- `apt` _Optional[str]_ - alias for apt source
  
  See:
  alias from `PYPI_URL` / `CONDA_URL` / `APT_URL` at
  https://github.com/tensorchord/envdlib/blob/main/src/mirror.envd

## mirror\_pip

```python
def mirror_pip(source="tuna")
```

Set Pypi mirror repository for installation.

**Arguments**:

- `source` _Optional[str]_ - alias for pypi source
  
  See:
  alias from `PYPI_URL` at
  https://github.com/tensorchord/envdlib/blob/main/src/mirror.envd

## mirror\_conda

```python
def mirror_conda(source="tuna")
```

Set Anaconda mirror repository for installation.

**Arguments**:

- `source` _Optional[str]_ - alias for anaconda source
  
  See:
  alias from `CONDA_URL` at
  https://github.com/tensorchord/envdlib/blob/main/src/mirror.envd

## mirror\_apt

```python
def mirror_apt(source="tuna", include_alpha=False)
```

Set Apt mirror repository for installation.

**Arguments**:

- `source` _Optional[str]_ - alias for apt source
- `include_alpha` _Optional[bool]_ - whether include alpha source `xxx-proposed`
  
  See:
  alias from `APT_URL` at
  https://github.com/tensorchord/envdlib/blob/main/src/mirror.envd


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


## tensorrt

```python
def tensorrt(os="20.04", cuda="11.6.2", trt="8.4.3.1")
```

Install tensorrt.

**Arguments**:

- `os` _Optional[str]_ - os version
- `cuda` _Optional[str]_ - cuda version
- `trt` _Optional[str]_ - tensorrt version

