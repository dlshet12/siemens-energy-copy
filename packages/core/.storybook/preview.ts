import type { Preview } from '@storybook/web-components';
// Relative path so Vite can inline tokens (run npm run build:tokens first)
import tokensCss from '../../tokens/build/tokens.css?raw';

const style = document.createElement('style');
style.textContent = tokensCss;
document.documentElement.prepend(style);

const preview: Preview = {
  parameters: {
    controls: { expanded: true },
    docs: {
      description: {
        component: 'Web Components from @ui-platform/core. Use attributes, slots, and custom events. Framework-agnostic.',
      },
    },
  },
};

export default preview;
