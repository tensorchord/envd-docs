import { defineConfig } from "vitepress";
import footnote from "markdown-it-footnote";
import { sidebar } from "./config/sidebar";
import { sidebarZh } from "./config/sidebar.zh";
import { SitemapStream } from "sitemap";
import { createWriteStream } from "node:fs";
import { resolve } from "node:path";
import { blogSidebar } from "./config/sidebar/blog";
import { blogSidebarZh } from "./config/sidebar/blog.zh";

// This links array is used to temporarily store all page link information, in order to generate sitemap.
const links: any[] = [];
const og = "https://og.tensorchord.ai/api/og?title=";

// The site can be hosted at the domain root (Netlify, custom domain) or under a
// sub-path like GitHub Pages project sites (`https://<user>.github.io/<repo>/`).
// GitHub Pages CI sets `BASE=/envd-docs/`; leave unset for root deployments.
const base = (process.env.BASE || "/")
  .replace(/^([^/])/, "/$1")
  .replace(/\/?$/, "/");
const siteHostName = process.env.SITE_URL || "https://envd.tensorchord.ai/";
const ogUrl = (relativePath: string) =>
  `${siteHostName}${relativePath.replace(/\.md$/, ".html")}`;

export default defineConfig({
  lang: "en-US",
  base,
  title: "envd",
  lastUpdated: true,

  locales: {
    root: {
      label: "English",
      lang: "en",
    },
    zh: {
      label: "简体中文",
      lang: "zh",
      markdown: {
        codeCopyButton: {
          tooltipText: "复制代码",
          copiedText: "已复制",
        },
        container: {
          tipLabel: "提示",
          warningLabel: "警告",
          dangerLabel: "危险",
          detailsLabel: "详细信息",
        },
      },
      themeConfig: {
        sidebar: sidebarZh,
        nav: [
          // add the default post link here
          { text: "开始了解", link: "/zh/guide/getting-started" },
          { text: "API", link: "/zh/api/cli/cli", activeMatch: "/zh/api/" },
          // Use latest blog as the default one
          // @ts-ignore
          {
            text: "博客",
            link: blogSidebarZh["/zh/blog/"][0].items[0].link,
            activeMatch: "/zh/blog/",
          },
          {
            text: "版本历史",
            link: "https://github.com/tensorchord/envd/releases",
          },
        ],
        editLink: {
          pattern:
            "https://github.com/tensorchord/envd-docs/tree/main/docs/:path",
          text: "对本页提出修改建议",
        },
        lastUpdatedText: "最后更新",
        docFooter: {
          next: "下一页",
          prev: "上一页",
        },
        footer: {
          message:
            "Released under the Apache-2.0 License. Built with VitePress.",
          copyright: "Copyright © 2022 TensorChord, Inc.",
        },
      },
    },
  },

  head: [
    // Google Analytics
    [
      "script",
      {
        async: "true",
        src: "https://www.googletagmanager.com/gtag/js?id=G-HRD26FG2QW",
      },
    ],
    [
      "script",
      {},
      "window.dataLayer = window.dataLayer || [];\nfunction gtag(){dataLayer.push(arguments);}\ngtag('js', new Date());\ngtag('config', 'G-HRD26FG2QW');",
    ],

    ["link", { rel: "icon", href: `${base}logo_light.svg`, alt: "envd" }],
    [
      "meta",
      {
        name: "keywords",
        content:
          "envd, AI, ML, development environment, data science, engineering teams, No Docker, only Python, Jupyter, VSCode, save time, Local & cloud, Repeatable builds, reproducible results",
      },
    ],
    ["meta", { property: "og:title", content: "envd" }],
    [
      "meta",
      {
        property: "og:description",
        content:
          "A machine learning development environment for data science and AI/ML engineering teams.",
      },
    ],
    ["meta", { property: "og:url", content: siteHostName }],
    ["meta", { name: "twitter:title", content: "envd" }],
    [
      "meta",
      { name: "twitter:description", content: "AI/ML Development Environment" },
    ],
    ["meta", { name: "twitter:card", content: "summary_large_image" }],
    ["meta", { name: "twitter:site", content: "@TensorChord" }],
  ],

  themeConfig: {
    search: {
      provider: "local",
    },
    logo: {
      light: `${base}logo_light.svg`,
      dark: `${base}logo_dark.svg`,
    },

    socialLinks: [
      { icon: "github", link: "https://github.com/tensorchord/envd" },
      { icon: "twitter", link: "https://twitter.com/TensorChord" },
      { icon: "discord", link: "https://discord.gg/KqswhpVgdU" },
    ],

    sidebar,
    nav: [
      // add the default post link here
      { text: "Get Started", link: "/guide/getting-started" },
      { text: "Reference", link: "/api/cli/cli", activeMatch: "/api/" },
      // Use latest blog as the default one
      // @ts-ignore
      {
        text: "Blog",
        link: blogSidebar["/blog/"][0].items[0].link,
        activeMatch: "/blog/",
      },
      {
        text: "Releases",
        link: "https://github.com/tensorchord/envd/releases",
      },
    ],
    editLink: {
      pattern: "https://github.com/tensorchord/envd-docs/tree/main/docs/:path",
      text: "Edit this page",
    },

    footer: {
      message: "Released under the Apache-2.0 License. Built with VitePress.",
      copyright:
        'Copyright © 2022 TensorChord, Inc. <a href="https://www.netlify.com"> <img style="margin: 0 auto" src="https://www.netlify.com/v3/img/components/netlify-color-accent.svg" alt="Deploys by Netlify" /></a>',
    },
  },

  markdown: {
    config: (md) => {
      md.use(footnote);
    },
  },

  transformHead: async (ctx) => {
    return [
      ["meta", { property: "og:title", content: ctx.pageData.title }],
      [
        "meta",
        { property: "og:description", content: ctx.pageData.description },
      ],
      [
        "meta",
        { property: "og:url", content: ogUrl(ctx.pageData.relativePath) },
      ],
      [
        "meta",
        { property: "og:image", content: encodeURI(og + ctx.pageData.title) },
      ],
      ["meta", { name: "twitter:title", content: ctx.pageData.title }],
      [
        "meta",
        { name: "twitter:description", content: ctx.pageData.description },
      ],
      ["meta", { name: "twitter:card", content: "summary_large_image" }],
      ["meta", { name: "twitter:site", content: "@TensorChord" }],
    ];
  },

  transformHtml: (_, id, { pageData }) => {
    if (!/[\\/]404\.html$/.test(id))
      links.push({
        url: pageData.relativePath.replace(/\.md$/, ".html"),
        lastmod: pageData.lastUpdated,
      });
  },

  transformPageData: (pageData) => {
    return {
      ...pageData,
      description:
        "`envd` (ɪnˈvdɪ) is a command-line tool that helps you create the container-based development environment for code agents.",
    };
  },

  buildEnd: async ({ outDir }) => {
    const sitemap = new SitemapStream({
      hostname: siteHostName,
    });
    const writeStream = createWriteStream(resolve(outDir, "sitemap.xml"));
    sitemap.pipe(writeStream);
    links.forEach((link) => sitemap.write(link));
    sitemap.end();
    await new Promise((r) => writeStream.on("finish", r));
  },
});
