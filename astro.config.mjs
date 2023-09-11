import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

// https://astro.build/config
export default defineConfig({
  integrations: [
    starlight({
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
