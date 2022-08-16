import type { DefaultTheme } from 'vitepress'

export const apiSidebar: DefaultTheme.Sidebar = {
  '/api/': [
    {
      text: 'envd CLI',
      collapsible: true,
      items: [
        { text: 'CLI references', link: '/api/cli/cli' },
      ]
    },
    {
      text: 'API Reference',
      items: [
        { text: 'Global functions', link: '/api/starlark/global_functions' },
        { text: 'Config functions', link: '/api/starlark/config' },
        { text: 'Install functions', link: '/api/starlark/install' },
      ]
    }
  ],
}
