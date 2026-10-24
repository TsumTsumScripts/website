import type {SidebarsConfig} from '@docusaurus/plugin-content-docs';

// The /guides sidebar: how-tos for players, one category per app. The script's own
// pages (features, starter) are linked until it has guides of its own here.
const sidebars: SidebarsConfig = {
  guides: [
    'index',
    {
      type: 'category',
      label: 'Tsum Tsum script',
      collapsed: false,
      items: [
        {type: 'link', label: 'Set up with the starter tool', href: '/starter'},
        'start-from-the-phone',
        {type: 'link', label: 'Features guide', href: '/features'},
      ],
    },
    {
      type: 'category',
      label: 'GAP Companion',
      collapsed: false,
      items: ['companion/connect', 'companion/workflows'],
    },
  ],
};

export default sidebars;
