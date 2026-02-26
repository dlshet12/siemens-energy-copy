import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import { UiButton } from './button.js';

/**
 * Primary action button. Use for the main action on a screen (e.g. Submit, Save).
 * Use **secondary** for less prominent actions.
 */
const meta: Meta<typeof UiButton> = {
  title: 'Core/Button',
  component: 'ui-button',
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary'],
      description: 'Visual style; maps to design tokens.',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Size; spacing and typography from tokens.',
    },
    disabled: {
      control: 'boolean',
      description: 'When true, button is non-interactive and not submitted with forms.',
    },
    fullWidth: {
      control: 'boolean',
      description: 'Button stretches to 100% width of container.',
    },
    type: {
      control: 'select',
      options: ['button', 'submit', 'reset'],
      description: 'Native button type for forms.',
    },
  },
  parameters: {
    docs: {
      description: {
        component: `
## Usage
\`\`\`html
<ui-button variant="primary" size="md">Submit</ui-button>
\`\`\`

## Events
- \`ui-click\`: fired when the button is activated (click or Enter/Space). \`detail.originalEvent\` is the native event.

## Accessibility
- Uses native \`<button>\`; no extra ARIA required for basic use.
- \`aria-disabled="true"\` when disabled.
- Focus visible ring uses \`--ui-color-border-focus\` token.
- Keyboard: Enter and Space activate (native behavior).

## Do / Don't
- **Do** use primary for one main action per view.
- **Do** use secondary for cancel or alternative actions.
- **Don't** use buttons for navigation (use links).
- **Don't** nest interactive content inside the default slot.
        `,
      },
    },
    a11y: {
      config: {},
      options: {},
    },
  },
};

export default meta;

type Story = StoryObj<typeof UiButton>;

export const Primary: Story = {
  args: {
    variant: 'primary',
    size: 'md',
    disabled: false,
    fullWidth: false,
  },
  render: (args) => html`
    <ui-button
      variant=${args.variant}
      size=${args.size}
      ?disabled=${args.disabled}
      ?full-width=${args.fullWidth}
      type=${args.type}
      @ui-click=${() => console.log('ui-click')}
    >
      Submit
    </ui-button>
  `,
};

export const Secondary: Story = {
  args: {
    variant: 'secondary',
    size: 'md',
  },
  render: (args) => html`
    <ui-button variant=${args.variant} size=${args.size}>Cancel</ui-button>
  `,
};

export const Sizes: Story = {
  render: () => html`
    <div style="display: flex; gap: 1rem; align-items: center; flex-wrap: wrap;">
      <ui-button variant="primary" size="sm">Small</ui-button>
      <ui-button variant="primary" size="md">Medium</ui-button>
      <ui-button variant="primary" size="lg">Large</ui-button>
    </div>
  `,
};

export const Disabled: Story = {
  render: () => html`
    <div style="display: flex; gap: 1rem;">
      <ui-button variant="primary" disabled>Primary disabled</ui-button>
      <ui-button variant="secondary" disabled>Secondary disabled</ui-button>
    </div>
  `,
};

export const FullWidth: Story = {
  render: () => html`
    <div style="max-width: 320px;">
      <ui-button variant="primary" full-width>Full width</ui-button>
    </div>
  `,
};

export const WithSlotContent: Story = {
  render: () => html`
    <ui-button variant="primary" size="md">
      <span style="margin-right: 0.5rem;">✓</span> Save changes
    </ui-button>
  `,
};
