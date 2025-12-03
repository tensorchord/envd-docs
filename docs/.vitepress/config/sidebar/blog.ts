import type { DefaultTheme } from 'vitepress'

export const blogSidebar: DefaultTheme.Sidebar = {
  '/blog/': [
    {
      text: 'Blog',
      items: [
        // if you add a new blog post, add it to the sidebar here
        // eg: { text: 'Blog', link: '/blog/post1' },
        { text: 'Why the code agents should run inside the containers', link: '/blog/agent-container' },
        { text: 'Develop in the Kubernetes cluster', link: '/blog/envd-server' },
        { text: 'TensorChord: 2022 in Review', link: '/blog/2022' },
        { text: 'PyCon China 2022 envd sharing', link: '/blog/pycon2022' },
        { text: '5 minutes to run your ML/AI environment on your remote machine', link: '/blog/envd-on-remote-serve' },
        { text: 'envd Is Participating Hacktoberfest!', link: '/blog/hacktoberfest' },
        { text: 'Machine Learning Environment Should Be Easy', link: '/blog/ml-env' },
      ]
    }
  ],
}
