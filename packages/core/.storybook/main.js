/** @type { import('@storybook/web-components-vite').StorybookConfig } */
const config = {
  stories: ['../components/**/*.stories.@(js|jsx|ts|tsx)'],
  addons: ['@storybook/addon-essentials', '@storybook/addon-a11y'],
  framework: {
    name: '@storybook/web-components-vite',
    options: {},
  },
  docs: {
    autodocs: 'tag',
  },
  viteFinal: (config, { configType }) => {
    config.server = config.server || {};
    config.server.fs = config.server.fs || {};
    // Allow loading tokens from packages/tokens (sibling of core)
    config.server.fs.allow = ['..', ...(config.server.fs.allow || [])];
    return config;
  },
};

export default config;
