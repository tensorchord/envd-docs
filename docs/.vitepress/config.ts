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
    ['link', { rel: 'icon', href: '/logo.svg'}],
  ],

  themeConfig: {
    logo: '/logo.svg',
    // TODO: need appId and apiKey
      // algolia: {
      //   appId: '',
      //   apiKey: '',
      //   indexName: '',
      // },
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