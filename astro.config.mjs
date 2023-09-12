import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

// https://astro.build/config
export default defineConfig({
  integrations: [
    starlight({
      head: [
        {
          tag: 'link',
          attrs: {
            rel: "apple-touch-icon" ,
            sizes: "180x180" ,
            href: "/apple-touch-icon.png"
          },
        },
        {
          tag: 'link',
          attrs: {
            rel: "icon" ,
            type: "image/png" ,
            sizes: "32x32" ,
            href: "/favicon-32x32.png"
          },
        },
        {
          tag: 'link',
          attrs: {
            rel: "icon" ,
            type: "image/png" ,
            sizes: "16x16" ,
            href: "/favicon-16x16.png"
          },
        },
        {
          tag: 'link',
          attrs: {
            rel: "manifest" ,
            href: "/site.webmanifest"
          },
        },
        {
          tag: 'link',
          attrs: {
            rel: "mask-icon" ,
            href: "/safari-pinned-tab.svg" ,
            color: "#5bbad5"
          },
        },
        {
          tag: 'meta',
          attrs: {
            name: "msapplication-TileColor",
            content: "#ffffff",
          },
        },
        {
          tag: 'meta',
          attrs: {
            name: "theme-color",
            content: "#ffffff",
          },
        },
        {
          tag: 'script',
          attrs: {
            src: 'https://cdn.usefathom.com/script.js',
            'data-site': 'JJDJCMHG',
            'defer': true,
          },
        }
      ],
      title: 'zsh-test-runner',
      social: {
        github: 'https://github.com/olets/zsh-test-runner',
      },
      tableOfContents: {
        minHeadingLevel: 2,
        maxHeadingLevel: 4,
      },
      sidebar: [
        {
          label: 'Introduction',
          link: '/',
        },
        {
          label: 'Installation',
          link: '/installation',
        },
        {
          label: 'Usage',
          items: [
            {
              label: 'Basics',
              link: '/usage/basics',
            },
            {
              label: 'Running Test Suites',
              link: '/usage/test-suites',
            },
            {
              label: 'Logging results to a file',
              link: '/usage/logging',
            },
          ],
        },
        {
          label: 'Reference',
          items: [
            {
              label: 'Commands',
              link: '/reference/commands',
            },
            {
              label: 'Configuration',
              link: '/reference/configuration',
            },
            {
              label: 'Exported Variables',
              link: '/reference/exported-variables',
            },
          ],
        },
        {
          label: 'Contributing',
          link: '/contributing',
        },
        {
          label: 'Changelog',
          link: '/changelog',
        },
        {
          label: 'License',
          link: '/license',
        },
      ],
    }),
  ],
});
