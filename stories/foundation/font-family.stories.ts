import type { Meta, StoryObj } from '@storybook/web-components';
// @ts-expect-error JSON import
import valueTokens from '../../packages/tokens/src/value.tokens.json';

const meta: Meta = {
  title: 'Foundation/Font Family',
  parameters: {
    docs: { source: { type: 'none' } }
  }
};
export default meta;

type Story = StoryObj;

const fontFamilies = (() => {
  const font = (valueTokens as Record<string, unknown>).font as Record<string, unknown>;
  const f = font?.family as Record<string, { $value: string }> | undefined;
  if (!f) return [];
  return Object.entries(f).map(([key, v]) => ({
    token: `font.family.${key}`,
    value: v.$value,
    cssVar: '--font-family-base'
  }));
})();

const cellBorder = '1px solid var(--color-neutrals-200, #cacaca)';
const cellPad = '12px 16px';

function showCopiedToast(): void {
  const toast = document.createElement('div');
  toast.textContent = 'Copied!';
  toast.style.cssText =
    'position: fixed; bottom: 24px; left: 50%; transform: translateX(-50%); padding: 8px 16px; background: #1a1a1a; color: #fff; font-size: 13px; border-radius: 6px; z-index: 10000;';
  document.body.appendChild(toast);
  setTimeout(() => toast.remove(), 1500);
}

export const FontFamilyDoc: Story = {
  render: () => {
    const table = document.createElement('table');
    table.className = 'font-doc-table';
    table.style.cssText =
      'width: 100%; max-width: 800px; border-collapse: collapse; font-size: 14px; font-family: var(--font-family-base, \'DM Sans\'), system-ui, sans-serif;';
    table.innerHTML = `
      <thead>
        <tr>
          <th style="text-align:left; padding: ${cellPad}; border-bottom: ${cellBorder}; font-weight: 600;">Token</th>
          <th style="text-align:right; padding: ${cellPad}; border-bottom: ${cellBorder}; font-weight: 600;">rem</th>
          <th style="text-align:right; padding: ${cellPad}; border-bottom: ${cellBorder}; font-weight: 600;">Base unit multiplier</th>
          <th style="text-align:right; padding: ${cellPad}; border-bottom: ${cellBorder}; font-weight: 600;">Value</th>
          <th style="padding: ${cellPad}; border-bottom: ${cellBorder}; font-weight: 600; min-width: 120px;">Example</th>
        </tr>
      </thead>
      <tbody></tbody>
    `;
    const tbody = table.querySelector('tbody')!;

    fontFamilies.forEach(({ token, value }) => {
      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td class="font-token-cell" style="padding: ${cellPad}; border-bottom: ${cellBorder}; cursor: pointer;" title="Click to copy" data-token="${token}">
          <code style="font-size: 13px;">${token}</code>
        </td>
        <td style="text-align:right; padding: ${cellPad}; border-bottom: ${cellBorder};">—</td>
        <td style="text-align:right; padding: ${cellPad}; border-bottom: ${cellBorder};">—</td>
        <td style="text-align:right; padding: ${cellPad}; border-bottom: ${cellBorder};">${value}</td>
        <td style="padding: ${cellPad}; border-bottom: ${cellBorder};">
          <span style="font-family: ${value}, system-ui, sans-serif; font-size: 16px;">Sample text</span>
        </td>
      `;
      tbody.appendChild(tr);
    });

    table.addEventListener('click', (e: Event) => {
      const cell = (e.target as HTMLElement).closest?.('.font-token-cell') as HTMLElement | null;
      if (cell?.dataset?.token) {
        navigator.clipboard.writeText(cell.dataset.token);
        showCopiedToast();
      }
    });

    return table;
  }
};
