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
        { text: 'envd 核心概念', link: '/zh/guide/concepts' },
      ],
    },
    {
      text: '管理 envd 环境',
      collapsible: true,
      items: [
        { text: '利用软件镜像源更快地构建环境', link: '/zh/envs/mirror' },
        { text: '用户相关配置', link: '/zh/envs/config' },
        { text: '多目标构建', link: '/zh/envs/multitarget' },
        { text: '设置实验监控', link: '/zh/envs/monitoring' },
      ],
    },
    {
      text: '在团队中使用 envd',
      collapsible: true,
      items: [
        { text: '总览', link: '/zh/teams/overview'},
        { text: 'CI/CD 集成', link: '/zh/teams/ci' },
        { text: 'envd Contexts 上下文', link: '/zh/teams/context' },
        { text: 'Remote Cache（高级特性）', link: '/zh/teams/cache' },
      ],
    },
    {
      text: '编程语言',
      collapsible: true,
      items: [
        { text: 'Python 语言', link: '/zh/lang/python' },
        { text: 'Julia 语言', link: '/zh/lang/julia' },
        { text: 'R 语言', link: '/zh/lang/r' },
      ]
    },
    {
      text: '常见问题',
      collapsible: true,
      items: [
        { text: '为何选择 envd', link: '/zh/faq/why' },
        { text: 'envd 和其他工具的比较', link: '/zh/faq/comparison' },
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
