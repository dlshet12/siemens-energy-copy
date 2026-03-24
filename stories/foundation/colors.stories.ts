import type { Meta, StoryObj } from '@storybook/web-components';

const meta: Meta = {
  title: 'Foundation/Colors',
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

type ColorRow = { token: string; value: string };

const PALETTES: { title: string; rows: ColorRow[] }[] = [
  {
    title: 'Purple',
    rows: [
      { token: '--color-purple-50', value: '#F1E9FF' },
      { token: '--color-purple-100', value: '#DED1FC' },
      { token: '--color-purple-200', value: '#CAAEFF' },
      { token: '--color-purple-300', value: '#BE91FA' },
      { token: '--color-purple-400', value: '#A571F2' },
      { token: '--color-purple-500', value: '#824ACE' },
      { token: '--color-purple-600', value: '#7C38BC' },
      { token: '--color-purple-700', value: '#7522A7' },
      { token: '--color-purple-800', value: '#641E8C' },
      { token: '--color-purple-900', value: '#4D217A' },
      { token: '--color-purple-1000', value: '#1B1534' }
    ]
  },
  {
    title: 'Red',
    rows: [
      { token: '--color-red-50', value: '#FFECE1' },
      { token: '--color-red-100', value: '#FFE3D3' },
      { token: '--color-red-200', value: '#FFC1A8' },
      { token: '--color-red-300', value: '#FF947B' },
      { token: '--color-red-400', value: '#F36757' },
      { token: '--color-red-500', value: '#E01F22' },
      { token: '--color-red-600', value: '#C1001D' },
      { token: '--color-red-700', value: '#A20020' },
      { token: '--color-red-800', value: '#820021' },
      { token: '--color-red-900', value: '#6C0021' },
      { token: '--color-red-1000', value: '#56001A' }
    ]
  },
  {
    title: 'Green',
    rows: [
      { token: '--color-green-50', value: '#E2F7E4' },
      { token: '--color-green-100', value: '#A5E8A7' },
      { token: '--color-green-200', value: '#78E08A' },
      { token: '--color-green-300', value: '#48D266' },
      { token: '--color-green-400', value: '#3EBE64' },
      { token: '--color-green-500', value: '#0C9A46' },
      { token: '--color-green-600', value: '#058A40' },
      { token: '--color-green-700', value: '#006E33' },
      { token: '--color-green-800', value: '#005228' },
      { token: '--color-green-900', value: '#00391A' },
      { token: '--color-green-1000', value: '#002610' }
    ]
  },
  {
    title: 'Yellow',
    rows: [
      { token: '--color-yellow-50', value: '#FFF8DD' },
      { token: '--color-yellow-100', value: '#FFF3C7' },
      { token: '--color-yellow-200', value: '#FFE58D' },
      { token: '--color-yellow-300', value: '#FFD24C' },
      { token: '--color-yellow-400', value: '#FFBF00' },
      { token: '--color-yellow-500', value: '#FFA000' },
      { token: '--color-yellow-600', value: '#C36400' },
      { token: '--color-yellow-700', value: '#AD5700' },
      { token: '--color-yellow-800', value: '#9E4A00' },
      { token: '--color-yellow-900', value: '#833900' },
      { token: '--color-yellow-1000', value: '#692E00' }
    ]
  },
  {
    title: 'Blue',
    rows: [
      { token: '--color-blue-50', value: '#E5F1FF' },
      { token: '--color-blue-100', value: '#CBE4FF' },
      { token: '--color-blue-200', value: '#99CAFF' },
      { token: '--color-blue-300', value: '#5AAAFA' },
      { token: '--color-blue-400', value: '#4C99F5' },
      { token: '--color-blue-500', value: '#3388F0' },
      { token: '--color-blue-600', value: '#1A74D4' },
      { token: '--color-blue-700', value: '#0061B0' },
      { token: '--color-blue-800', value: '#004D8A' },
      { token: '--color-blue-900', value: '#003A66' },
      { token: '--color-blue-1000', value: '#00284C' }
    ]
  },
  {
    title: 'Neutrals',
    rows: [
      { token: '--color-neutrals-50', value: '#F5F5F5' },
      { token: '--color-neutrals-100', value: '#E6E6E6' },
      { token: '--color-neutrals-200', value: '#CACACA' },
      { token: '--color-neutrals-300', value: '#ADADAD' },
      { token: '--color-neutrals-400', value: '#707070' },
      { token: '--color-neutrals-500', value: '#525252' },
      { token: '--color-neutrals-600', value: '#3D3D3D' },
      { token: '--color-neutrals-700', value: '#2D2D2D' },
      { token: '--color-neutrals-800', value: '#1A1A1A' },
      { token: '--color-neutrals-900', value: '#0D0D0D' },
      { token: '--color-neutrals-950', value: '#050505' }
    ]
  }
];

type SemanticRow = { token: string; value: string };
type SemanticGroup = { title: string; light: SemanticRow[]; dark?: SemanticRow[] };

const SEMANTICS: SemanticGroup[] = [
  {
    title: 'Text colors',
    light: [
      { token: 'text-primary', value: '#050505' },
      { token: 'text-secondary', value: '#525252' },
      { token: 'text-tertiary', value: '#707070' },
      { token: 'text-inverse', value: '#F5F5F5' },
      { token: 'text-link', value: '#7C38BC' },
      { token: 'text-disabled', value: '#707070' },
      { token: 'text-success', value: '#006E33' },
      { token: 'text-danger', value: '#E01F22' },
      { token: 'text-on-accent', value: '#FFFFFF' }
    ],
    dark: [
      { token: 'text-primary', value: '#FFFFFF' },
      { token: 'text-secondary', value: '#ADADAD' },
      { token: 'text-tertiary', value: '#707070' },
      { token: 'text-inverse', value: '#0D0D0D' },
      { token: 'text-link', value: '#A571F2' },
      { token: 'text-disabled', value: '#707070' },
      { token: 'text-success', value: '#0C9A46' },
      { token: 'text-danger', value: '#F36757' },
      { token: 'text-on-accent', value: '#FFFFFF' }
    ]
  },
  {
    title: 'Background colors',
    light: [
      { token: 'surface-canvas', value: '#F5F5F5' },
      { token: 'background-layer-02', value: '#E6E6E6' }
    ],
    dark: [
      { token: 'surface-canvas', value: '#0D0D0D' },
      { token: 'background-layer-02', value: '#2D2D2D' }
    ]
  },
  {
    title: 'Interactive colors',
    light: [
      { token: 'interactive-primary', value: '#824ACE' },
      { token: 'interactive-primary-hover', value: '#7C38BC' },
      { token: 'interactive-destructive', value: '#E01F22' },
      { token: 'interactive-destructive-hover', value: '#A20020' },
      { token: 'interactive-disabled', value: '#CACACA' }
    ],
    dark: [
      { token: 'interactive-primary', value: '#824ACE' },
      { token: 'interactive-primary-hover', value: '#7C38BC' },
      { token: 'interactive-destructive', value: '#E01F22' },
      { token: 'interactive-destructive-hover', value: '#C1001D' },
      { token: 'interactive-disabled', value: '#2D2D2D' }
    ]
  },
  {
    title: 'Status colors',
    light: [
      { token: 'status-success', value: '#0C9A46' },
      { token: 'status-success-on-accent', value: '#48D266' },
      { token: 'status-info', value: '#1A74D4' },
      { token: 'status-critical', value: '#E01F22' },
      { token: 'status-warning', value: '#AD5700' }
    ]
  }
];

const thTdStyle = 'padding: 12px 16px; border-bottom: 1px solid var(--color-neutrals-200, #cacaca); text-align: left;';
const thTdDarkStyle = 'padding: 12px 16px; border-bottom: 1px solid rgba(255,255,255,0.12); text-align: left; color: #e6e6e6;';

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
    animation: color-fade-in 0.2s ease;
  `;
  const style = document.createElement('style');
  style.textContent = `@keyframes color-fade-in { from { opacity: 0; transform: translateX(-50%) translateY(8px); } to { opacity: 1; transform: translateX(-50%) translateY(0); } }`;
  document.head.appendChild(style);
  document.body.appendChild(toast);
  setTimeout(() => {
    toast.remove();
    style.remove();
  }, 1500);
}

export const ColorDoc: Story = {
  render: () => {
    const wrapper = document.createElement('div');
    wrapper.style.cssText = 'font-family: var(--font-family-base, \'DM Sans\'), system-ui, sans-serif;';

    PALETTES.forEach((palette) => {
      const section = document.createElement('div');
      section.style.marginBottom = '32px';

      const h3 = document.createElement('h3');
      h3.style.cssText = 'color: var(--color-neutrals-900, #0d0d0d); margin: 0 0 12px; font-size: 1rem; font-weight: 600;';
      h3.textContent = palette.title;
      section.appendChild(h3);

      const table = document.createElement('table');
      table.style.cssText = `
        width: 100%;
        max-width: 800px;
        border-collapse: collapse;
        font-size: 14px;
      `;
      table.innerHTML = `
        <thead>
          <tr>
            <th style="${thTdStyle} font-weight: 600;">Token</th>
            <th style="${thTdStyle} font-weight: 600;">Value</th>
            <th style="${thTdStyle} font-weight: 600;">Swatch</th>
          </tr>
        </thead>
        <tbody></tbody>
      `;

      const tbody = table.querySelector('tbody')!;
      palette.rows.forEach((row) => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
          <td class="color-token-cell" style="${thTdStyle} cursor: pointer;" title="Click to copy" data-token="${row.token}">
            <code style="font-size: 13px;">${row.token}</code>
          </td>
          <td style="${thTdStyle}">${row.value}</td>
          <td style="${thTdStyle}"></td>
        `;
        const swatch = document.createElement('span');
        swatch.style.cssText = 'width: 48px; height: 28px; border-radius: 4px; display: inline-block; vertical-align: middle; border: 1px solid rgba(0,0,0,0.08);';
        swatch.style.background = `var(${row.token})`;
        tr.querySelector('td:last-child')?.appendChild(swatch);
        tbody.appendChild(tr);
      });

      table.addEventListener('click', (e: Event) => {
        const cell = (e.target as HTMLElement).closest?.('.color-token-cell') as HTMLElement | null;
        if (cell?.dataset?.token) {
          navigator.clipboard.writeText(cell.dataset.token);
          showCopiedToast();
        }
      });

      section.appendChild(table);
      wrapper.appendChild(section);
    });

    // Semantics section
    const semHeading = document.createElement('h2');
    semHeading.style.cssText = 'font-size: 1.25rem; font-weight: 600; margin: 2.5rem 0 1rem; color: var(--color-neutrals-900, #0d0d0d);';
    semHeading.textContent = 'Semantics';
    wrapper.appendChild(semHeading);

    SEMANTICS.forEach((group) => {
      const groupDiv = document.createElement('div');
      groupDiv.style.marginBottom = '28px';

      const h3 = document.createElement('h3');
      h3.style.cssText = 'color: var(--color-neutrals-900, #0d0d0d); margin: 0 0 8px; font-size: 1rem; font-weight: 600;';
      h3.textContent = group.title;
      groupDiv.appendChild(h3);

      const tableWrapStyle = 'background: #1a1a1a; padding: 16px; border-radius: 8px; margin-bottom: 16px; max-width: 800px;';

      const modeLabel = document.createElement('div');
      modeLabel.style.cssText = 'font-size: 13px; font-weight: 600; color: var(--color-neutrals-600); margin: 12px 0 6px;';
      modeLabel.textContent = 'Light mode';
      groupDiv.appendChild(modeLabel);

      const lightWrap = document.createElement('div');
      lightWrap.style.cssText = tableWrapStyle;
      const lightTable = makeSemanticTable(group.light, thTdDarkStyle, true);
      lightTable.addEventListener('click', tableClick);
      lightWrap.appendChild(lightTable);
      groupDiv.appendChild(lightWrap);

      if (group.dark) {
        const darkLabel = document.createElement('div');
        darkLabel.style.cssText = 'font-size: 13px; font-weight: 600; color: var(--color-neutrals-600); margin: 16px 0 6px;';
        darkLabel.textContent = 'Dark mode';
        groupDiv.appendChild(darkLabel);
        const darkWrap = document.createElement('div');
        darkWrap.style.cssText = tableWrapStyle;
        const darkTable = makeSemanticTable(group.dark, thTdDarkStyle, true);
        darkTable.addEventListener('click', tableClick);
        darkWrap.appendChild(darkTable);
        groupDiv.appendChild(darkWrap);
      }

      wrapper.appendChild(groupDiv);
    });

    function tableClick(e: Event) {
      const cell = (e.target as HTMLElement).closest?.('.color-token-cell') as HTMLElement | null;
      if (cell?.dataset?.token) {
        navigator.clipboard.writeText(cell.dataset.token);
        showCopiedToast();
      }
    }

    function makeSemanticTable(rows: SemanticRow[], cellStyle: string, isDark: boolean): HTMLTableElement {
      const table = document.createElement('table');
      table.style.cssText = 'width: 100%; max-width: 800px; border-collapse: collapse; font-size: 14px;';
      table.innerHTML = `
        <thead>
          <tr>
            <th style="${cellStyle} font-weight: 600;">Token</th>
            <th style="${cellStyle} font-weight: 600;">Value</th>
            <th style="${cellStyle} font-weight: 600;">Swatch</th>
          </tr>
        </thead>
        <tbody></tbody>
      `;
      const tbody = table.querySelector('tbody')!;
      rows.forEach((row) => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
          <td class="color-token-cell" style="${cellStyle} cursor: pointer;" title="Click to copy" data-token="${row.token}">
            <code style="font-size: 13px;">${row.token}</code>
          </td>
          <td style="${cellStyle}">${row.value}</td>
          <td style="${cellStyle}"></td>
        `;
        const swatch = document.createElement('span');
        swatch.style.cssText = `width: 48px; height: 28px; border-radius: 4px; display: inline-block; vertical-align: middle; border: 1px solid ${isDark ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.08)'};`;
        swatch.style.background = row.value;
        tr.querySelector('td:last-child')?.appendChild(swatch);
        tbody.appendChild(tr);
      });
      return table;
    }

    return wrapper;
  }
};
