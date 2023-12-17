import { defineConfig } from 'vitepress'
import footnote from 'markdown-it-footnote'
import { sidebar } from './config/sidebar'
import { SitemapStream } from 'sitemap'
import { createWriteStream } from 'node:fs'
import { resolve } from 'node:path'
import { blogSidebar } from './config/sidebar/blog'

// This links array is used to temporarily store all page link information, in order to generate sitemap.
const links: any[] = []
const siteHostName = 'https://zh.envd.tensorchord.ai/'
const og = 'https://og.tensorchord.ai/api/og?title='

export default defineConfig({
  lang: 'zh-CN',
  lastUpdated: true,
  locales: {
    root:{
      label:'简体中文',
      lang:'zh',
    },
    zh:{
      label:'English',
      lang:'en',
      link:'https://envd.tensorchord.ai'
    }
  },
  title: 'envd',

  head:[
    // Google Analytics
    [
      'script',
      {
        async: "true",
        src: 'https://www.googletagmanager.com/gtag/js?id=G-HRD26FG2QW'
      }
    ],
    [
      'script',
      {},
      "window.dataLayer = window.dataLayer || [];\nfunction gtag(){dataLayer.push(arguments);}\ngtag('js', new Date());\ngtag('config', 'G-HRD26FG2QW');"
    ],

    ['link', { rel: 'icon', href: '/logo_light.svg', alt:'envd'}],
    ['meta', { name: 'keywords', content: 'envd, AI, ML, development environment, data science, engineering teams, No Docker, only Python, Jupyter, VSCode, save time, Local & cloud, Repeatable builds, reproducible results'}],
    ['meta', { property: 'og:title', content: 'envd' }],
    ['meta', { property: 'og:description', content: 'A machine learning development environment for data science and AI/ML engineering teams.' }],
    ['meta', { property: 'og:url', content: 'https://envd.tensorchord.ai/' }],
    ['meta', { name: 'twitter:title', content: 'envd' }],
    ['meta', { name: 'twitter:description', content: 'AI/ML Development Environment' }],
    ['meta', { name: 'twitter:card', content: 'summary_large_image' }],
    ['meta', { name: 'twitter:site', content: '@TensorChord' }],
  ],

  themeConfig: {
    logo: {
      light: '/logo_light.svg',
      dark: '/logo_dark.svg',
    },
    search:{
      provider: 'local'
    },
    socialLinks: [
      { icon: 'github', link: 'https://github.com/tensorchord/envd' },
      { icon: 'twitter', link: 'https://twitter.com/TensorChord' },
      { icon: 'discord', link: 'https://discord.gg/KqswhpVgdU' }
    ],

    sidebar,
    nav:[
      // add the default post link here
      { text: '开始了解', link: '/guide/getting-started'},
      { text: 'API', link: '/api/cli/cli',activeMatch: '/api/' },    
      // Use latest blog as the default one
      // @ts-ignore
      { text: '博客', link: blogSidebar['/blog/'][0].items[0].link, activeMatch: '/blog/' },
      { text: '版本历史', link: 'https://github.com/tensorchord/envd/releases'}
    ],
    editLink: {
      pattern: 'https://github.com/tensorchord/envd-docs/tree/main/docs-zh/:path',
      text: '对本页提出修改建议',
    },
    lastUpdatedText: '最后更新',
    docFooter: {
      next: '下一页',
      prev: '上一页'
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

  transformHead: async (ctx) => {
    return [
      ['meta', { property: 'og:title', content: ctx.pageData.title }],
      ['meta', { property: 'og:description', content: ctx.pageData.description }],
      ['meta', { property: 'og:url', content: siteHostName + ctx.pageData.relativePath }],
      ['meta', { property: 'og:image', content: encodeURI(og + ctx.pageData.title) }],
      ['meta', { name: 'twitter:title', content: ctx.pageData.title }],
      ['meta', { name: 'twitter:description', content: ctx.pageData.description }],
      ['meta', { name: 'twitter:card', content: 'summary_large_image' }],
      ['meta', { name: 'twitter:site', content: '@TensorChord' }],
    ]
  },

  transformHtml: (_, id, { pageData }) => {
    if (!/[\\/]404\.html$/.test(id))
      links.push({
        url: pageData.relativePath.replace(/\.md$/, '.html'),
        lastmod: pageData.lastUpdated
      })
  },

  buildEnd: async ({ outDir }) => {
    const sitemap = new SitemapStream({
      hostname: siteHostName
    })
    const writeStream = createWriteStream(resolve(outDir, 'sitemap.xml'))
    sitemap.pipe(writeStream)
    links.forEach((link) => sitemap.write(link))
    sitemap.end()
    await new Promise((r) => writeStream.on('finish', r))
  },
})
