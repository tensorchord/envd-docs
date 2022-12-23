import type { DefaultTheme } from 'vitepress'

export const blogSidebar: DefaultTheme.Sidebar = {
  '/blog/': [
    {
      text: 'Blog',
      items: [
        // if you add a new blog post, add it to the sidebar here
        // eg: { text: 'Blog', link: '/blog/post1' },
        { text: 'Machine Learning Environment Should Be Easy', link: '/blog/ml-env' },
        { text: 'envd Is Participating Hacktoberfest!', link: '/blog/hacktoberfest' },
        { text: '5 minutes to run your ML/AI environment on your remote machine', link: '/blog/envd-on-remote-serve' },
        { text: 'PyCon China 2022 envd sharing', link: '/blog/pycon2022.md' }
      ]
    }
  ],
}
