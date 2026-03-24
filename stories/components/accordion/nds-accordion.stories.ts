import type { Meta, StoryObj } from '@storybook/web-components';
import '../../../packages/components/src/accordion';

const meta: Meta = {
  title: 'Components/Accordion',
  component: 'nds-accordion',
  args: {
    title: 'This is panel header',
    content: 'This is a placeholder text.',
    linkText: 'Hyperlink',
    linkHref: '#',
    size: 'medium',
    open: false,
    disabled: false
  },
  argTypes: {
    title: { control: 'text' },
    content: { control: 'text' },
    linkText: { control: 'text' },
    linkHref: { control: 'text' },
    size: { control: 'select', options: ['small', 'medium', 'large'] },
    open: { control: 'boolean' },
    disabled: { control: 'boolean' }
  }
};

export default meta;

type Story = StoryObj<{
  title: string;
  content: string;
  linkText: string;
  linkHref: string;
  size: string;
  open: boolean;
  disabled: boolean;
}>;

function renderAccordion(args: {
  title: string;
  content: string;
  linkText: string;
  linkHref: string;
  size: string;
  open: boolean;
  disabled: boolean;
}) {
  const wrapper = document.createElement('div');
  wrapper.style.cssText = 'width: min(760px, 100%); max-width: 100%; box-sizing: border-box;';

  const el = document.createElement('nds-accordion');
  el.setAttribute('title', args.title || 'This is panel header');
  el.setAttribute('size', args.size || 'medium');
  if (args.linkText) el.setAttribute('link-text', args.linkText);
  if (args.linkHref) el.setAttribute('link-href', args.linkHref);
  if (args.open) el.setAttribute('open', 'true');
  if (args.disabled) el.setAttribute('disabled', 'true');
  el.textContent = args.content || '';
  wrapper.appendChild(el);
  return wrapper;
}

export const Playground: Story = {
  render: (args) => renderAccordion(args)
};

const SIZES = ['small', 'medium', 'large'] as const;

export const Sizes: Story = {
  render: () => {
    const root = document.createElement('div');
    root.style.cssText =
      'font-family: var(--font-family-base, DM Sans), system-ui, sans-serif; width: min(1100px, 96vw);';

    const panelText = 'This is a placeholder text.';

    SIZES.forEach((size) => {
      const sizeHeading = document.createElement('h3');
      sizeHeading.textContent = `Size: ${size}`;
      sizeHeading.style.cssText = 'font-size: 14px; margin: 22px 0 12px;';
      root.appendChild(sizeHeading);

      const grid = document.createElement('div');
      grid.style.cssText = 'display:grid; grid-template-columns:repeat(auto-fit,minmax(240px,1fr)); gap:12px;';
      const card = document.createElement('div');
      card.style.cssText = 'padding:10px; border:1px dashed rgba(125,125,125,0.35); border-radius:8px;';

      const closed = document.createElement('nds-accordion');
      closed.setAttribute('title', 'This is panel header');
      closed.setAttribute('link-text', 'Hyperlink');
      closed.setAttribute('link-href', '#');
      closed.setAttribute('size', size);
      closed.textContent = panelText;
      card.appendChild(closed);

      const spacer = document.createElement('div');
      spacer.style.height = '10px';
      card.appendChild(spacer);

      const open = document.createElement('nds-accordion');
      open.setAttribute('title', 'This is panel header');
      open.setAttribute('link-text', 'Hyperlink');
      open.setAttribute('link-href', '#');
      open.setAttribute('size', size);
      open.setAttribute('open', 'true');
      open.textContent = panelText;
      card.appendChild(open);

      grid.appendChild(card);

      root.appendChild(grid);
    });

    return root;
  }
};

type GroupStory = StoryObj<{
  mode: 'single' | 'multi';
  size: 'small' | 'medium' | 'large';
}>;

export const Group: GroupStory = {
  args: {
    mode: 'single',
    size: 'medium'
  },
  argTypes: {
    mode: { control: 'radio', options: ['single', 'multi'] },
    size: { control: 'select', options: ['small', 'medium', 'large'] }
  },
  render: (args) => {
    const wrapper = document.createElement('div');
    wrapper.style.cssText = 'width: min(760px, 100%); max-width: 100%; box-sizing: border-box;';

    const group = document.createElement('nds-accordion-group');
    group.setAttribute('mode', args.mode || 'single');

    const first = document.createElement('nds-accordion');
    first.setAttribute('title', 'This is panel header');
    first.setAttribute('link-text', 'Hyperlink');
    first.setAttribute('link-href', '#');
    first.setAttribute('size', args.size || 'medium');
    first.setAttribute('open', 'true');
    first.textContent = 'This is a placeholder text.';

    const second = document.createElement('nds-accordion');
    second.setAttribute('title', 'This is panel header');
    second.setAttribute('link-text', 'Hyperlink');
    second.setAttribute('link-href', '#');
    second.setAttribute('size', args.size || 'medium');
    second.textContent = 'This is a placeholder text.';

    const third = document.createElement('nds-accordion');
    third.setAttribute('title', 'This is panel header');
    third.setAttribute('size', args.size || 'medium');
    third.textContent = 'This is a placeholder text.';

    group.appendChild(first);
    group.appendChild(second);
    group.appendChild(third);
    wrapper.appendChild(group);
    return wrapper;
  }
};

