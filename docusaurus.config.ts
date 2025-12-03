import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

const config: Config = {
  title: 'COLY',
  tagline: 'Code Online, Learn Yourself - Software Engineering and DevOps courses from an experienced Senior Technical Lead',
  favicon: 'img/favicon.ico',

  // Future flags, see https://docusaurus.io/docs/api/docusaurus-config#future
  future: {
    v4: true, // Improve compatibility with the upcoming Docusaurus v4
  },

  // Set the production url of your site here
  url: 'https://coly.uk',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'danielpomfret', // Usually your GitHub org/user name.
  projectName: 'coly', // Usually your repo name.

  onBrokenLinks: 'throw',

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
          routeBasePath: 'courses', // Change /docs to /courses
        },
        blog: false, // Disable blog for now
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  themes: [
    [
      require.resolve('@easyops-cn/docusaurus-search-local'),
      {
        hashed: true,
        language: ['en'],
        indexDocs: true,
        indexBlog: false,
        indexPages: false,
        docsRouteBasePath: '/courses',
        highlightSearchTermsOnTargetPage: true,
      },
    ],
  ],

  themeConfig: {
    // Replace with your project's social card
    image: 'img/docusaurus-social-card.jpg',
    colorMode: {
      respectPrefersColorScheme: true,
    },
    navbar: {
      title: 'COLY',
      logo: {
        alt: 'COLY Logo',
        src: 'img/coly.png',
        className: 'navbar-logo',
      },
      items: [
        {
          type: 'dropdown',
          label: 'Courses',
          position: 'left',
          to: '/courses/intro',
          items: [
            {
              to: '/courses/category/fundamentals',
              label: 'Fundamentals',
            },
            {
              to: '/courses/category/test-driven-development',
              label: 'Software Engineering',
            },
            {
              to: '/courses/category/apis',
              label: 'APIs',
            },
            {
              to: '/courses/category/devops',
              label: 'DevOps',
            },
          ],
        },
      ],
      hideOnScroll: false,
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Learning Paths',
          items: [
            {
              label: 'Getting Started',
              to: '/courses/intro',
            },
            {
              label: 'Fundamentals',
              to: '/courses/category/fundamentals',
            },
            {
              label: 'Test Driven Development',
              to: '/courses/category/test-driven-development',
            },
            {              
              label: 'APIs',
              to: '/courses/category/apis',
            },
            {
              label: 'DevOps',
              to: '/courses/category/devops',
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} Daniel Pomfret. Built with Docusaurus.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
