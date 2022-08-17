import type { DefaultTheme } from 'vitepress'

export const mainSidebar: DefaultTheme.Sidebar = {
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
