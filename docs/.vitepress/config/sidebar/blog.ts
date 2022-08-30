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
        { text: '如何更好地 Profile 深度学习训练？', link: '/zh/blog/metrics-survey' },
        { text: 'TensorChord Tea Hour: Buildkit Internals', link: '/zh/blog/tea-hour-1'},
      ]
    }
  ],
}
