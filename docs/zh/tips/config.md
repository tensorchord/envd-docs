# Per-user Config

There are some configurations that you want to adopt for every project. For example, the git config and software mirror configurations.

You can create a `config.envd` file to achieve this:

<custom-title title="config.envd">


```python 
config.pip_index(url = "https://pypi.tuna.tsinghua.edu.cn/simple")
git_config(name="My Name", email="my@email.com", editor="vim")
```
</custom-title>

The file should be placed in the  [XDG](https://specifications.freedesktop.org/basedir-spec/basedir-spec-latest.html) config directory of the project:

- linux: `~/.config/envd/config.envd`
- macOS: `~/Library/Application Support/envd/config.envd`

It will be loaded automatically when you run `envd build` or `envd up`. Thus you can put your configurations in the `config.envd` file to enable them for all your projects.
