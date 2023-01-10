# Remote Cache

You can use remote cache to accelerate the build process. `envd` build cache[^1] can be uploaded to the image registry, local directories or other places. There are five types supported:

- `registry`: push the image and the cache separately to a image registry.
- `inline`: embed the cache into the image, and push them to the registry together
- `local`: export/import cache from a local directory
- `gha` (experimental 🧪): export/import cache from GitHub Actions cache
- `s3` (experimental 🧪): export/import cache from s3

`registry` is recommended in most cases.

[^1]: remote cache feature is built on top of [buildkit](https://github.com/moby/buildkit#export-cache)

## How to use?

The arguments `--export-cache` and `--import-cache` are used to export and import the cache. 

The build cache will be exported to the given location if `--export-cache` is specified. And the build cache will be imported from the given location if `--import-cache` is specified.

```bash
envd build ... \
  --output type=image,name=docker.io/username/image,push=true \
  --export-cache type=registry,ref=docker.io/username/cache-name \
  --import-cache type=registry,ref=docker.io/username/cache-name
```

You can use the mechanism to accelerate the build process dramatically.

## Reference

This feature is supported by [BuildKit](https://github.com/moby/buildkit#cache).

### Registry (push image and cache separately)

```bash
envd build ... \
  --output type=image,name=docker.io/username/image,push=true \
  --export-cache type=registry,ref=docker.io/username/image \
  --import-cache type=registry,ref=docker.io/username/image
```

`--export-cache` options:

- `type=registry`
- `mode=<min|max>`: specify cache layers to export (default: `min`)
  - `min`: only export layers for the resulting image
  - `max`: export all the layers of all intermediate steps
- `ref=<ref>`: specify repository reference to store cache, e.g. `docker.io/user/image:tag`
- `oci-mediatypes=<true|false>`: whether to use OCI mediatypes in exported manifests (default: `true`, since BuildKit `v0.8`)
- `compression=<uncompressed|gzip|estargz|zstd>`: choose compression type for layers newly created and cached, gzip is default value. estargz and zstd should be used with `oci-mediatypes=true`
- `compression-level=<value>`: choose compression level for gzip, estargz (0-9) and zstd (0-22)
- `force-compression=true`: forcibly apply `compression` option to all layers

`--import-cache` options:

- `type=registry`
- `ref=<ref>`: specify repository reference to retrieve cache from, e.g. `docker.io/user/image:tag`

### Inline (push image and cache together)

```bash
envd build ... \
  --output type=image,name=docker.io/username/image,push=true \
  --export-cache type=inline \
  --import-cache type=registry,ref=docker.io/username/image
```

Note that the inline cache is not imported unless `--import-cache type=registry,ref=...` is provided.

Inline cache embeds cache metadata into the image config. The layers in the image will be left untouched compared to the image with no cache information.

### Local directory

```bash
envd build ... --export-cache type=local,dest=path/to/output-dir
envd build ... --import-cache type=local,src=path/to/input-dir
```

The directory layout conforms to OCI Image Spec v1.0.

`--export-cache` options:

- `type=local`
- `mode=<min|max>`: specify cache layers to export (default: `min`)
  - `min`: only export layers for the resulting image
  - `max`: export all the layers of all intermediate steps
- `dest=<path>`: destination directory for cache exporter
- `oci-mediatypes=<true|false>`: whether to use OCI mediatypes in exported manifests (default `true`, since BuildKit `v0.8`)
- `compression=<uncompressed|gzip|estargz|zstd>`: choose compression type for layers newly created and cached, gzip is default value. estargz and zstd should be used with `oci-mediatypes=true`.
- `compression-level=<value>`: compression level for gzip, estargz (0-9) and zstd (0-22)
- `force-compression=true`: forcibly apply `compression` option to all layers

`--import-cache` options:

- `type=local`
- `src=<path>`: source directory for cache importer
- `digest=sha256:<sha256digest>`: specify explicit digest of the manifest list to import
- `tag=<tag>`: determine custom tag of image. Defaults "latest" tag digest in `index.json` is for digest, not for tag

### GitHub Actions cache (experimental)

```bash
envd build ... \
  --output type=image,name=docker.io/username/image,push=true \
  --export-cache type=gha \
  --import-cache type=gha
```

GitHub Actions cache saves both cache metadata and layers to GitHub's Cache service. This cache currently has a [size limit of 10GB](https://docs.github.com/en/actions/advanced-guides/caching-dependencies-to-speed-up-workflows#usage-limits-and-eviction-policy) that is shared across different caches in the repo. If you exceed this limit, GitHub will save your cache but will begin evicting caches until the total size is less than 10 GB. Recycling caches too often can result in slower runtimes overall.

Similarly to using [actions/cache](https://github.com/actions/cache), caches are [scoped by branch](https://docs.github.com/en/actions/advanced-guides/caching-dependencies-to-speed-up-workflows#restrictions-for-accessing-a-cache), with the default and target branches being available to every branch.

Following attributes are required to authenticate against the [GitHub Actions Cache service API](https://github.com/tonistiigi/go-actions-cache/blob/master/api.md#authentication):
- `url`: Cache server URL (default `$ACTIONS_CACHE_URL`)
- `token`: Access token (default `$ACTIONS_RUNTIME_TOKEN`)

`--export-cache` options:

- `type=gha`
- `mode=<min|max>`: specify cache layers to export (default: `min`)
  - `min`: only export layers for the resulting image
  - `max`: export all the layers of all intermediate steps
- `scope=<scope>`: which scope cache object belongs to (default `buildkit`)

`--import-cache` options:

- `type=gha`
- `scope=<scope>`: which scope cache object belongs to (default `buildkit`)

### S3 cache (experimental)

```bash
envd build ... \
  --output type=image,name=docker.io/username/image,push=true \
  --export-cache type=s3,region=eu-west-1,bucket=my_bucket,name=my_image \
  --import-cache type=s3,region=eu-west-1,bucket=my_bucket,name=my_image
```

The following attributes are required:
- `bucket`: AWS S3 bucket (default: `$AWS_BUCKET`)
- `region`: AWS region (default: `$AWS_REGION`)

Storage locations:
- blobs: `s3://<bucket>/<prefix><blobs_prefix>/<sha256>`, default: `s3://<bucket>/blobs/<sha256>`
- manifests: `s3://<bucket>/<prefix><manifests_prefix>/<name>`, default: `s3://<bucket>/manifests/<name>`

S3 configuration:
- `blobs_prefix`: global prefix to store / read blobs on s3 (default: `blobs/`)
- `manifests_prefix`: global prefix to store / read manifest on s3 (default: `manifests/`)
- `endpoint_url`: specify a specific S3 endpoint (default: empty)
- `use_path_style`: if set to `true`, put the bucket name in the URL instead of in the hostname (default: `false`)

AWS Authentication:

The simplest way is to use an IAM Instance profile.
Others options are:

- Any system using environment variables / config files supported by the [AWS Go SDK](https://docs.aws.amazon.com/sdk-for-go/v1/developer-guide/configuring-sdk.html). The configuration must be available for the buildkit daemon, not for the client.
- Access Key ID and Secret Access Key, using the `access_key_id` and `secret_access_key` attributes.

`--export-cache` options:
- `type=s3`
- `mode=<min|max>`: specify cache layers to export (default: `min`)
  - `min`: only export layers for the resulting image
  - `max`: export all the layers of all intermediate steps
- `prefix=<prefix>`: set global prefix to store / read files on s3 (default: empty)
- `name=<manifest>`: specify name of the manifest to use (default `buildkit`)
  - Multiple manifest names can be specified at the same time, separated by `;`. The standard use case is to use the Git SHA1 as name, and the branch name as duplicate, and load both with 2 `import-cache` commands.

`--import-cache` options:
- `type=s3`
- `prefix=<prefix>`: set global prefix to store / read files on s3 (default: empty)
- `blobs_prefix=<prefix>`: set global prefix to store / read blobs on s3 (default: `blobs/`)
- `manifests_prefix=<prefix>`: set global prefix to store / read manifests on s3 (default: `manifests/`)
- `name=<manifest>`: name of the manifest to use (default `buildkit`)
