import type { DefaultTheme } from 'vitepress'

export const mainSidebar: DefaultTheme.Sidebar = {
  '/': [
    {
      text: 'Guide',
      collapsible: true,
      items: [
        { text: 'Getting Started', link: '/guide/getting-started' },
        { text: 'Building Your First Environment', link: '/guide/build-envd' },
        { text: 'Connect to envd Environment', link: '/guide/ide' },
        { text: 'Why envd', link: '/guide/why' },
        { text: 'envd Concepts', link: '/guide/concepts' },
      ],
    },
    {
      text: 'Languages',
      collapsible: true,
      items: [
        { text: 'Python', link: '/lang/python' },
        { text: 'Julia', link: '/lang/julia' },
        { text: 'R', link: '/lang/r' },
      ]
    },
    {
      text: 'Tips and Tricks',
      collapsible: true,
      items: [
        { text: 'Faster Build with Software Mirrors', link: '/tips/mirror' },
        { text: 'Per-user Config', link: '/tips/config' },
        { text: 'Remote Cache', link: '/tips/cache' },
        { text: 'envd Contexts', link: '/tips/context' },
        { text: 'CI/CD Integration', link: '/tips/ci' },
        { text: 'Multi-target Build', link: '/tips/multitarget' },
        { text: 'envd vs. other software', link: '/tips/comparison' }
      ]
    },
    {
      text: 'Community',
      collapsible: true,
      items: [
        { text: 'Contributing to envd', link: '/community/contributing' },
        { text: 'Development Tutorial', link: '/community/development' },
        { text: 'Roadmap', link: '/community/roadmap' },
      ]
    },
  ],
}
