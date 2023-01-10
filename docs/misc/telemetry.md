# Telemetry

By default, `envd` collects and sends anonymized data to [segment.com](https://segment.com/) which we use for measuring performance of the command.

We put great effort in making sure we only collect completely anonymized data.

## Examples of events we collect

Below you can find examples of events we currently collect.

### Identify

Sent the first time a `envd` command is run on a machine.

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

Sent every time a `envd up` or `envd build` is run.

```json
{
  "event": "up",
  "properties": {
    "runner": "docker"
  },
  "userId": "f644bf08-fd56-42f7-aca8-85c4c37b47c9",

}
```

## Disable telemetry

If you would like to disable the data collection, please run:

```base
export ENVD_ANALYTICS=false
```
