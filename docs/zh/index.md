---
layout: home

title: envd
titleTemplate: 开发环境管理工具

hero:
  name: envd
  text: AI/ML 开发环境管理
  tagline: 是一个为算法工程师和数据科学家设计的开发环境管理工具
  actions:
    - theme: brand
      text: 快速开始
      link: /zh/guide/getting-started
    - theme: alt
      text: 在 GitHub 查看
      link: https://github.com/tensorchord/envd

features:
  - icon: 🐍
    title: 告别 Docker，All in Python
    details: 只需要使用 Python 描述构建过程，envd 帮助你解决复杂且容易出错的 Bash / Makefile / Dockerfile / ...
  - icon: 🖨️
    title: 内置的 Jupyter/VSCode 支持
    details: 原生支持 Jupyter notebooks 和 VSCode remote 扩展，提供良好的开发体验。
  - icon: ⏱️ 
    title: 节省时间
    details: 充分利用软件源和 Docker/Buildkit 的缓存机制，大大加快构建速度，节省构建时间。
  - icon: ☁️
    title: 本地云端，无缝迁移
    details:  envd 与 Docker 紧密结合，构建兼容 Docker 镜像标准的环境镜像，在本地云端都可以使用。
  - icon: 🔁 
    title: 可复现的构建和结果
    details: 完全复现相同的环境，无论是在你的笔记本电脑上，还是在数据中心，亦或是在公有云服务上。更好地复现训练结果。
---

<VPTeamPage>
  <VPTeamPageTitle>
    <template #title>
      团队成员
    </template>
  </VPTeamPageTitle>
  <VPTeamMembers
    size="small"
    :members="members"
  />
</VPTeamPage>

<script setup>
import {
  VPTeamPage,
  VPTeamPageTitle,
  VPTeamMembers
} from 'vitepress/theme'

const members = [
  {
    avatar: 'https://www.github.com/gaocegege.png',
    name: 'Ce Gao',
    title: 'Co-founder',
    links: [
      { icon: 'github', link: 'https://github.com/gaocegege' },
      { icon: 'twitter', link: 'https://twitter.com/gaocegege' }
    ]
  },
  {
    avatar: 'https://www.github.com/terrytangyuan.png',
    name: 'Yuan Tang',
    title: 'Maintainer',
    links: [
      { icon: 'github', link: 'https://github.com/terrytangyuan' },
      { icon: 'twitter', link: 'https://twitter.com/TerryTangYuan' }
    ]
  },
]
</script>
