import type { DefaultTheme } from 'vitepress'

export const blogSidebar: DefaultTheme.Sidebar = {
  '/blog/': [
    {
      text: 'Blog',
      items: [
        // if you add a new blog post, add it to the sidebar here
        // eg: { text: 'Blog', link: '/blog/post1' },
        { text: 'Develop in the Kubernetes cluster', link: '/blog/envd-server.md' },
        { text: 'TensorChord: 2022 in Review', link: '/blog/2022' },
        { text: 'PyCon China 2022 envd sharing', link: '/blog/pycon2022.md' },
        { text: '5 minutes to run your ML/AI environment on your remote machine', link: '/blog/envd-on-remote-serve' },
        { text: 'envd Is Participating Hacktoberfest!', link: '/blog/hacktoberfest' },
        { text: 'Machine Learning Environment Should Be Easy', link: '/blog/ml-env' },
      ]
    }
  ],
}
