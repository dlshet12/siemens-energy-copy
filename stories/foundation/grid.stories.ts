import type { Meta, StoryObj } from '@storybook/web-components';

const meta: Meta = {
  title: 'Foundation/Grid Layouts',
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

const GRID_ROWS = [
  { token: 'grid-layout.sm', value: 363, usage: 'Mobile', margin: '12px', gutter: '16px' },
  { token: 'grid-layout.md', value: 1194, usage: 'Tablet', margin: '16px', gutter: '16px' },
  { token: 'grid-layout.lg', value: 1440, usage: 'Desktop', margin: '32px', gutter: '16px' },
  { token: 'grid-layout.xl', value: 1600, usage: 'Wide', margin: '32px', gutter: '16px' }
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
    animation: grid-fade-in 0.2s ease;
  `;
  const style = document.createElement('style');
  style.textContent = `@keyframes grid-fade-in { from { opacity: 0; transform: translateX(-50%) translateY(8px); } to { opacity: 1; transform: translateX(-50%) translateY(0); } }`;
  document.head.appendChild(style);
  document.body.appendChild(toast);
  setTimeout(() => {
    toast.remove();
    style.remove();
  }, 1500);
}

export const GridDoc: Story = {
  render: () => {
    const table = document.createElement('table');
    table.style.cssText = `
      width: 100%;
      max-width: 800px;
      border-collapse: collapse;
      font-size: 14px;
      font-family: var(--font-family-base, 'DM Sans'), system-ui, sans-serif;
    `;
    table.innerHTML = `
      <thead>
        <tr>
          <th style="text-align:left; padding: 12px 16px; border-bottom: 1px solid var(--color-neutrals-200, #cacaca); font-weight: 600;">Token</th>
          <th style="text-align:right; padding: 12px 16px; border-bottom: 1px solid var(--color-neutrals-200, #cacaca); font-weight: 600;">Value (px)</th>
          <th style="text-align:left; padding: 12px 16px; border-bottom: 1px solid var(--color-neutrals-200, #cacaca); font-weight: 600;">Usage</th>
          <th style="text-align:left; padding: 12px 16px; border-bottom: 1px solid var(--color-neutrals-200, #cacaca); font-weight: 600;">Margin</th>
          <th style="text-align:left; padding: 12px 16px; border-bottom: 1px solid var(--color-neutrals-200, #cacaca); font-weight: 600;">Gutter</th>
        </tr>
      </thead>
      <tbody></tbody>
    `;

    const tbody = table.querySelector('tbody')!;
    GRID_ROWS.forEach((row) => {
      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td class="grid-token-cell" style="padding: 12px 16px; border-bottom: 1px solid var(--color-neutrals-200, #cacaca); cursor: pointer;" title="Click to copy" data-token="${row.token}">
          <code style="font-size: 13px;">${row.token}</code>
        </td>
        <td style="text-align:right; padding: 12px 16px; border-bottom: 1px solid var(--color-neutrals-200, #cacaca);">${row.value}</td>
        <td style="padding: 12px 16px; border-bottom: 1px solid var(--color-neutrals-200, #cacaca);">${row.usage}</td>
        <td style="padding: 12px 16px; border-bottom: 1px solid var(--color-neutrals-200, #cacaca);">${row.margin}</td>
        <td style="padding: 12px 16px; border-bottom: 1px solid var(--color-neutrals-200, #cacaca);">${row.gutter}</td>
      `;
      tbody.appendChild(tr);
    });

    table.addEventListener('click', (e: Event) => {
      const cell = (e.target as HTMLElement).closest?.('.grid-token-cell') as HTMLElement | null;
      if (cell?.dataset?.token) {
        navigator.clipboard.writeText(cell.dataset.token);
        showCopiedToast();
      }
    });

    return table;
  }
};
