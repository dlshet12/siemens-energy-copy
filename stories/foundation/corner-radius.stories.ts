import type { Meta, StoryObj } from '@storybook/web-components';

const meta: Meta = {
  title: 'Foundation/Corner Radius',
  parameters: {
    docs: {
      source: { type: 'none' },
      canvas: { sourceState: 'none' as const },
      codePanel: false
    }
  }
};

export default meta;

type Story = StoryObj;

const RADIUS_ROWS = [
  { token: 'radius.00', rem: '0', mult: '0', px: '0', useCase: 'No rounding (sharp corners)' },
  { token: 'radius.2', rem: '0.125', mult: '0.5', px: '2', useCase: 'Tiny elements (checkboxes, badges)' },
  { token: 'radius.4', rem: '0.25', mult: '1', px: '4', useCase: 'Small elements (tags, compact buttons)' },
  { token: 'radius.6', rem: '0.375', mult: '1.5', px: '6', useCase: 'Small elements' },
  { token: 'radius.8', rem: '0.5', mult: '2', px: '8', useCase: 'Standard components (buttons, inputs)' },
  { token: 'radius.10', rem: '0.625', mult: '2.5', px: '10', useCase: 'Focus ring for 8px elements' },
  { token: 'radius.12', rem: '0.75', mult: '3', px: '12', useCase: 'Medium containers (cards, dropdowns)' },
  { token: 'radius.14', rem: '0.875', mult: '3.5', px: '14', useCase: 'Focus ring for 12px elements' },
  { token: 'radius.16', rem: '1', mult: '4', px: '16', useCase: 'Large containers (modals, panels)' },
  { token: 'radius.18', rem: '1.125', mult: '4.5', px: '18', useCase: 'Focus ring for 16px elements' },
  { token: 'radius.24', rem: '1.5', mult: '6', px: '24', useCase: 'Extra large (video players, special containers)' },
  { token: 'radius.full', rem: '—', mult: '—', px: '9999', useCase: 'Pills, avatars, circular elements' }
];

function showCopiedToast() {
  const toast = document.createElement('div');
  toast.textContent = 'Copied!';
  toast.style.cssText = `
    position: fixed;
    bottom: 24px;
    left: 50%;
    transform: translateX(-50%);
    padding: 8px 16px;
    background: var(--color-neutrals-800, #1a1a1a);
    color: var(--color-alphas-white-100, #fff);
    font-size: 13px;
    font-family: var(--font-family-base, 'DM Sans'), system-ui, sans-serif;
    border-radius: 6px;
    box-shadow: 0 4px 12px rgba(0,0,0,0.15);
    z-index: 10000;
    animation: radius-fade-in 0.2s ease;
  `;
  const style = document.createElement('style');
  style.textContent = `@keyframes radius-fade-in { from { opacity: 0; transform: translateX(-50%) translateY(8px); } to { opacity: 1; transform: translateX(-50%) translateY(0); } }`;
  document.head.appendChild(style);
  document.body.appendChild(toast);
  setTimeout(() => {
    toast.remove();
    style.remove();
  }, 1500);
}

export const RadiusDoc: Story = {
  render: () => {
    const table = document.createElement('table');
    table.style.cssText = `
      width: 100%;
      max-width: 900px;
      border-collapse: collapse;
      font-size: 14px;
      font-family: var(--font-family-base, 'DM Sans'), system-ui, sans-serif;
    `;
    table.innerHTML = `
      <thead>
        <tr>
          <th style="text-align:left; padding: 12px 16px; border-bottom: 1px solid var(--color-neutrals-200, #cacaca); font-weight: 600;">Token</th>
          <th style="text-align:right; padding: 12px 16px; border-bottom: 1px solid var(--color-neutrals-200, #cacaca); font-weight: 600;">rem</th>
          <th style="text-align:right; padding: 12px 16px; border-bottom: 1px solid var(--color-neutrals-200, #cacaca); font-weight: 600;">Base unit multiplier</th>
          <th style="text-align:right; padding: 12px 16px; border-bottom: 1px solid var(--color-neutrals-200, #cacaca); font-weight: 600;">px</th>
          <th style="padding: 12px 16px; border-bottom: 1px solid var(--color-neutrals-200, #cacaca); font-weight: 600; width: 80px;">Example</th>
          <th style="text-align:left; padding: 12px 16px; border-bottom: 1px solid var(--color-neutrals-200, #cacaca); font-weight: 600;">Use Case</th>
        </tr>
      </thead>
      <tbody></tbody>
    `;

    const tbody = table.querySelector('tbody')!;
    RADIUS_ROWS.forEach((row) => {
      const tr = document.createElement('tr');
      const radiusVal = row.token === 'radius.full' ? '9999px' : `${row.px}px`;
      tr.innerHTML = `
        <td class="radius-token-cell" style="padding: 12px 16px; border-bottom: 1px solid var(--color-neutrals-200, #cacaca); cursor: pointer;" title="Click to copy" data-token="${row.token}">
          <code style="font-size: 13px;">${row.token}</code>
        </td>
        <td style="text-align:right; padding: 12px 16px; border-bottom: 1px solid var(--color-neutrals-200, #cacaca);">${row.rem}</td>
        <td style="text-align:right; padding: 12px 16px; border-bottom: 1px solid var(--color-neutrals-200, #cacaca);">${row.mult}</td>
        <td style="text-align:right; padding: 12px 16px; border-bottom: 1px solid var(--color-neutrals-200, #cacaca);">${row.px}</td>
        <td style="padding: 12px 16px; border-bottom: 1px solid var(--color-neutrals-200, #cacaca);"></td>
        <td style="padding: 12px 16px; border-bottom: 1px solid var(--color-neutrals-200, #cacaca);">${row.useCase}</td>
      `;
      const example = document.createElement('div');
      example.style.cssText = `
        width: 40px;
        height: 40px;
        background: var(--color-neutrals-200, #cacaca);
        border: 2px solid var(--color-purple-400, #a571f2);
        border-radius: ${radiusVal};
      `;
      tr.querySelector('td:nth-child(5)')?.appendChild(example);
      tbody.appendChild(tr);
    });

    table.addEventListener('click', (e: Event) => {
      const cell = (e.target as HTMLElement).closest?.('.radius-token-cell') as HTMLElement | null;
      if (cell?.dataset?.token) {
        navigator.clipboard.writeText(cell.dataset.token);
        showCopiedToast();
      }
    });

    return table;
  }
};
