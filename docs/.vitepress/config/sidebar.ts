import type { DefaultTheme } from 'vitepress'

export const sidebar: DefaultTheme.Sidebar = {
  '/zh/':[
    {
      text: '开始了解',
      collapsible: true,
      items:[
          { text: '为何选择 envd', link: '/zh/guide/why' },
          { text: '快速开始', link: '/zh/guide/getting-started' },
          { text: '构建你的开发环境', link:'/zh/guide/build-envd'},
          { text: '连接你的开发环境', link:'/zh/guide/ide'},
          { text: 'envd 核心概念', link:'/zh/guide/concepts'},
      ],
    },
    {
      text: 'Languages',
      collapsible: true,
      items:[
        { text: 'Python', link: '/zh/lang/python' },
        { text: 'Julia', link: '/zh/lang/julia' },
        { text: 'R', link: '/zh/lang/r' },
      ]
    },
    {
      text: '技巧和提示',
      collapsible: true,
      items:[
        { text: 'Faster Build with Software Mirrors',link:'/zh/tips/mirror' },
        { text: 'Per-user Config', link:'/zh/tips/config'},
        { text: 'CI/CD Integration', link:'/zh/tips/ci'}
      ]
    },
    {
      text: 'API 文档',
      collapsible: true,
      items:[
        {text: 'Global Functions', link:'/zh/api/global functions'},
        {text: 'Config', link:'/zh/api/config'},
        {text: 'Install', link:'/zh/api/install'},
      ]
    },
    {
      text: 'envd CLI Reference',
      collapsible: true,
      items:[
        {text:'envd CLI Reference', link:'/zh/cli'},
      ]
    },
    {
      text: '社区',
      collapsible: true,
      items:[
        {text:'Contributing to envd', link:'/zh/community/contributing'},
        {text:'Development Tutorial', link:'/zh/community/development'},
        {text:'路线图', link:'/zh/community/roadmap'},
      ]
    },
  ],
  '/':[
    {
      text: 'Guide',
      collapsible: true,
      items:[
        { text: 'Why envd', link: '/guide/why' },
        { text: 'Getting Started', link: '/guide/getting-started' },
        { text: 'Building Your First Environment', link:'/guide/build-envd'},
        { text: 'Connect to envd Environment', link:'/guide/ide'},
        { text: 'envd Concepts', link:'/guide/concepts'},
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
  ],
  
}
