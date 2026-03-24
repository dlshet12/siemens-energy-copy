import type { Meta, StoryObj } from '@storybook/web-components';

const meta: Meta = {
  title: 'Foundation/Elevation & Styles',
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

type ShadowRow = { level?: number; token: string; x: number; y: number; spread: number; blur: number; color: string };

const DARK_BRIGHT: ShadowRow[] = [
  { level: 1, token: 'shadow-dark-bright-00', x: 0, y: 0, spread: 0, blur: 0, color: 'rgba(242,4,13,0.08)' },
  { level: 2, token: 'shadow-dark-bright-01', x: 0, y: 2, spread: 0, blur: 4, color: 'rgba(242,4,13,0.10)' },
  { level: 3, token: 'shadow-dark-bright-02', x: 0, y: 4, spread: 0, blur: 8, color: 'rgba(242,4,13,0.12)' },
  { level: 4, token: 'shadow-dark-bright-03', x: 0, y: 8, spread: 0, blur: 16, color: 'rgba(242,4,13,0.14)' },
  { level: 5, token: 'shadow-dark-bright-04', x: 0, y: 12, spread: 0, blur: 24, color: 'rgba(242,4,13,0.18)' },
  { level: 6, token: 'shadow-dark-bright-05', x: 0, y: 16, spread: 0, blur: 32, color: 'rgba(242,4,13,0.20)' }
];

const DARK_DIM: ShadowRow[] = [
  { level: 1, token: 'shadow-dark-dim-00', x: 0, y: 0, spread: 0, blur: 0, color: 'rgba(0,0,0,0.04)' },
  { level: 2, token: 'shadow-dark-dim-01', x: 0, y: 2, spread: 0, blur: 4, color: 'rgba(0,0,0,0.08)' },
  { level: 3, token: 'shadow-dark-dim-02', x: 0, y: 4, spread: 0, blur: 8, color: 'rgba(0,0,0,0.12)' },
  { level: 4, token: 'shadow-dark-dim-03', x: 0, y: 8, spread: 0, blur: 16, color: 'rgba(0,0,0,0.16)' },
  { level: 5, token: 'shadow-dark-dim-04', x: 0, y: 12, spread: 0, blur: 24, color: 'rgba(0,0,0,0.20)' },
  { level: 6, token: 'shadow-dark-dim-05', x: 0, y: 16, spread: 0, blur: 32, color: 'rgba(0,0,0,0.24)' }
];

const LIGHT: ShadowRow[] = [
  { level: 1, token: 'shadow-light-00', x: 0, y: 0, spread: 0, blur: 0, color: 'rgba(0,0,0,0.04)' },
  { level: 2, token: 'shadow-light-01', x: 0, y: 2, spread: 0, blur: 4, color: 'rgba(0,0,0,0.06)' },
  { level: 3, token: 'shadow-light-02', x: 0, y: 4, spread: 0, blur: 8, color: 'rgba(0,0,0,0.08)' },
  { level: 4, token: 'shadow-light-03', x: 0, y: 8, spread: 0, blur: 16, color: 'rgba(0,0,0,0.10)' },
  { level: 5, token: 'shadow-light-04', x: 0, y: 12, spread: 0, blur: 24, color: 'rgba(0,0,0,0.12)' },
  { level: 6, token: 'shadow-light-05', x: 0, y: 16, spread: 0, blur: 32, color: 'rgba(0,0,0,0.16)' }
];

const MAP_OVERLAY = [{ token: 'shadow-on-media', x: 0, y: 4, spread: 0, blur: 5, color: 'rgba(0,0,0,0.25)' }];

const tableStyle = `
  width: 100%;
  max-width: 900px;
  border-collapse: collapse;
  font-size: 14px;
  font-family: var(--font-family-base, 'DM Sans'), system-ui, sans-serif;
  margin-bottom: 1.5rem;
`;
const thTdStyle = 'padding: 12px 16px; border-bottom: 1px solid var(--color-neutrals-200, #cacaca);';

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
    animation: elev-fade-in 0.2s ease;
  `;
  const style = document.createElement('style');
  style.textContent = `@keyframes elev-fade-in { from { opacity: 0; transform: translateX(-50%) translateY(8px); } to { opacity: 1; transform: translateX(-50%) translateY(0); } }`;
  document.head.appendChild(style);
  document.body.appendChild(toast);
  setTimeout(() => {
    toast.remove();
    style.remove();
  }, 1500);
}

function renderShadowTable(
  title: string,
  rows: ShadowRow[],
  hasLevel: boolean,
  previewBg: string
): HTMLTableElement {
  const table = document.createElement('table');
  table.className = 'elevation-token-table';
  table.style.cssText = tableStyle;
  const levelHeader = hasLevel ? '<th style="' + thTdStyle + '">Level</th>' : '';
  table.innerHTML = `
    <thead>
      <tr>
        ${levelHeader}
        <th style="text-align:left; ${thTdStyle} font-weight: 600;">Token</th>
        <th style="${thTdStyle}">X</th>
        <th style="${thTdStyle}">Y</th>
        <th style="${thTdStyle}">Spread</th>
        <th style="${thTdStyle}">Blur</th>
        <th style="${thTdStyle}">Shadow Color (RGBA)</th>
        <th style="${thTdStyle}">Preview</th>
      </tr>
    </thead>
    <tbody></tbody>
  `;
  const tbody = table.querySelector('tbody')!;
  rows.forEach((row) => {
    const tr = document.createElement('tr');
    const levelCell = hasLevel ? `<td style="${thTdStyle}">${row.level}</td>` : '';
    const boxShadow = `${row.x}px ${row.y}px ${row.blur}px ${row.spread}px ${row.color}`;
    tr.innerHTML = `
      ${levelCell}
      <td class="elev-token-cell" style="padding: 12px 16px; border-bottom: 1px solid var(--color-neutrals-200, #cacaca); cursor: pointer;" title="Click to copy" data-token="${row.token}">
        <code style="font-size: 13px;">${row.token}</code>
      </td>
      <td style="${thTdStyle}">${row.x}</td>
      <td style="${thTdStyle}">${row.y}</td>
      <td style="${thTdStyle}">${row.spread}</td>
      <td style="${thTdStyle}">${row.blur}</td>
      <td style="${thTdStyle}">${row.color}</td>
      <td style="${thTdStyle}"></td>
    `;
    const preview = document.createElement('div');
    preview.style.cssText = `width: 48px; height: 48px; background: ${previewBg}; border-radius: 8px; box-shadow: ${boxShadow};`;
    tr.querySelector('td:last-child')?.appendChild(preview);
    tbody.appendChild(tr);
  });
  return table;
}

export const ElevationDoc: Story = {
  render: () => {
    const wrapper = document.createElement('div');

    const h2_1 = document.createElement('h2');
    h2_1.style.cssText = 'font-size: 1rem; font-weight: 600; margin: 0 0 0.75rem;';
    h2_1.textContent = 'Dark Mode: Bright (Glow-Based Elevation)';
    wrapper.appendChild(h2_1);
    const table1 = renderShadowTable('Dark Bright', DARK_BRIGHT, true, '#1a1a1a');
    wrapper.appendChild(table1);

    const h2_2 = document.createElement('h2');
    h2_2.style.cssText = 'font-size: 1rem; font-weight: 600; margin: 2rem 0 0.75rem;';
    h2_2.textContent = 'Dark Mode: Dim (Depth-Based Elevation)';
    wrapper.appendChild(h2_2);
    const table2 = renderShadowTable('Dark Dim', DARK_DIM, true, '#1a1a1a');
    wrapper.appendChild(table2);

    const h2_3 = document.createElement('h2');
    h2_3.style.cssText = 'font-size: 1rem; font-weight: 600; margin: 2rem 0 0.75rem;';
    h2_3.textContent = 'Light Mode Elevation';
    wrapper.appendChild(h2_3);
    const table3 = renderShadowTable('Light', LIGHT, true, '#f5f5f5');
    wrapper.appendChild(table3);

    const h2_4 = document.createElement('h2');
    h2_4.style.cssText = 'font-size: 1rem; font-weight: 600; margin: 2rem 0 0.75rem;';
    h2_4.textContent = 'Map Overlay';
    wrapper.appendChild(h2_4);
    const table4 = renderShadowTable('Map', MAP_OVERLAY, false, '#f5f5f5');
    wrapper.appendChild(table4);

    const handleCopy = (e: Event) => {
      const cell = (e.target as HTMLElement).closest?.('.elev-token-cell') as HTMLElement | null;
      if (cell?.dataset?.token) {
        navigator.clipboard.writeText(cell.dataset.token);
        showCopiedToast();
      }
    };
    wrapper.querySelectorAll('.elevation-token-table').forEach((t) => t.addEventListener('click', handleCopy));

    return wrapper;
  }
};
