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
          link: '/usage',
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
            {
              label: 'Running Test Suites',
              link: '/reference/running-test-suites',
            },
          ],
        },
        {
          label: 'Evolution',
          autogenerate: { directory: 'evolution' },
        },
        {
          label: 'Contributing',
          link: '/contributing',
        },
        {
          label: 'License',
          link: '/license',
        },
      ],
    }),
  ],
});
