import type { DefaultTheme } from 'vitepress'

export const zhSidebar: DefaultTheme.Sidebar = {
  '/zh/': [
    {
      text: '开始了解',
      collapsible: true,
      items: [
        { text: '快速开始', link: '/zh/guide/getting-started' },
        { text: '构建你的开发环境', link: '/zh/guide/build-envd' },
        { text: '连接你的开发环境', link: '/zh/guide/ide' },
        { text: '为何选择 envd', link: '/zh/guide/why' },
        { text: 'envd 核心概念', link: '/zh/guide/concepts' },
      ],
    },
    {
      text: '编程语言',
      collapsible: true,
      items: [
        { text: 'Python', link: '/zh/lang/python' },
        { text: 'Julia', link: '/zh/lang/julia' },
        { text: 'R', link: '/zh/lang/r' },
      ]
    },
    {
      text: '技巧和提示',
      collapsible: true,
      items: [
        { text: '利用软件镜像源更快地构建环境', link: '/zh/tips/mirror' },
        { text: '用户相关配置', link: '/zh/tips/config' },
        { text: 'Remote Cache', link: '/zh/tips/cache' },
        { text: 'envd Contexts', link: '/zh/tips/context' },
        { text: 'CI/CD 集成', link: '/zh/tips/ci' },
        { text: '多目标构建', link: '/zh/tips/multitarget' },
        { text: '设置实验监控', link: '/zh/tips/monitoring' },
        { text: 'envd 和其他工具的比较', link: '/zh/tips/comparison' }
      ]
    },
    {
      text: 'API 文档',
      collapsible: true,
      items: [
        { text: 'Global Functions', link: '/zh/api/global functions' },
        { text: 'Config', link: '/zh/api/config' },
        { text: 'Install', link: '/zh/api/install' },
      ]
    },
    {
      text: 'envd CLI 文档',
      collapsible: true,
      items: [
        { text: 'envd CLI Reference', link: '/zh/cli' },
      ]
    },
    {
      text: '社区',
      collapsible: true,
      items: [
        { text: '贡献 envd', link: '/zh/community/contributing' },
        { text: '开发教程', link: '/zh/community/development' },
        { text: '路线图', link: '/zh/community/roadmap' },
      ]
    },
  ],
}
