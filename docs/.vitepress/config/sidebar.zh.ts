import type { DefaultTheme } from "vitepress";
import { apiSidebarZh } from "./sidebar/api.zh";
import { blogSidebarZh } from "./sidebar/blog.zh";
import { mainSidebarZh } from "./sidebar/main.zh";

export const sidebarZh: DefaultTheme.Sidebar = {
  ...blogSidebarZh,
  ...apiSidebarZh,
  ...mainSidebarZh,
};
