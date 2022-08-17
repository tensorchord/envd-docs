import type { DefaultTheme } from 'vitepress'
import apiJsonSidebar from "./apiSidebar.json"

export const apiSidebar: DefaultTheme.Sidebar = {
  '/api/': [
    {
      text: 'envd CLI',
      collapsible: true,
      items: [
        { text: 'CLI references', link: '/api/cli/cli' },
      ]
    },
    apiJsonSidebar
  ],
}
