---
author: 'Keming'
avatar: 'https://www.github.com/kemingy.png'
github: 'https://github.com/kemingy'
twitter: 'https://twitter.com/urcyanide'
introduction: 'Keming is one of the envd maintainers. He mainly focus on the online machine learning model serving part.'
---

# Machine learning environment should be easy 

As a machine learning engineer that works on different deep learning models, unexpected environmental issues always bother me.

* Why did my CUDA stop working after lunch?
* How come my code cannot run in the cluster but works fine on my dev machine?
* "Hey Bob, can you send me your Dockerfile?" It is tedious to copy and make some changes but always has to be done before deployment.

Do these scenarios look familiar to you? What happens to the machine learning development environment?

1. Even though you can `pip install torch`, it doesn't mean you don't need to deal with the low-level code dependencies.
2. Container is necessary for a consistent environment. Especially for the GPU part.
3. Dockerfile is hard to reuse conveniently.

Dealing with the environment is just the first step of your work. It should be made easy but it's never easy. Although we need to admit that it's much easier than the day we had to search how to install NumPy.

---

Meanwhile, from the machine learning infra engineers' perspective:

* The docker images provided by the data science team are huge and don't follow the best practice, as usual.
* Oh no, they copied the legacy Dockerfile but forgot to change the library version. It's already deprecated.
* I wish they could terminate their Jupyter notebook to release the GPU resources, so I don't need to contact them one by one.

---

Infra engineers are never the enemies of machine learning engineers. A better tool can make everyone happy.

Let's sum up our requirements:
Machine learning engineers should submit container images instead of raw code. Because they know better about the model dependencies.
Infra engineer should maintain a better utility to help machine learning engineers to build the container images following the best practice.
Meanwhile, machine learning engineers don't want to sacrifice the development experience. They should be able to use Jupyter Notebook and VSCode as usual.

So far, everything looks good. Obviously, it's not something impossible.

---

Let's introduce the new tool: [envd](https://github.com/tensorchord/envd).

It provides the following features:

Writing Python-like function instead of the Dockerfile and share them across your team
Based on bulidkit with better cache and parallel building
Integrated with Jupyter Notebook and VSCode

The syntax looks like this:

```python
def build():
    base(os="ubuntu20.04", language="python")
    install.cuda(version="11.6", cudnn="8")
    install.python_packages(name=[
        "torch"
    ])
```

Run the command `envd up`, then you are in a isolated container environment.

To reuse the function written by your teammates, you can import them like:

```python
lib = include("https://github.com/tensorchord/envdlib")
lib.jupyter_lab(host_port=8888)
```

It's also much faster. See the benchmark below:

![Image description](https://user-images.githubusercontent.com/5100735/189928628-543f4851-87b7-462b-b811-372cbf46ff25.svg)

More features are coming! Feel free to open a issue or join the [discord](https://discord.gg/KqswhpVgdU) community to discuss with us.

<Author/>
