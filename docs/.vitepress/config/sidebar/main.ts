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
        { text: 'Modularize your build', link:'/guide/modularize'},
      ],
    },
    {
      text: 'Managing Environments',
      collapsible: true,
      items: [
        { text: 'Faster Build with Software Mirrors',link:'/envs/mirror' },
        { text: 'Per-user Config', link:'/envs/config'},
        { text: 'Multi-target Build', link:'/envs/multitarget'},
        { text: 'Setting Up Experiment Tracking', link:'/envs/monitoring'},
      ],
    },
    {
      text: 'envd for Your Teams',
      collapsible: true,
      items:[
        { text: 'Overview', link: '/teams/overview'},
        { text: 'envd on Kubernetes (Experimental)', link: '/teams/kubernetes'},
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
      text: 'Community',
      collapsible: true,
      items: [
        { text: 'Join envd Community', link: '/community/community' },
        { text: 'Contributing to envd', link: '/community/contributing' },
        { text: 'Roadmap', link: '/community/roadmap' },
      ]
    },
    {
      text: 'for Developers',
      collapsible: true,
      items: [
        { text: 'Development Tutorial', link: '/developers/development' },
        { text: 'envd-server', link: '/developers/kubernetes' },
      ]
    },
    {
      text: 'FAQs',
      collapsible: true,
      items:[
        { text: 'Why Use envd?', link: '/faq/why' },
        { text: 'envd vs. Others', link: '/faq/comparison' }
      ]
    },
    {
      text: 'Misc',
      collapsed: true,
      items: [
        {text: 'Telemetry', link: '/misc/telemetry'},
      ],
    },
  ],
}
