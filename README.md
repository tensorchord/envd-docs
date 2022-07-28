<div align="center">
<h1>envd-docs</h1>
</div>

<p align=center>
<a href="https://discord.gg/KqswhpVgdU"><img alt="discord invitation link" src="https://img.shields.io/discord/974584200327991326?label=discord&style=social"></a>
<a href="https://app.netlify.com/sites/envd/deploys"><img alt="netlify status" src="https://api.netlify.com/api/v1/badges/535ba0bd-b9fa-43b4-a8b2-ce2fbfa3a424/deploy-status"></a>
</p>

This website is built using [VitePress](https://vitepress.vuejs.org/), Vite & Vue Powered Static Site Generator.

### Installation

```shell
npm i -g pnpm
pnpm i
```

### Local Development

```shell
pnpm docs:dev
```

This command starts a local development server and opens up a browser window. Most changes are reflected live without having to restart the server.

### Build

```shell
pnpm docs:build
```

This command generates static content into the `build` directory and can be served using any static contents hosting service.

### Tips

Recommended to read the following part before you start to contribute the docs.

- Chinese docs is under `/docs/zh`
- VitePress markdown features [VitePress markdown](https://vitepress.vuejs.org/guide/markdown.html)
- When you add new file to the docs, please add config of sidebar menu in `/docs/vitepress/config/sidebar.ts`

### Custom title for code block

This feature will be offfical supported in the future.
as a workaround, you can use the following syntax:
```vue

<custom-title title="index.ts">

Your codeblock

</custom-title>

```