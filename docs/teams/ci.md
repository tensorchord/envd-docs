# CI/CD Integration 

`envd` only has one software dependency: [Buildkitd](https://github.com/moby/buildkit#containerizing-buildkit), thus `envd` is compatible with most Continuous Integration systems. Please contact us on [💬 Discord](https://discord.gg/KqswhpVgdU) if you have problems about integrating `envd` with your CI/CD system, we are glad to help!

## Deamonless Mode

You can run `envd build` in a single container (which likes kaniko).

There are many features of envd and buildkit cannot be used in the daemonless mode. For example, you cannot share the cache during the multiple builds. But at the same time, you do not need to deploy a buildkit daemon instance on Kubernetes.

```
docker run \                
    -it \
    --rm \
    --security-opt seccomp=unconfined \
    --security-opt apparmor=unconfined \
    -e BUILDKITD_FLAGS=--oci-worker-no-process-sandbox \
    --entrypoint /envd-daemonless.sh \
    -v path-to-envd-dir:/tmp/work \
    tensorchord/envd:${ENVD_VERSION}-rootless \
    --debug build -p /tmp/work --output type=image,name=<image-name>,push=true
```

Or create a job on Kubernetes:

```yaml
apiVersion: v1
kind: ConfigMap
metadata:
  name: envd-daemonless-demo
data:
  build.envd: |-
    def build():
        install.apt_packages(name=["via])
---
apiVersion: v1
kind: ConfigMap
metadata:
  name: envd-daemonless-demo
data:
  build.envd: |
    def build():
      install.apt_packages(name=["via"])
---
apiVersion: batch/v1
kind: Job
metadata:
  name: envd-daemonless-job
spec:
  template:
    metadata:
      annotations:
        container.apparmor.security.beta.kubernetes.io/envd: unconfined
    spec:
      restartPolicy: Never
      containers:
        - name: envd
          # Update the image tag to the expected version of envd.
          image: tensorchord/envd:v0.2.4-alpha.15-rootless
          env:
            - name: BUILDKITD_FLAGS
              value: --oci-worker-no-process-sandbox
          command:
            - /envd-daemonless.sh
          args:
            - --debug
            - build
            - -p
            - /
            - --output
            - type=image,name=<image-name>,push=true
          securityContext:
            # Needs Kubernetes >= 1.19
            seccompProfile:
              type: Unconfined
          volumeMounts:
            - name: workspace
              readOnly: true
              subPath: build.envd
              mountPath: /build.envd
            # https://github.com/moby/buildkit/issues/879#issuecomment-1240347038
            - mountPath: /home/user/.local/share/buildkit
              name: buildkitd
      # To push the image, you also need to create `~/.docker/config.json` secret
      # and set $DOCKER_CONFIG to `/path/to/.docker` directory.
      volumes:
        - configMap:
            name: envd-daemonless-demo
          name: workspace
        - name: buildkitd
          emptyDir: {}
```

## GitHub Actions

Here is an [example](https://github.com/tensorchord/envd-quick-start/blob/master/.github/workflows/release.yml) of a GitHub Action build.

<custom-title title="Build and push envd image to ghcr.io">


```yaml 
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

</custom-title>

If you just want to verify if `envd build` works, things are easier:

<custom-title title="Build envd image">

```yaml 
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

</custom-title>

## GitLab CI

The example below uses [docker.io/docker:dind](https://hub.docker.com/layers/docker/library/docker/dind/images/sha256-95d63c46fdbeca706f6cb736ebcfbbf81e845c3f5a64ab5133cb0fe15ecbbfc4?context=explore) to build the `envd` image.

<custom-title title=".gitlab-ci.yml">

```yaml 
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

</custom-title>

If you do not want to enable docker in the CI environment, you can create a remote buildkitd instance on remote docker daemon or Kubernetes cluster.


<custom-title title=".gitlab-ci.yml">

```yaml 
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

</custom-title>
