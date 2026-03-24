import type { StorybookConfig } from '@storybook/web-components-vite';

const config: StorybookConfig = {
  stories: ['../stories/**/*.stories.@(js|ts)', '../stories/**/*.mdx'],
  addons: ['@storybook/addon-essentials'],
  staticDirs: [{ from: '../docs', to: '/' }],
  framework: {
    name: '@storybook/web-components-vite',
    options: {}
  },
  docs: {
    autodocs: true
  }
};

export default config;
