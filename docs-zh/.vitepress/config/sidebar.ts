import type { DefaultTheme } from 'vitepress'
import { apiSidebar } from './sidebar/api'
import { blogSidebar } from './sidebar/blog'
import { mainSidebar } from './sidebar/main'

export const sidebar: DefaultTheme.Sidebar = {
  ...blogSidebar,
  ...apiSidebar,
  ...mainSidebar,
}
