<div align="center">
<h1>envd-docs</h1>
</div>

<p align=center>
<a href="https://discord.gg/KqswhpVgdU"><img alt="discord invitation link" src="https://img.shields.io/discord/974584200327991326?label=discord&style=social"></a>
<a href="https://app.netlify.com/sites/envd/deploys"><img alt="netlify status" src="https://api.netlify.com/api/v1/badges/535ba0bd-b9fa-43b4-a8b2-ce2fbfa3a424/deploy-status"></a>
</p>

This website is built using [VitePress](https://vitepress.vuejs.org/), Vite & Vue Powered Static Site Generator.

The site is a single VitePress project with built-in i18n:

- English docs live under `docs/` and are served at the site root (`/`).
- Simplified Chinese docs live under `docs/zh/` and are served at `/zh/`.
- Both locales share one config at `docs/.vitepress/config.ts`.

### Installation

```shell
npm i -g pnpm
pnpm i
```

### Local Development

```shell
# dev the site (English at /, Chinese at /zh/)
pnpm dev
```

This command starts a local development server and opens up a browser window. Most changes are reflected live without having to restart the server.

### Build

```shell
# build both locales
pnpm build
```

This command generates static content into `docs/.vitepress/dist` and can be served using any static contents hosting service.

Preview the production build locally:

```shell
pnpm preview
```

### GitHub Pages

The repository deploys to GitHub Pages via `.github/workflows/deploy.yml` on every push to `main`. The workflow builds with `BASE=/envd-docs/` so the site is served from `https://<org>.github.io/envd-docs/`.

To override the deployment URL or base path (e.g. when using a custom domain), set the `SITE_URL` / `BASE` environment variables in the workflow, or pass them to a local build:

```shell
BASE=/my-prefix/ SITE_URL=https://example.com/ pnpm build
```

Remember to select **GitHub Actions** as the source in the repository's _Settings → Pages_.

### Tips

Recommended to read the following part before you start to contribute the docs.

- Chinese docs is under `/docs/zh`, and its sidebar configs are the `*.zh.ts` files under `/docs/.vitepress/config/sidebar/`
- VitePress Markdown features [VitePress Markdown](https://vitepress.vuejs.org/guide/markdown.html)
- When you add new file to the docs, please add config of sidebar menu in `/docs/vitepress/config/sidebar.ts`
- We have enabled [AutoCorrect](https://github.com/huacnlee/autocorrect) to improve copywriting, correct spaces, words, punctuations between CJK. If your PR encounter this kind of problems, please check your PR's check result and fix them.

### Custom title for code block

This feature will be offfical supported in the future.
as a workaround, you can use the following syntax:

```vue
<custom-title title="index.ts">

Your codeblock

</custom-title>
```

### Blog

If you want to write a blog, the following things you need to do

- Add new post under `docs/blog` (English) or `docs/zh/blog` (Chinese) then just write the Markdown file.
- Add new item to `/docs/.vitepress/config/sidebar/blog.ts` (English) or `/docs/.vitepress/config/sidebar/blog.zh.ts` (Chinese).
