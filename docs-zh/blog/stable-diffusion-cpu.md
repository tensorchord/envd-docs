---
author: 'Ce Gao'
avatar: 'https://www.github.com/gaocegege.png'
github: 'https://github.com/gaocegege'
twitter: 'https://twitter.com/gaocegege'
introduction: 'Ce Gao 是 envd 的维护者之一。与此之外，他还是机器学习基础设施开源项目 Kubeflow 的 Co-chair。他主要关注机器学习的模型训练、自动机器学习等领域。'
---

# 使用 CPU 体验最顶尖的 AI 生成艺术模型

机器学习产生艺术的发展速度令人惊叹。它发生得如此之快，几乎让人感觉它就是凭空出现的。我们可以让计算机从单纯的文本提示中艺术性地创作出原创作品。Stable Diffusion 毫无疑问成为了当前最出名的生成艺术模型。它的效果堪称惊艳：

![](https://substackcdn.com/image/fetch/w_1456,c_limit,f_webp,q_auto:good,fl_progressive:steep/https%3A%2F%2Fbucketeer-e05bbc84-baa3-437e-9518-adb32be77984.s3.amazonaws.com%2Fpublic%2Fimages%2F316b0d3b-591e-455f-b721-beaba73d0a0a_2400x1100.png)
Midjourney + Stable Diffusion. Credit: alessandrochille, Darken, eyecon01

在周末的时间里我一直在把玩 Stable Diffusion，但是，它对于显存的需求也是非常之大。于是我希望它能够安静的跑在我 2019 年的 XPS 笔记本上，那么接下来就分享一下我的做法。

## 准备工作

首先，我确定使用 [`envd`](https://github.com/tensorchord/envd/) 来配置环境，开发环境通过 [`envd`](https://github.com/tensorchord/envd/) 运行在容器中，因此在尝试 Stable Diffusion 的过程中不会破坏我的笔记本电脑上已经脆弱不堪的本地环境。[`envd`](https://github.com/tensorchord/envd/) 可以通过 pip 进行安装：

```
pip3 install --pre --upgrade envd
```

接下来，我选择了 Huggingface 上的 Stable Diffusion 托管模型，因此需要：

- [注册 Huggingface](https://huggingface.co/join)
- [接受 Stable Diffusion 的使用协议](https://huggingface.co/CompVis/stable-diffusion-v1-4)
- [创建访问 token](https://huggingface.co/settings/tokens)。这个 token 会在接下来被使用。

## 直接运行

接下来，我们只需要运行，就可以了。让我们从配置开发环境开始：

```bash
mkdir stable-diffusion
cd stable-diffusion
touch build.envd
```

我们创建了一个目录 `stable-diffusion`，在其中创建了一个文件 `build.envd`，这是 [`envd`](https://github.com/tensorchord/envd/) 的配置文件：

```python
def build():
    base(os="ubuntu20.04", language="python")
    #config.pip_index(url = "https://pypi.tuna.tsinghua.edu.cn/simple")
    install.python_packages([
        "torch",
        "transformers",
        "diffusers",
    ])
```

如果你在国内的话，可以添加上第三行 pip index 的配置，让环境的构建更快。接下来，让我们创建用户运行 Stable Diffusion 的 python 代码 `main.py`：

```python
import random
import sys
import os

from diffusers import StableDiffusionPipeline

def dummy(images, **kwargs):
    return images, False

# Read prompt from command line
prompt = " ".join(sys.argv[1:])

pipe = StableDiffusionPipeline.from_pretrained("CompVis/stable-diffusion-v1-4",
                                                use_auth_token=os.environ['HUGGINGFACE_TOKEN'])
pipe.to("cpu")
pipe.safety_checker = dummy

# Run until we exit with CTRL+C
while True:
    n = random.randint(1000, 9999)
    image = pipe(prompt, guidance_scale=7.5).images[0]
    image.save(f'{n}.jpeg')
```

接下来，我们通过 `envd up` 创建出开发环境，并且在其中设置环境变量 `HUGGINGFACE_TOKEN` 为你在准备工作中创建的 Huggingface token。最后，运行即可：

```
envd up
~/stable-diffusion via Py v3.9.13 via 🅒 envd 
⬢ [envd]❯ export HUGGINGFACE_TOKEN=<YOUR TOKEN HERE>
~/stable-diffusion via Py v3.9.13 via 🅒 envd 
⬢ [envd]❯ python main.py "your prompt here"
```

下面是我自己通过 Stable Diffusion 生成的图片，确实让人惊艳。起码，它比我更懂设计。

```
python main.py "a girl with lavender hair and black skirt, fairy tale style background, a beautiful half body illustration, top lighting, perfect shadow, soft painting, reduce saturation, leaning towards watercolor, art by hidari and krenz cushart and wenjun lin and akihiko yoshida"
```

<img src="https://user-images.githubusercontent.com/5100735/189612697-c5c24191-984d-4d8e-a381-d667f4937494.jpeg" width=400 style="display: block; margin: 0 auto">

<img src="https://user-images.githubusercontent.com/5100735/189613640-3e08b540-92b7-4cd1-80df-0892055e1881.jpeg" width=400 style="display: block; margin: 0 auto">

```
python main.py "city in the forest"
```

<img src="https://user-images.githubusercontent.com/5100735/189612774-1edb885c-f555-42f2-9333-8dc0383edd3e.jpeg" width=400 style="display: block; margin: 0 auto">

<img src="https://user-images.githubusercontent.com/5100735/189612809-68c2dc0e-8583-4ae4-9f48-6d2653b27c40.jpeg" width=400 style="display: block; margin: 0 auto">

---

<Author/>
