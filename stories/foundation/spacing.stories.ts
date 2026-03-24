import type { Meta, StoryObj } from '@storybook/web-components';

const meta: Meta = {
  title: 'Foundation/Spacing',
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

const SPACING_ROWS: { token: string; rem: string; baseUnit: string; px: number }[] = [
  { token: 'spacing.00', rem: '0', baseUnit: '0', px: 0 },
  { token: 'spacing.2', rem: '0.125', baseUnit: '0.5', px: 2 },
  { token: 'spacing.4', rem: '0.25', baseUnit: '1', px: 4 },
  { token: 'spacing.8', rem: '0.5', baseUnit: '2', px: 8 },
  { token: 'spacing.12', rem: '0.75', baseUnit: '3', px: 12 },
  { token: 'spacing.16', rem: '1', baseUnit: '4', px: 16 },
  { token: 'spacing.24', rem: '1.5', baseUnit: '6', px: 24 },
  { token: 'spacing.32', rem: '2', baseUnit: '8', px: 32 },
  { token: 'spacing.40', rem: '2.5', baseUnit: '10', px: 40 },
  { token: 'spacing.48', rem: '3', baseUnit: '12', px: 48 },
  { token: 'spacing.64', rem: '4', baseUnit: '16', px: 64 },
  { token: 'spacing.80', rem: '5', baseUnit: '20', px: 80 },
  { token: 'spacing.96', rem: '6', baseUnit: '24', px: 96 },
  { token: 'spacing.112', rem: '7', baseUnit: '28', px: 112 },
  { token: 'spacing.128', rem: '8', baseUnit: '32', px: 128 },
  { token: 'spacing.160', rem: '10', baseUnit: '40', px: 160 }
];

const BAR_COLOR = '#a571f2';
const MAX_BAR_PX = 200;

export const SpacingDoc: Story = {
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
          <th style="text-align:right; padding: 12px 16px; border-bottom: 1px solid var(--color-neutrals-200, #cacaca); font-weight: 600;">rem</th>
          <th style="text-align:right; padding: 12px 16px; border-bottom: 1px solid var(--color-neutrals-200, #cacaca); font-weight: 600;">Base unit multiplier</th>
          <th style="text-align:right; padding: 12px 16px; border-bottom: 1px solid var(--color-neutrals-200, #cacaca); font-weight: 600;">px</th>
          <th style="padding: 12px 16px; border-bottom: 1px solid var(--color-neutrals-200, #cacaca); font-weight: 600; min-width: 220px;">Example</th>
        </tr>
      </thead>
      <tbody></tbody>
    `;

    const tbody = table.querySelector('tbody')!;
    SPACING_ROWS.forEach((row) => {
      const tr = document.createElement('tr');
      const barWidth = Math.min(row.px, MAX_BAR_PX);
      tr.innerHTML = `
        <td class="spacing-token-cell" style="padding: 12px 16px; border-bottom: 1px solid var(--color-neutrals-200, #cacaca); cursor: pointer;" title="Click to copy" data-token="${row.token}">
          <code style="font-size: 13px;">${row.token}</code>
        </td>
        <td style="text-align:right; padding: 12px 16px; border-bottom: 1px solid var(--color-neutrals-200, #cacaca);">${row.rem}</td>
        <td style="text-align:right; padding: 12px 16px; border-bottom: 1px solid var(--color-neutrals-200, #cacaca);">${row.baseUnit}</td>
        <td style="text-align:right; padding: 12px 16px; border-bottom: 1px solid var(--color-neutrals-200, #cacaca);">${row.px}</td>
        <td style="padding: 12px 16px; border-bottom: 1px solid var(--color-neutrals-200, #cacaca);">
          <div style="height: 24px; width: ${barWidth}px; max-width: ${MAX_BAR_PX}px; background: ${BAR_COLOR}; border-radius: 2px;"></div>
        </td>
      `;
      tbody.appendChild(tr);
    });

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
        animation: spacing-fade-in 0.2s ease;
      `;
      const style = document.createElement('style');
      style.textContent = `@keyframes spacing-fade-in { from { opacity: 0; transform: translateX(-50%) translateY(8px); } to { opacity: 1; transform: translateX(-50%) translateY(0); } }`;
      document.head.appendChild(style);
      document.body.appendChild(toast);
      setTimeout(() => {
        toast.remove();
        style.remove();
      }, 1500);
    }

    table.addEventListener('click', (e: Event) => {
      const target = e.target as HTMLElement;
      const cell = target.closest?.('.spacing-token-cell') as HTMLElement | null;
      if (cell?.dataset?.token) {
        navigator.clipboard.writeText(cell.dataset.token);
        showCopiedToast();
      }
    });

    return table;
  }
};
