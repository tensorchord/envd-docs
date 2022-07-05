# CI/CD Integration 

envd only has one software dependency: [Buildkitd](https://github.com/moby/buildkit#containerizing-buildkit), thus envd is compatible with most Continuous Integration systems. Please contact us on [💬 Discord](https://discord.gg/KqswhpVgdU) if you have problems about integrating envd with your CI/CD system, we are glad to help!

## GitHub Actions

Here is an [example](https://github.com/tensorchord/envd-quick-start/blob/master/.github/workflows/release.yml) of a GitHub Action build.

```yaml title="Build and push envd image to ghcr.io"
name: CI

on:
  push:
    branches: [ master ]
  pull_request:

env:
  REGISTRY: ghcr.io
  IMAGE_NAME: ${{ github.repository }}

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v3
    - name: Log in to the Container registry
      uses: docker/login-action@f054a8b539a109f9f41c372932f1ae047eff08c9
      with:
        registry: ${{ env.REGISTRY }}
        username: ${{ github.actor }}
        password: ${{ secrets.GITHUB_TOKEN }}
    - name: Install envd
      run: |
        pip install --pre envd
        envd bootstrap
    - name: Build and push
      run: envd build --output type=image,name=${{ env.REGISTRY }}/${{ env.IMAGE_NAME }},push=true
```

If you just want to verify if `envd build` works, things are easier:

```yaml title="Build envd image"
name: CI

on:
  push:
    branches: [ master ]
  pull_request:

env:
  REGISTRY: ghcr.io
  IMAGE_NAME: ${{ github.repository }}

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v3
    - name: Install envd
      run: |
        pip install --pre envd
        envd bootstrap
    - name: Build
      run: envd build
```

## GitLab CI

The example below uses [docker.io/docker:dind](https://hub.docker.com/layers/docker/library/docker/dind/images/sha256-95d63c46fdbeca706f6cb736ebcfbbf81e845c3f5a64ab5133cb0fe15ecbbfc4?context=explore) to build the envd image.

```yaml title=".gitlab-ci.yml"
image: docker
services:
  - docker:dind

before_script:
    - pip install --pre envd
    - envd bootstrap
    - docker login -u $CI_REGISTRY_USER -p $CI_REGISTRY_PASSWORD $CI_REGISTRY

envd:
  stage: Build and push
  script:
    - envd build --output type=image,name=$CI_REGISTRY/$CI_REGISTRY_USER/envd-quick-start,push=true
```

If you do not want to enable docker in the CI environment, you can create a remote buildkitd instance on remote docker daemon or Kubernetes cluster.

```yaml title=".gitlab-ci.yml"
image: envd-quick-start

before_script:
    - pip install --pre envd
    # Create the buildkitd or connect to a existing instance.
    - kubectl apply -f https://raw.githubusercontent.com/moby/buildkit/master/examples/kubernetes/pod.rootless.yaml
    # Configure the auth information.
    - echo "{\"auths\":{\"$CI_REGISTRY\":{\"auth\":\"$(echo -n $CI_REGISTRY_USER:$CI_REGISTRY_PASSWORD | base64)\"}}}" > ~/.docker/config.json
    # Connect envd to a existing buildkitd instance.
    - envd context create --name buildkitk8s --builder-name buildkitd --use --builder kube-pod

envd:
  stage: Build and push
  script:
    - envd build --output type=image,name=$CI_REGISTRY/$CI_REGISTRY_USER/envd-quick-start,push=true
```
