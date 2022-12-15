# mirror

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

