import type { DefaultTheme } from 'vitepress'

export const mainSidebar: DefaultTheme.Sidebar = {
  '/': [
    {
      text: '开始了解',
      collapsible: true,
      items: [
        { text: '快速开始', link: '/guide/getting-started' },
        { text: '构建你的开发环境', link: '/guide/build-envd' },
        { text: '连接你的开发环境', link: '/guide/ide' },
        { text: 'envd 核心概念', link: '/guide/concepts' },
        { text: '模块化你的构建', link:'/guide/modularize'},
      ],
    },
    {
      text: '管理 envd 环境',
      collapsible: true,
      items: [
        { text: '利用软件镜像源更快地构建环境', link: '/envs/mirror' },
        { text: '用户相关配置', link: '/envs/config' },
        { text: '多目标构建', link: '/envs/multitarget' },
        { text: '设置实验监控', link: '/envs/monitoring' },
      ],
    },
    {
      text: '在团队中使用 envd',
      collapsible: true,
      items: [
        { text: '总览', link: '/teams/overview'},
        { text: '在 Kubernetes 上使用 envd (试验性)', link: '/teams/kubernetes'},
        { text: 'CI/CD 集成', link: '/teams/ci' },
        { text: 'envd Contexts 上下文', link: '/teams/context' },
        { text: 'Remote Cache（高级特性）', link: '/teams/cache' },
      ],
    },
    {
      text: '编程语言',
      collapsible: true,
      items: [
        { text: 'Python 语言', link: '/lang/python' },
        { text: 'Julia 语言', link: '/lang/julia' },
        { text: 'R 语言', link: '/lang/r' },
      ]
    },
    {
      text: '社区',
      collapsible: true,
      items: [
        { text: '加入社区', link: '/community/community' },
        { text: '贡献 envd', link: '/community/contributing' },
        { text: '路线图', link: '/community/roadmap' },
      ]
    },
    {
      text: '开发者',
      collapsible: true,
      items: [
        { text: '开发教程', link: '/developers/development' },
        { text: 'envd-server', link: '/developers/kubernetes' },
      ]
    },
    {
      text: '常见问题',
      collapsible: true,
      items: [
        { text: '为何选择 envd', link: '/faq/why' },
        { text: 'envd 和其他工具的比较', link: '/faq/comparison' },
      ]
    },
    {
      text: '其他',
      collapsible: true,
      items: [
        { text: 'Telemetry', link: '/misc/telemetry' },
      ]
    },
  ],
}
