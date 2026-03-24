import type { Meta, StoryObj } from '@storybook/web-components';
import '../../../packages/components/src/icon';

const meta: Meta = {
  title: 'Components/Icon',
  component: 'nds-icon',
  args: {
    name: 'home',
    variant: 'filled',
    size: 'lg',
    color: '#525252'
  },
  argTypes: {
    name: { control: 'text' },
    variant: { control: 'select', options: ['filled', 'outlined', 'round', 'sharp', 'two-tone'] },
    size: { control: 'select', options: ['sm', 'md', 'lg', 'xl'] },
    color: { control: 'color' }
  }
};

export default meta;

type Story = StoryObj<{
  name: string;
  variant: string;
  size: string;
  color: string;
}>;

export const Playground: Story = {
  render: (args) => {
    const el = document.createElement('nds-icon');
    el.setAttribute('variant', args.variant);
    el.setAttribute('size', args.size);
    el.setAttribute('color', args.color);
    el.textContent = args.name;
    return el;
  }
};

