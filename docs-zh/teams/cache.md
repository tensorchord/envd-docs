# 远程缓存

你可以使用远程缓存来加速构建过程。`envd` 构建缓存[^1]可以被上传到镜像仓库、目的目录或其他地方。目前支持以下五种：

- `registry`: 分别推送镜像和缓存到镜像仓库。
- `inline`: 把缓存内嵌到镜像中，然后一起推送到镜像仓库。
- `local`: 从本地路径导入/导出
- `gha`（试验中 🧪）：从 GitHub Actions cache 导入/导出
- `s3`（试验中 🧪）：从 S3 导入/导出

大多数情况下推荐使用 `registry`。

[^1]: 远程缓存特性依赖 [buildkit](https://github.com/moby/buildkit#export-cache)

## 如何使用

可以使用 `--export-cache` 和 `--import-cache` 参数来从缓存中导入和导出。

指定 `--export-cache` 的情况下，构建缓存会被导出到指定位置。同理，指定 `--import-cache` 的时候会从该位置导入缓存。

```bash
envd build ... \
  --output type=image,name=docker.io/username/image,push=true \
  --export-cache type=registry,ref=docker.io/username/cache-name \
  --import-cache type=registry,ref=docker.io/username/cache-name
```

你可以利用该机制大幅加速构建过程。

## 参考

### Registry（分别推送镜像和缓存）

```
envd build ... \
  --output type=image,name=docker.io/username/image,push=true \
  --export-cache type=registry,ref=docker.io/username/image \
  --import-cache type=registry,ref=docker.io/username/image
```

`--export-cache` 选项：

- `type=registry`
- `mode=<min|max>`: 指定导出缓存的模式（默认：`min`）
  - `min`: 仅导出最终镜像的 layers
  - `max`: 导出所有中间过程的 layers
- `ref=<ref>`: 指定要保存到的仓库位置，例如 `docker.io/user/image:tag`
- `oci-mediatypes=<true|false>`: 是否要在导出的 manifests 中使用 OCI mediatypes（从 BuildKit `v0.8` 开始默认为 `true`）
- `compression=<uncompressed|gzip|estargz|zstd>`: 选择对新创建和缓存 layer 使用的压缩方式，默认使用 gzip。如果要使用 estargz 或者 zstd，则需要同时指定 `oci-mediatypes=true`
- `compression-level=<value>`: 选择压缩粒度：gzip（1-9），estargz（0-9），zstd（0-22）
- `force-compression=true`: 强制压缩所有 layers

`--import-cache` 选项：

- `type=registry`
- `ref=<ref>`: 指定要导入的仓库位置，例如 `docker.io/user/image:tag`

### Inline（同时推送镜像和缓存）

```bash
envd build ... \
  --output type=image,name=docker.io/username/image,push=true \
  --export-cache type=inline \
  --import-cache type=registry,ref=docker.io/username/image
```

只有指定 `--import-cache type=registry,ref=...` 的情况下才会导入 inline 缓存。

Inline 缓存会把元信息内嵌到镜像配置中，镜像 layers 中的信息和不使用缓存的镜像别无二致。

### 本地目录

```bash
envd build ... --export-cache type=local,dest=path/to/output-dir
envd build ... --import-cache type=local,src=path/to/input-dir
```

目录的布局符合 OCI 镜像标准 v1.0。

`--export-cache` 选项：

- `type=local`
- `mode=<min|max>`: 指定导出模式（默认为 `min`）
  - `min`: 仅导出最终镜像的 layers
  - `max`: 导出所有中间过程的 layers
- `dest=<path>`: 导出缓存的目标路径
- `oci-mediatypes=<true|false>`: 是否要在导出的 manifests 中使用 OCI mediatypes（从 BuildKit `v0.8` 开始默认为 `true`）
- `compression=<uncompressed|gzip|estargz|zstd>`: 选择对新创建和缓存 layer 使用的压缩方式，默认使用 gzip。如果要使用 estargz 或者 zstd，则需要同时指定 `oci-mediatypes=true`
- `compression-level=<value>`: 选择压缩粒度：gzip（1-9），estargz（0-9），zstd（0-22）
- `force-compression=true`: 强制压缩所有 layers

`--import-cache` 选项：

- `type=local`
- `src=<path>`: 导入缓存的来源路径
- `digest=sha256:<sha256digest>`: 显式指定要导入的 manifest digest 列表
- `tag=<tag>`: 指定镜像的自定义 tag。`index.json` 中默认的"latest"  tag 是 digest，不是 tag

### GitHub Actions cache（试验中）

```bash
envd build ... \
  --output type=image,name=docker.io/username/image,push=true \
  --export-cache type=gha \
  --import-cache type=gha
```

GitHub Actions cache 会把缓存元信息和 layers 保存到 GitHub 的 Cache 服务中。目前单个仓库有 [10GB 的大小限制](https://docs.github.com/en/actions/advanced-guides/caching-dependencies-to-speed-up-workflows#usage-limits-and-eviction-policy)。当超出此限制的时候，GitHub 会保存最新的缓存，同时驱逐旧缓存直到总体大小低于 10GB。如果回收缓存发生得过于频繁，则会拖慢 CI 的整体速度。

类似 [actions/cache](https://github.com/actions/cache)，缓存是 [按照分支区分](https://docs.github.com/cn/actions/using-workflows/caching-dependencies-to-speed-up-workflows#%E8%AE%BF%E9%97%AE%E7%BC%93%E5%AD%98%E7%9A%84%E9%99%90%E5%88%B6) 的，且默认分支和基础分支是对所有分支开放的。

针对 [GitHub Actions Cache service API](https://github.com/tonistiigi/go-actions-cache/blob/master/api.md#authentication)，需要以下验证信息：

- `url`: Cache 服务 URL（默认 `$ACTIONS_CACHE_URL`）
- `token`: Access token（默认 `$ACTIONS_RUNTIME_TOKEN`）

`--export-cache` 选项:

- `type=gha`
- `mode=<min|max>`: 指定导出模式（默认为 `min`）
  - `min`: 仅导出最终镜像的 layers
  - `max`: 导出所有中间过程的 layers
- `scope=<scope>`: 选择所属的范围（默认为 `buildkit`）

`--import-cache` 选项:

- `type=gha`
- `scope=<scope>`: 选择所属的范围（默认为 `buildkit`）

### S3 cache（试验中）

```bash
envd build ... \
  --output type=image,name=docker.io/username/image,push=true \
  --export-cache type=s3,region=eu-west-1,bucket=my_bucket,name=my_image \
  --import-cache type=s3,region=eu-west-1,bucket=my_bucket,name=my_image
```

需要提供以下参数：

- `bucket`: AWS S3 bucket（默认 `$AWS_BUCKET`）
- `region`: AWS region（默认 `$AWS_REGION`）

保存位置：

- blobs: `s3://<bucket>/<prefix><blobs_prefix>/<sha256>`，默认：`s3://<bucket>/blobs/<sha256>`
- manifests: `s3://<bucket>/<prefix><manifests_prefix>/<name>`，默认：`s3://<bucket>/manifests/<name>`

S3 配置：

- `blobs_prefix`: S3 上存储/读取 blobs 的全局前缀（默认：`blobs/`）
- `manifests_prefix`: S3 上存储/读取 manifests 的全局前缀（默认：`manifests/`）
- `endpoint_url`: 指定一个 S3 端点（默认：空）
- `use_path_style`: 如果为 `true`，就在 URL 中设置 bucket 名称，否则放到 hostname 中（默认：`false`）

AWS 验证：

最简单的方式是使用 IAM 实例配置文件。

其他配置：

- 任何 [AWS Go SDK](https://docs.aws.amazon.com/sdk-for-go/v1/developer-guide/configuring-sdk.html) 支持的环境变量或配置文件。配置必须是可以被 buildkit 守护进程访问到的，而不是客户端可访问的。
- 对于 Access Key ID 和 Secret Access Key，使用 `access_key_id` 和 `secret_access_key`。

`--export-cache` 配置：

- `type=s3`
- `mode=<min|max>`: 指定导出模式（默认为 `min`）
  - `min`: 仅导出最终镜像的 layers
  - `max`: 导出所有中间过程的 layers
- `prefix=<prefix>`: S3 上存储/读取文件的全局前缀（默认：空）
- `name=<manifest>`: 所使用的 manifest 的名称（默认 `buildkit`）
  - 可以同时设置多个 manifest 名称，并用 `;` 分隔。标准用法是使用 Git SHA1 作为名称，并使用分支名称作为备选，并通过 2 个 `import-cache` 命令加载他们。

`--import-cache` 配置：

- `type=s3`
- `prefix=<prefix>`: S3 上存储/读取文件的全局前缀（默认：空）
- `blobs_prefix=<prefix>`: S3 上存储/读取 blobs 的全局前缀（默认：`blobs/`）
- `manifests_prefix=<prefix>`: S3 上存储/读取 manifests 的全局前缀（默认：`manifests/`）
- `name=<manifest>`: 所使用的 manifest 的名称（默认 `buildkit`）
