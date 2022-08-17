import type { DefaultTheme } from 'vitepress'
import { apiSidebar } from './sidebar/api'
import { blogSidebar } from './sidebar/blog'
import { zhSidebar } from './sidebar/zh'
import { mainSidebar } from './sidebar/main'

export const sidebar: DefaultTheme.Sidebar = {
  ...blogSidebar,
  ...apiSidebar,
  ...zhSidebar,
  ...mainSidebar,
  '/blog/':[
    {
      text: 'Blog',
      items: [
        // if you add a new blog post, add it to the sidebar here
        // eg: { text: 'Blog', link: '/blog/post1' },
        { text: 'Welcome', link: '/blog/welcome' },
      ]
    }
  ],
  '/zh/':[
    {
      text: '开始了解',
      collapsible: true,
      items:[
          { text: '快速开始', link: '/zh/guide/getting-started' },
          { text: '构建你的开发环境', link:'/zh/guide/build-envd'},
          { text: '连接你的开发环境', link:'/zh/guide/ide'},
          { text: '为何选择 envd', link: '/zh/guide/why' },
          { text: 'envd 核心概念', link:'/zh/guide/concepts'},
      ],
    },
    {
      text: '编程语言',
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
        { text: '利用软件镜像源更快地构建环境',link:'/zh/tips/mirror' },        
        { text: '用户相关配置', link:'/zh/tips/config'},
        { text: 'Remote Cache', link: '/zh/tips/cache'},
        { text: 'envd Contexts', link: '/zh/tips/context'},
        { text: 'CI/CD 集成', link:'/zh/tips/ci'},
        { text: '多目标构建', link:'/zh/tips/multitarget'},
        { text: 'envd 和其他工具的比较', link:'/zh/tips/comparison' }
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
      text: 'envd CLI 文档',
      collapsible: true,
      items:[
        {text:'envd CLI Reference', link:'/zh/cli'},
      ]
    },
    {
      text: '社区',
      collapsible: true,
      items:[
        {text:'贡献 envd', link:'/zh/community/contributing'},
        {text:'开发教程', link:'/zh/community/development'},
        {text:'路线图', link:'/zh/community/roadmap'},
      ]
    },
  ],

  '/':[
    {
      text: 'Guide',
      collapsible: true,
      items:[
        { text: 'Getting Started', link: '/guide/getting-started' },
        { text: 'Running Your First Environment', link:'/guide/build-envd'},
        { text: 'Using envd Environment', link:'/guide/ide'},
        { text: 'envd Concepts', link:'/guide/concepts'},
      ],
    },
    {
      text: 'Managing Environments',
      collapsible: true,
      items: [
        { text: 'Faster Build with Software Mirrors',link:'/tips/mirror' },
        { text: 'Per-user Config', link:'/tips/config'},
        { text: 'Multi-target Build', link:'/tips/multitarget'},
      ],
    },
    {
      text: 'envd For Your Teams',
      collapsible: true,
      items:[
        { text: 'Overview', link: '/teams/overview'},
        { text: 'CI/CD Integration', link:'/teams/ci'},
        { text: 'envd Contexts', link: '/teams/context'},
        { text: 'Remote Cache (Advanced)', link: '/teams/cache'},
      ]
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
      text: 'FAQs',
      collapsible: true,
      items:[
        { text: 'Why Use envd?', link: '/guide/why' },
        { text: 'envd vs. Others', link:'/tips/comparison' }
      ]
    },
    {
      text: 'API Reference',
      collapsible: true,
      collapsed: true,
      items:[
        {text: 'global', link:'/api/global functions'},
        {text: 'config package', link:'/api/config'},
        {text: 'install package', link:'/api/install'},
      ]
    },
    {
      text: 'envd CLI Reference',
      collapsible: true,
      collapsed: true,
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
        {text:'Roadmap', link:'/community/roadmap'},
      ]
    },
  ],
  
  
}
