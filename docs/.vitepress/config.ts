import { defineConfig } from 'vitepress'

export default defineConfig({
  lang: 'en-US',
  title: 'envd',
  themeConfig: {
    logo: '/logo.svg',

    socialLinks: [
      { icon: 'github', link: 'https://github.com/tensorchord/envd' },
      { icon: 'twitter', link: 'https://twitter.com/TensorChord' },
      { icon: 'discord', link: 'https://discord.gg/KqswhpVgdU' }
    ],

    sidebar: [
      {
        text: 'Guide',
        collapsible: true,
        items:[
          { text: 'Why envd', link: '/why/why' },
          { text: 'Getting Started', link: '/guide/getting-started' },
        ],
      },
      {
        text: 'Languages',
        collapsible: true,
        items:[
          { text: 'Python', link: '/lang/python' },
          { text: 'Julia', link: '/lang/julia' },
          { text: 'R', link: '/lang/r' },
        ]
      },
      {
        text: 'Tips and Tricks',
        collapsible: true,
        items:[
          { text: 'Faster Build with Software Mirrors',link:'/tips/mirror' },
          { text: 'Per-user Config', link:'/tips/config'},
          { text: 'CI/CD Integration', link:'/tips/ci'}
        ]
      },
      {
        text: 'API Reference',
        collapsible: true,
        items:[
          {text: 'Global Functions', link:'/api/global functions'},
          {text: 'Config', link:'/api/config'},
          {text: 'Install', link:'/api/install'},
        ]
      },
      {
        text: 'envd CLI Reference',
        collapsible: true,
        items:[
          {text:'envd CLI Reference', link:'/cli'},
        ]
      },
      {
        text: 'Community',
        collapsible: true,
        items:[
          {text:'Contributing to envd', link:'/community/contributing'},
          {text:'Development Tutorial', link:'/community/development'},
          {text:'roadmap', link:'/community/roadmap'},
        ]
      },
      {
        text: 'Build envd',
        collapsible: true,
        items:[
          {text:'Build envd', link:'/build-envd/build-envd'},
        ]
      }
    ],

    editLink: {
      pattern: 'https://github.com/tensorchord/envd-docs/tree/main/docs/:path',
      text: 'Suggest changes to this page',
    },

    footer: {
      message: 'Released under the Apache-2.0 License. Built with VitePress.',
      copyright: 'Copyright © 2022 TensorChord, Inc.'
    }
  }
 
})