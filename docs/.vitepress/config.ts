import { defineConfig } from 'vitepress'
import footnote from 'markdown-it-footnote'
import { sidebar } from './config/sidebar'

export default defineConfig({
  lang: 'en-US',
  lastUpdated: true,
  locales: {
    '/': {
      lang: 'en-US',
      title: 'envd',
      description: 'AI/ML Development Environment'
    },
    '/zh/': {
      lang: 'zh-CN',
      title: 'envd',
      description: 'AI/ML 开发环境'
    },
  },
  title: 'envd',
  
  head:[
    ['link', { rel: 'icon', href: '/logo.svg', alt:'envd'}],
    ['meta', { name: 'keywords', content: 'envd, AI, ML, development environment, data science, engineering teams,  No Docker, only Python, Jupyter, VSCode, save time, Local & cloud, Repeatable builds, reproducible results'}],
    ['meta', { property: 'og:title', content: 'envd' }],
    ['meta', { property: 'og:description', content: 'A machine learning development environment for data science and AI/ML engineering teams.' }],
    ['meta', { property: 'og:url', content: 'https://envd.tensorchord.ai/' }],
    ['meta', { name: 'twitter:title', content: 'envd' }],
    ['meta', { name: 'twitter:description', content: 'AI/ML Development Environment' }],
    ['meta', { name: 'twitter:card', content: 'summary_large_image' }],
    ['meta', { name: 'twitter:site', content: '@TensorChord' }]
  ],

  themeConfig: {
    logo: '/logo.svg',
    algolia: {
      appId: 'KGSWV0XY1D',
      apiKey: 'a3c4e766b63fac5bee147fb9fc269cb0',
      indexName: 'tensorchord',
    },
    localeLinks: {
      text: '',
      items: [
        { text: 'English', link: '/guide/getting-started' },
        { text: '简体中文', link: '/zh/guide/getting-started' },
      ],
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/tensorchord/envd' },
      { icon: 'twitter', link: 'https://twitter.com/TensorChord' },
      { icon: 'discord', link: 'https://discord.gg/KqswhpVgdU' }
    ],

    sidebar,
    nav:[
      // add the default post link here
      { text: 'Blog', link: '/blog/welcome',activeMatch: '/blog/' },
    ],
    editLink: {
      pattern: 'https://github.com/tensorchord/envd-docs/tree/main/docs/:path',
      text: 'Suggest changes to this page',
    },

    footer: {
      message: 'Released under the Apache-2.0 License. Built with VitePress.',
      copyright: 'Copyright © 2022 TensorChord, Inc.'
    }
  },
  markdown: {
    config: (md) => {
      md.use(footnote)
    }
  },
})