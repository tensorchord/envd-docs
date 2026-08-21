import type { DefaultTheme } from "vitepress";

export const mainSidebarZh: DefaultTheme.Sidebar = {
  "/zh/": [
    {
      text: "开始了解",
      collapsed: true,
      items: [
        { text: "快速开始", link: "/zh/guide/getting-started" },
        { text: "构建你的开发环境", link: "/zh/guide/build-envd" },
        { text: "连接你的开发环境", link: "/zh/guide/ide" },
        { text: "envd 核心概念", link: "/zh/guide/concepts" },
        { text: "模块化你的构建", link: "/zh/guide/modularize" },
        { text: "升级到 v1", link: "/zh/guide/v1" },
      ],
    },
    {
      text: "管理 envd 环境",
      collapsed: true,
      items: [
        { text: "利用软件镜像源更快地构建环境", link: "/zh/envs/mirror" },
        { text: "用户相关配置", link: "/zh/envs/config" },
        { text: "多目标构建", link: "/zh/envs/multitarget" },
        { text: "设置实验监控", link: "/zh/envs/monitoring" },
      ],
    },
    {
      text: "在团队中使用 envd",
      collapsed: true,
      items: [
        { text: "总览", link: "/zh/teams/overview" },
        {
          text: "在 Kubernetes 上使用 envd (试验性)",
          link: "/zh/teams/kubernetes",
        },
        { text: "CI/CD 集成", link: "/zh/teams/ci" },
        { text: "envd Contexts 上下文", link: "/zh/teams/context" },
        { text: "Remote Cache（高级特性）", link: "/zh/teams/cache" },
      ],
    },
    {
      text: "编程语言",
      collapsed: true,
      items: [
        { text: "Python 语言", link: "/zh/lang/python" },
        { text: "Julia 语言", link: "/zh/lang/julia" },
        { text: "R 语言", link: "/zh/lang/r" },
      ],
    },
    {
      text: "社区",
      collapsed: true,
      items: [
        { text: "加入社区", link: "/zh/community/community" },
        { text: "贡献 envd", link: "/zh/community/contributing" },
        { text: "路线图", link: "/zh/community/roadmap" },
      ],
    },
    {
      text: "开发者",
      collapsed: true,
      items: [
        { text: "开发教程", link: "/zh/developers/development" },
        { text: "envd-server", link: "/zh/developers/kubernetes" },
      ],
    },
    {
      text: "常见问题",
      collapsed: true,
      items: [
        { text: "为何选择 envd", link: "/zh/faq/why" },
        { text: "envd 和其他工具的比较", link: "/zh/faq/comparison" },
      ],
    },
    {
      text: "其他",
      collapsed: true,
      items: [{ text: "Telemetry", link: "/zh/misc/telemetry" }],
    },
  ],
};
