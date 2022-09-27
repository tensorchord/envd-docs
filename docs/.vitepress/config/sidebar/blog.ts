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
      ]
    }
  ],
}
