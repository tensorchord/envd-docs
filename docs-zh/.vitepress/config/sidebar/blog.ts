import type { DefaultTheme } from 'vitepress'

export const blogSidebar: DefaultTheme.Sidebar = {
  '/blog/': [
    {
      text: '博客',
      items: [
        { text: 'TensorChord: 2022 in Review', link: '/blog/2022'},
        { text: 'TensorChord Tea Hour: Cellular Automaton', link: '/blog/tea-hour-2'},
        { text: '2022 年黑客啤酒节 Hacktoberfest 开始，与 envd 社区一起参加！', link: '/blog/hacktoberfest'},
        { text: '使用 CPU 体验最顶尖的 AI 生成艺术模型', link: '/blog/stable-diffusion-cpu'},
        { text: 'envd: 配置深度学习炼丹环境的新选择', link: '/blog/envd'},
        { text: '如何对深度学习训练进行性能调优？', link: '/blog/metrics-survey' },
        { text: 'TensorChord Tea Hour: Buildkit Internals', link: '/blog/tea-hour-1'},
      ]
    }
  ],
}
