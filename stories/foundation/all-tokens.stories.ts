import type { Meta, StoryObj } from '@storybook/web-components';
// @ts-expect-error JSON import
import valueTokensJson from '../../packages/tokens/src/value.tokens.json';

const meta: Meta = {
  title: 'Foundation/All Tokens',
  parameters: {
    docs: { source: { type: 'none' } }
  }
};
export default meta;

type Story = StoryObj;

interface TokenRow {
  token: string;
  type: string;
  value: string;
  isColor: boolean;
}

function flattenTokens(obj: Record<string, unknown>, prefix = ''): TokenRow[] {
  const rows: TokenRow[] = [];
  for (const key of Object.keys(obj)) {
    if (key.startsWith('$')) continue;
    const path = prefix ? `${prefix}-${key}` : key;
    const val = obj[key] as Record<string, unknown> | undefined;
    if (val && typeof val === 'object' && '$value' in val) {
      const v = val.$value;
      const tokenType = (val.$type as string) || 'unknown';
      let valueStr = '';
      let isColor = false;
      if (v && typeof v === 'object' && 'hex' in v) {
        valueStr = (v as { hex: string }).hex;
        isColor = true;
      } else if (typeof v === 'number' || typeof v === 'string') {
        valueStr = String(v);
      } else if (v && typeof v === 'object') {
        valueStr = JSON.stringify(v);
      }
      rows.push({
        token: `--${path.replace(/\./g, '-')}`,
        type: tokenType,
        value: valueStr,
        isColor
      });
      continue;
    }
    if (val && typeof val === 'object' && !Array.isArray(val)) {
      rows.push(...flattenTokens(val as Record<string, unknown>, path));
    }
  }
  return rows;
}

function showCopiedToast(): void {
  const toast = document.createElement('div');
  toast.textContent = 'Copied!';
  toast.style.cssText =
    'position: fixed; bottom: 24px; left: 50%; transform: translateX(-50%); padding: 8px 16px; background: #1a1a1a; color: #fff; font-size: 13px; font-family: var(--font-family-base, DM Sans), system-ui, sans-serif; border-radius: 6px; box-shadow: 0 4px 12px rgba(0,0,0,0.15); z-index: 10000;';
  document.body.appendChild(toast);
  setTimeout(() => toast.remove(), 1500);
}

const valueTokens = valueTokensJson as Record<string, unknown>;
const allRows: TokenRow[] = (() => {
  const obj = { ...valueTokens };
  if ('$extensions' in obj) delete obj.$extensions;
  const rows = flattenTokens(obj);
  return rows.sort((a, b) => a.token.localeCompare(b.token));
})();

export const AllTokensDoc: Story = {
  render: () => {
    const wrapper = document.createElement('div');
    wrapper.className = 'tokens-doc-table-wrap';
    wrapper.style.cssText =
      'background: #1a1a1a; padding: 16px; border-radius: 8px; margin-bottom: 24px; max-width: 900px; font-family: var(--font-family-base, \'DM Sans\'), system-ui, sans-serif;';

    const table = document.createElement('table');
    table.style.cssText =
      'width: 100%; border-collapse: collapse; font-size: 14px; color: #ffffff;';
    const cellStyle =
      'padding: 12px 16px; border-bottom: 1px solid rgba(255,255,255,0.12); text-align: left; color: #e6e6e6;';
    table.innerHTML = `
      <thead>
        <tr>
          <th style="${cellStyle} font-weight: 600;">Token</th>
          <th style="${cellStyle} font-weight: 600;">Type</th>
          <th style="${cellStyle} font-weight: 600;">Value</th>
          <th style="${cellStyle} font-weight: 600;">Swatch</th>
        </tr>
      </thead>
      <tbody></tbody>
    `;
    const tbody = table.querySelector('tbody')!;

    allRows.forEach((row) => {
      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td class="all-token-cell" style="${cellStyle} cursor: pointer;" title="Click to copy" data-token="${row.token}">
          <code style="font-size: 13px; color: #e6e6e6;">${row.token}</code>
        </td>
        <td style="${cellStyle}">${row.type}</td>
        <td style="${cellStyle}">${row.value}</td>
        ${row.isColor ? `<td style="${cellStyle}"><span class="tokens-doc-swatch" style="width:32px;height:20px;border-radius:4px;display:inline-block;vertical-align:middle;border:1px solid rgba(255,255,255,0.2);background:${row.value}"></span></td>` : '<td style="' + cellStyle + '">—</td>'}
      `;
      tbody.appendChild(tr);
    });

    table.addEventListener('click', (e: Event) => {
      const cell = (e.target as HTMLElement).closest?.('.all-token-cell') as HTMLElement | null;
      if (cell?.dataset?.token) {
        navigator.clipboard.writeText(cell.dataset.token);
        showCopiedToast();
      }
    });

    wrapper.appendChild(table);
    return wrapper;
  }
};
