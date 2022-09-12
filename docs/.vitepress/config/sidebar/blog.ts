import type { DefaultTheme } from 'vitepress'

export const blogSidebar: DefaultTheme.Sidebar = {
  '/blog/': [
    {
      text: 'Blog',
      items: [
        // if you add a new blog post, add it to the sidebar here
        // eg: { text: 'Blog', link: '/blog/post1' },
        { text: 'Welcome', link: '/blog/welcome' },
      ]
    }
  ],
  '/zh/blog/': [
    {
      text: '博客',
      items: [
        { text: '使用 CPU 体验最顶尖的 AI 生成艺术模型', link: 'zh/blog/stable-diffusion-cpu'},
        { text: 'envd: 配置深度学习炼丹环境的新选择', link: 'zh/blog/envd'},
        { text: '如何对深度学习训练进行性能调优？', link: '/zh/blog/metrics-survey' },
        { text: 'TensorChord Tea Hour: Buildkit Internals', link: '/zh/blog/tea-hour-1'},
      ]
    }
  ],
}
