import {lightCode, darkCode} from './src/prism/themes';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

// Runs in Node at build time -- no browser APIs here.

const repoUrl = 'https://github.com/TsumTsumScripts/tsum-tsum-script';

// The GAP community server: support and discussion for the script live there.
// One place to change if the invite is ever reissued.
const discordUrl = 'https://discord.gg/KH3MZWxaMU';

const config: Config = {
  title: 'Tsum Tsum Script',
  tagline: 'An auto-player for Disney Tsum Tsum, running on General Automation Platform',
  favicon: 'img/favicon.svg',

  future: {
    v4: true,
  },

  // GitHub Pages on a custom domain, so the site is served from the root.
  url: 'https://tsumtsum.gapapp.app',
  baseUrl: '/',
  organizationName: 'TsumTsumScripts',
  projectName: 'tsum-tsum-website',
  trailingSlash: false,

  // A broken link is a build failure, not a warning.
  onBrokenLinks: 'throw',
  onBrokenAnchors: 'throw',
  markdown: {
    mermaid: true,
    hooks: {
      onBrokenMarkdownLinks: 'throw',
    },
  },

  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  customFields: {discordUrl, repoUrl},

  stylesheets: [
    'https://fonts.googleapis.com/css2?family=Caprasimo&family=Figtree:wght@400;600;700;800&display=swap',
  ],

  plugins: ['./plugins/features-routes.js'],

  themes: ['@docusaurus/theme-mermaid', '@saucelabs/theme-github-codeblock'],

  presets: [
    [
      'classic',
      {
        docs: {
          path: 'docs',
          routeBasePath: 'docs',
          sidebarPath: './sidebars.ts',
          editUrl: 'https://github.com/TsumTsumScripts/tsum-tsum-website/tree/main/',
          showLastUpdateTime: false,
        },
        blog: false,
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    colorMode: {
      respectPrefersColorScheme: true,
    },
    docs: {
      sidebar: {
        hideable: true,
        autoCollapseCategories: true,
      },
    },
    navbar: {
      title: 'Tsum Tsum Script',
      logo: {
        alt: 'Tsum Tsum Script',
        src: 'img/logo.svg',
      },
      items: [
        {to: '/features', label: 'Features', position: 'left', activeBaseRegex: '^/features'},
        {to: '/changelog', label: 'Changelog', position: 'left'},
        {to: '/starter', label: 'Starter tool', position: 'left'},
        {type: 'docSidebar', sidebarId: 'docs', position: 'left', label: 'Docs'},
        {href: discordUrl, label: 'Discord', position: 'right', className: 'discord-link'},
        {href: repoUrl, label: 'GitHub', position: 'right'},
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Community',
          items: [
            {label: 'Discord (support and discussion)', href: discordUrl, className: 'discord-link'},
            {label: 'GitHub', href: repoUrl},
            {label: 'General Automation Platform', href: 'https://gapapp.app'},
          ],
        },
        {
          title: 'The script',
          items: [
            {label: 'Features', to: '/features'},
            {label: 'Changelog', to: '/changelog'},
            {label: 'Starter tool', to: '/starter'},
          ],
        },
        {
          title: 'Contributing',
          items: [
            {label: 'What this is', to: '/docs/getting-started/what-this-is'},
            {label: 'Add a skill', to: '/docs/guides/add-a-skill'},
            {label: 'Your own library source', to: '/docs/publishing/your-own-library-source'},
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} Thi Nguyen. Apache-2.0.`,
    },
    prism: {
      theme: lightCode,
      darkTheme: darkCode,
      additionalLanguages: ['bash', 'powershell', 'json'],
    },
    mermaid: {
      theme: {light: 'neutral', dark: 'dark'},
    },
    tableOfContents: {
      minHeadingLevel: 2,
      maxHeadingLevel: 4,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
