---
author: 'nullday'
avatar: 'https://www.github.com/aseaday.png'
github: 'https://github.com/aseaday'
introduction: 'nullday is one of the envd maintainers. He has a dog called Shoufu and mainly focus on how envd can help users to improve work and study.'
---

# 5 minutes to run your ML/AI environment on your remote machine

envd provided a strong way to run your machine learning environment. For some people, we may be provided a powerful server had a bundle of cuda devices. We also want our actual running happens on the remote server and be able to easily access the environment from our local machine.

Here is the the guide. 

## For linux server

**Prerequisite:**

- A Linux server with password or private key.

### 1. Installation (3 mins)

You need to install docker and envd on your server first.

Read [install docker](https://docs.docker.com/engine/install/ubuntu/). Install the latest docker on your server.

If you don't have pip3, you could install it by 
```bash
# For Ubuntu
apt install -y python3-pip
# For CentOS
yum install python3-pip -y
```
Then you can install envd by

```bash
pip install --pre --upgrade envd
```
There is a also a mirror for some China users:
```bash
pip install -i https://pypi.tuna.tsinghua.edu.cn/simple --pre --upgrade envd
```
Bootstrap the envd:
```
envd bootstrap
# or for China users
envd bootstrap --dockerhub-mirror https://docker.mirrors.sjtug.sjtu.edu.cn
```

Verify the installation:

<img width="1095" alt="Screen Shot 2022-11-10 at 13 07 01" src="https://user-images.githubusercontent.com/3927355/201005688-ac8e5235-a427-4086-b548-985b32afdd5a.png">


### Run your environment

Here is a example for you:
```python
def build():
    base(os="ubuntu20.04", language="python3")
    install.python_packages(name = [
        "numpy",
    ])
    shell("zsh")
```
If you want to know more about the ability powered by envd. Please see the documentation [Building Your First Environment](https://envd.tensorchord.ai/guide/build-envd.html#build-envd-example).

Make a directory or clone your repository, touch a file called `build.envd` and add the build script to this file. 

Run `envd up` in your directory to start you environment.

<img width="1040" alt="Screen Shot 2022-11-10 at 13 36 52" src="https://user-images.githubusercontent.com/3927355/201009233-d98f6c7b-10dc-4dfc-9329-68578a4154a4.png">


### Access it from your local computer

First, you can copy the private key access the environment/container to your local computer. on remote machine, open the `~/.ssh/config`, find the section whose host matched the directory you build your environment. For example, if you build your environment in the directory named `demo`, the host will be `demo.envd`. 
```
Host demo.envd
  ForwardAgent yes
  PubkeyAcceptedKeyTypes +ssh-rsa
  HostKeyAlgorithms +ssh-rsa
  HostName 127.0.0.1
  Port 39265
  UserKnownHostsFile /dev/null
  IdentityFile "/root/.config/envd/id_rsa_envd" 
  StrictHostKeyChecking no
  ForwardAgent yes
```

On you local computer, you could copy the envd private key on the remote server to your local:

```bash
scp user@remote.server:~/.config/envd/id_rsa_envd ~/.config/envd/remote_id_rsa_envd
```
Copy the ssh config section above to your local `~/.ssh/config` (If you don't have it, you can create one). But you need to some editings to it:

```
IdentityFile "~/.config/envd/remote_id_rsa_envd" 
```

Forward the remote server's port to local port, the port number should be the same as the port mentioned in the ssh configuration:

```
ssh -L 39265:127.0.0.1:39265 user@remote.server
```

Now you can connect the remote server's environment on your local vscode:


<img width="723" alt="Screen Shot 2022-11-10 at 13 55 44" src="https://user-images.githubusercontent.com/3927355/201012045-20f8b44c-98e5-4122-9294-8fdc329465c7.png">

Remember to execute ssh forwarding when you need to access the environment.

#### Expose environment on internet

If your remote server has a accessiable public ip address and be authorized to listen on some ports, you could user the following commands:
```bash
envd up --host 0.0.0.0
# or
envd up --host public-ip
```
Then modify the ssh config your remote server's public ip. In this way, you don't need to ssh forwarding every time.

<Author/>
