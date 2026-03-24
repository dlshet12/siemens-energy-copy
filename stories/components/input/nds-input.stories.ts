import type { Meta, StoryObj } from '@storybook/web-components';
import '../../../packages/components/src/text-input';

const meta: Meta = {
  title: 'Components/TextInput',
  component: 'nds-input',
  args: {
    label: 'Label',
    placeholder: 'Enter value',
    helper: 'Helper text',
    state: 'default'
  },
  argTypes: {
    label: { control: 'text' },
    placeholder: { control: 'text' },
    helper: { control: 'text' },
    state: { control: 'select', options: ['default', 'error'] }
  }
};

export default meta;

type Story = StoryObj<{
  label: string;
  placeholder: string;
  helper: string;
  state: 'default' | 'error';
}>;

function renderInput(args: { label: string; placeholder: string; helper: string; state: 'default' | 'error' }) {
  const el = document.createElement('nds-input');
  if (args.placeholder) el.setAttribute('placeholder', args.placeholder);
  if (args.state && args.state !== 'default') el.setAttribute('state', args.state);

  const label = document.createElement('span');
  label.slot = 'label';
  label.textContent = args.label || 'Label';

  const helper = document.createElement('span');
  helper.slot = 'helper';
  helper.textContent = args.helper || 'Helper text';

  el.appendChild(label);
  el.appendChild(helper);

  return el;
}

export const Playground: Story = {
  render: (args) => renderInput(args)
};

export const Default: Story = {
  args: {
    state: 'default'
  },
  render: (args) => renderInput(args)
};

export const Error: Story = {
  args: {
    helper: 'Error message',
    state: 'error'
  },
  render: (args) => renderInput(args)
};

