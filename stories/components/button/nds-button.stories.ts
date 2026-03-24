import type { Meta, StoryObj } from '@storybook/web-components';
import '../../../packages/components/src/button';

const meta: Meta = {
  title: 'Components/Button',
  component: 'nds-button',
  args: {
    variant: 'primary',
    size: 'medium',
    state: 'default',
    disabled: false,
    withIcon: true,
    iconName: 'add',
    label: 'Button'
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'widget-action', 'tertiary', 'destructive']
    },
    size: {
      control: 'select',
      options: ['small', 'medium', 'large']
    },
    state: {
      control: 'select',
      options: ['default', 'hover']
    },
    disabled: { control: 'boolean' },
    withIcon: { control: 'boolean' },
    iconName: { control: 'text' },
    label: { control: 'text' }
  }
};

export default meta;

type Story = StoryObj<{
  variant: string;
  size: string;
  state: 'default' | 'hover';
  disabled: boolean;
  withIcon: boolean;
  iconName: string;
  label: string;
}>;

type BtnSpec = {
  label: string;
  variant: string;
};

const ROWS: BtnSpec[] = [
  { label: 'Primary', variant: 'primary' },
  { label: 'Secondary', variant: 'secondary' },
  { label: 'Widget action', variant: 'widget-action' },
  { label: 'Tertiary', variant: 'tertiary' }
];

const SIZES: { label: string; size: string }[] = [
  { label: 'Small', size: 'small' },
  { label: 'Medium', size: 'medium' },
  { label: 'Large', size: 'large' }
];

function makeButton(opts: {
  size: string;
  variant: string;
  state?: 'default' | 'hover';
  disabled?: boolean;
  withIcon?: boolean;
  iconName?: string;
  text?: string;
}) {
  const el = document.createElement('nds-button');
  el.setAttribute('size', opts.size);
  el.setAttribute('variant', opts.variant);
  if (opts.state) el.setAttribute('state', opts.state);
  if (opts.disabled) el.setAttribute('disabled', 'true');
  if (opts.withIcon) el.setAttribute('with-icon', 'true');
  if (opts.iconName) el.setAttribute('icon-name', opts.iconName);
  el.textContent = opts.text ?? 'Button';
  return el;
}

export const VariantsAndSizes: Story = {
  render: () => {
    const root = document.createElement('div');
    root.style.cssText =
      'font-family: var(--font-family-base, \'DM Sans\'), system-ui, sans-serif; color: var(--color-neutrals-600, #3d3d3d); padding: 24px; background: #0D0D0D; border-radius: 12px; border: 2px dashed rgba(145, 120, 255, 0.55);';

    SIZES.forEach((s, sizeIndex) => {
      if (sizeIndex > 0) root.appendChild(document.createElement('div')).style.cssText = 'height: 22px;';

      const h3 = document.createElement('div');
      h3.textContent = s.label;
      h3.style.cssText = 'font-weight: 600; font-size: 14px; margin-bottom: 10px; color: #e6e6e6;';
      root.appendChild(h3);

      const grid = document.createElement('table');
      grid.style.cssText = 'width: 100%; border-collapse: collapse; text-align: left; max-width: 920px;';

      const thead = document.createElement('thead');
      thead.innerHTML = `
        <tr>
          <th style="width: 160px; padding: 8px 10px; font-size: 12px; font-weight: 600; color: #e6e6e6;"></th>
          <th style="padding: 8px 10px; font-size: 12px; font-weight: 600; color: #e6e6e6; text-align: center;">Default</th>
          <th style="padding: 8px 10px; font-size: 12px; font-weight: 600; color: #e6e6e6; text-align: center;">Hover</th>
          <th style="padding: 8px 10px; font-size: 12px; font-weight: 600; color: #e6e6e6; text-align: center;">Disabled</th>
          <th style="padding: 8px 10px; font-size: 12px; font-weight: 600; color: #e6e6e6; text-align: center;">destructive</th>
        </tr>
      `;
      grid.appendChild(thead);

      const tbody = document.createElement('tbody');
      ROWS.forEach((row) => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
          <th style="padding: 10px 10px; font-size: 12px; font-weight: 600; color: #e6e6e6;">${row.label}</th>
          <td style="padding: 10px 10px; text-align: center;"></td>
          <td style="padding: 10px 10px; text-align: center;"></td>
          <td style="padding: 10px 10px; text-align: center;"></td>
          <td style="padding: 10px 10px; text-align: center;"></td>
        `;

        const cells = Array.from(tr.querySelectorAll('td')) as HTMLTableCellElement[];
        cells[0].appendChild(makeButton({ size: s.size, variant: row.variant, state: 'default', withIcon: true, iconName: 'add' }));
        cells[1].appendChild(makeButton({ size: s.size, variant: row.variant, state: 'hover', withIcon: true, iconName: 'add' }));
        cells[2].appendChild(makeButton({ size: s.size, variant: row.variant, state: 'default', disabled: true, withIcon: true, iconName: 'add' }));
        cells[3].appendChild(makeButton({ size: s.size, variant: 'destructive', state: 'default', withIcon: true, iconName: 'add' }));

        tbody.appendChild(tr);
      });
      grid.appendChild(tbody);

      root.appendChild(grid);
    });

    return root;
  }
};

export const Playground: Story = {
  render: (args) => {
    const el = document.createElement('nds-button');
    el.setAttribute('variant', args.variant);
    el.setAttribute('size', args.size);
    if (args.state) el.setAttribute('state', args.state);
    if (args.disabled) el.setAttribute('disabled', 'true');
    if (args.withIcon) el.setAttribute('with-icon', 'true');
    if (args.iconName) el.setAttribute('icon-name', args.iconName);
    el.textContent = args.label || 'Button';
    return el;
  }
};

