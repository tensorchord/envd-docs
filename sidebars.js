/**
 * Creating a sidebar enables you to:
 - create an ordered group of docs
 - render a sidebar for each doc of that group
 - provide next/previous navigation

 The sidebars can be generated from the filesystem, or explicitly defined here.

 Create as many sidebars as you want.
 */

// @ts-check

/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
const sidebars = {
  // By default, Docusaurus generates a sidebar from the docs folder structure
  // tutorialSidebar: [{type: 'autogenerated', dirName: '.'}],

  // But you can create a sidebar manually
  tutorialSidebar: [
    {
      type: 'category',
      label: 'Getting Started',
      items: ['get-started', 'why/why', 'build-envd/build-envd'],
      collapsed: false,
    },
    {
      type: 'category',
      label: 'API Reference',
      items: ['api/config', 'api/install', 'api/universe'],
    },
    'cli',
    {
      type: 'category',
      label: 'Community',
      items: ['community/contributing', 'community/development'],
      collapsed: false,
    },
    {
      type: 'link',
      label: '💬 Chat with us on Discord',
      href: 'https://discord.gg/KqswhpVgdU',
    },
  ],
};

module.exports = sidebars;
