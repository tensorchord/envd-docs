import type { DefaultTheme } from "vitepress";
import apiJsonSidebar from "./apiSidebar.zh.json";

export const apiSidebarZh: DefaultTheme.Sidebar = {
  "/zh/api/": [
    {
      text: "envd CLI",
      collapsed: true,
      items: [{ text: "CLI references", link: "/zh/api/cli/cli" }],
    },
    apiJsonSidebar,
  ],
};
