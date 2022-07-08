---
layout: home

title: envd
titleTemplate: Development Environment for Machine Learning Engineers

hero:
  name: envd
  text: AI/ML Development Environment.
  tagline: envd is a machine learning development environment for data science and AI/ML engineering teams.
  actions:
    - theme: brand
      text: Get Started
      link: /guide/getting-started
    - theme: alt
      text: View on GitHub
      link: https://github.com/tensorchord/envd

features:
  - icon: 🐍
    title: No Docker, only Python
    details: Focus on writing Python code, we will take care of Docker and development environment setup.
  - icon: 🖨️
    title: Built-in Jupyter/VSCode
    details: First-class support for Jupyter and VSCode remote extension.
  - icon: ⏱️ 
    title: Save time
    details: Better cache management to save your time, keep the focus on the model, instead of dependencies.
  - icon: ☁️
    title: Local & cloud
    details: envd integrates seamlessly with Docker so that you can easily share, version, and publish `envd` environments with Docker Hub or any other OCI image registries.
  - icon: 🔁 
    title: Repeatable builds & reproducible results
    details: You can reproduce the same dev environment on your laptop, public cloud VMs, or Docker containers, without any change in setup.
---

<VPTeamPage>
  <VPTeamPageTitle>
    <template #title>
      Meet Our Team
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
