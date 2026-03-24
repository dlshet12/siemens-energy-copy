import type { Preview } from '@storybook/web-components';
import '../packages/tokens/dist/css/tokens.css';
import './preview.css';

const DARK_BG = '#0D0D0D';

const preview: Preview = {
  decorators: [
    (Story, context) => {
      const globals = context.globals || {};
      const bg = globals.backgrounds ?? context.parameters?.backgrounds?.default;
      const isDark =
        bg === DARK_BG ||
        (typeof bg === 'object' && (bg as { value?: string })?.value === DARK_BG) ||
        (typeof bg === 'object' && (bg as { name?: string })?.name === 'dark');
      if (typeof document !== 'undefined') {
        document.documentElement.dataset.theme = isDark ? 'dark' : 'light';
      }
      return Story();
    }
  ],
  parameters: {
    backgrounds: {
      default: 'light',
      values: [
        { name: 'light', value: '#F5F5F5' },
        { name: 'dark', value: '#0D0D0D' }
      ]
    },
    layout: 'centered',
    controls: { expanded: true },
    options: {
      storySort: {
        order: [
          'Foundation',
          ['All Tokens', 'Colors', 'Icons', 'Corner Radius', 'Data Visualization', 'Elevation & Styles', 'Font Size', 'Font Weight', 'Font Family', 'Line Height', 'Grid Layouts', 'Spacing', 'Typography']
        ]
      }
    }
  }
};

export default preview;
