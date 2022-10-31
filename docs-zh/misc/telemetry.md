# Telemetry

在默认情况下，`envd` 会收集部分匿名信息，并发送到 [segment.com]，这些信息会被我们用来观测 `envd` 命令的性能问题。

我们尽最大努力来保证我们只收集必要的完全匿名的信息。

## `envd` 收集的信息示例

### Identify

`Identify` 类型的信息是在 envd 安装到一台机器后会发送一次的信息。其中包括 OS 的信息，以及一个完全匿名的 UUID。

```json
{
  "context": {
    "app": {
      "name": "envd-cli",
      "version": "v0.2.4-alpha.17+3cba45e"
    },
    "os": {
      "name": "linux",
      "version": "amd64"
    }
  },
  "timestamp": "2022-10-31T02:42:20.046Z",
  "type": "identify",
  "userId": "f644bf08-fd56-42f7-aca8-85c4c37b47c9",
}
```

### Track

`Track` 类型的信息是在 envd 执行 `envd build` 或者 `envd up` 时发送的信息。其中只包含 UUID 和运行时。目前运行时 `runner` 仅为 `docker`。

```json
{
  "event": "up",
  "properties": {
    "runner": "docker"
  },
  "userId": "f644bf08-fd56-42f7-aca8-85c4c37b47c9",

}
```

## 关闭 Telemetry

你可以通过下面的命令关闭 `envd` 的指标收集：

```
export ENVD_ANALYTICS=false
```
