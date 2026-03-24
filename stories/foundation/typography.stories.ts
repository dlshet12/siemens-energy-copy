import type { Meta, StoryObj } from '@storybook/web-components';

const meta: Meta = {
  title: 'Foundation/Typography',
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

type TypographyRow = {
  token: string;
  preview: string;
  previewStyle: string;
  family: string;
  size: string;
  lineHeight: string;
  weight: string;
  category?: string;
};

const TYPOGRAPHY_ROWS: TypographyRow[] = [
  { token: 'display.xl', preview: 'Display-XL', previewStyle: 'font-size: 64px; line-height: 84px; font-weight: 700', family: 'DM Sans', size: '64px', lineHeight: '84px', weight: 'Bold', category: 'Display' },
  { token: 'display.lg', preview: 'Display-L', previewStyle: 'font-size: 56px; line-height: 72px; font-weight: 700', family: 'DM Sans', size: '56px', lineHeight: '72px', weight: 'Bold' },
  { token: 'display.md', preview: 'Display-M', previewStyle: 'font-size: 48px; line-height: 62px; font-weight: 700', family: 'DM Sans', size: '48px', lineHeight: '62px', weight: 'Bold' },
  { token: 'display.sm', preview: 'Display-S', previewStyle: 'font-size: 36px; line-height: 46px; font-weight: 600', family: 'DM Sans', size: '36px', lineHeight: '46px', weight: 'SemiBold' },
  { token: 'heading.01', preview: 'Heading-01', previewStyle: 'font-size: 24px; line-height: 30px; font-weight: 700', family: 'DM Sans', size: '24px', lineHeight: '30px', weight: 'Bold', category: 'Heading' },
  { token: 'heading.02', preview: 'Heading-02', previewStyle: 'font-size: 20px; line-height: 26px; font-weight: 700', family: 'DM Sans', size: '20px', lineHeight: '26px', weight: 'Bold' },
  { token: 'heading.03', preview: 'Heading-03', previewStyle: 'font-size: 16px; line-height: 22px; font-weight: 700', family: 'DM Sans', size: '16px', lineHeight: '22px', weight: 'Bold' },
  { token: 'heading.04', preview: 'Heading-04', previewStyle: 'font-size: 14px; line-height: 20px; font-weight: 700', family: 'DM Sans', size: '14px', lineHeight: '20px', weight: 'Bold' },
  { token: 'heading.05', preview: 'Heading-05', previewStyle: 'font-size: 12px; line-height: 18px; font-weight: 700', family: 'DM Sans', size: '12px', lineHeight: '18px', weight: 'Bold' },
  { token: 'body.lg', preview: 'Large', previewStyle: 'font-size: 16px; line-height: 24px; font-weight: 400', family: 'DM Sans', size: '16px', lineHeight: '24px', weight: 'Regular', category: 'Body' },
  { token: 'body.md', preview: 'Medium', previewStyle: 'font-size: 14px; line-height: 20px; font-weight: 400', family: 'DM Sans', size: '14px', lineHeight: '20px', weight: 'Regular' },
  { token: 'body.sm', preview: 'Small', previewStyle: 'font-size: 12px; line-height: 18px; font-weight: 400', family: 'DM Sans', size: '12px', lineHeight: '18px', weight: 'Regular' },
  { token: 'labels.lg', preview: 'Large', previewStyle: 'font-size: 16px; line-height: 20px; font-weight: 500', family: 'DM Sans', size: '16px', lineHeight: '20px', weight: 'Medium', category: 'Labels' },
  { token: 'labels.md', preview: 'Medium', previewStyle: 'font-size: 14px; line-height: 18px; font-weight: 500', family: 'DM Sans', size: '14px', lineHeight: '18px', weight: 'Medium' },
  { token: 'labels.sm', preview: 'Small', previewStyle: 'font-size: 12px; line-height: 16px; font-weight: 500', family: 'DM Sans', size: '12px', lineHeight: '16px', weight: 'Medium' },
  { token: 'captions.lg', preview: 'LARGE', previewStyle: 'font-size: 14px; line-height: 18px; font-weight: 400', family: 'DM Sans', size: '14px', lineHeight: '18px', weight: 'Regular', category: 'Captions' },
  { token: 'captions.md', preview: 'MEDIUM', previewStyle: 'font-size: 12px; line-height: 16px; font-weight: 400', family: 'DM Sans', size: '12px', lineHeight: '16px', weight: 'Regular' },
  { token: 'captions.sm', preview: 'SMALL', previewStyle: 'font-size: 10px; line-height: 14px; font-weight: 400', family: 'DM Sans', size: '10px', lineHeight: '14px', weight: 'Regular' }
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
    animation: type-fade-in 0.2s ease;
  `;
  const style = document.createElement('style');
  style.textContent = `@keyframes type-fade-in { from { opacity: 0; transform: translateX(-50%) translateY(8px); } to { opacity: 1; transform: translateX(-50%) translateY(0); } }`;
  document.head.appendChild(style);
  document.body.appendChild(toast);
  setTimeout(() => {
    toast.remove();
    style.remove();
  }, 1500);
}

export const TypographyDoc: Story = {
  render: () => {
    const wrapper = document.createElement('div');
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
          <th style="text-align:left; padding: 12px 16px; border-bottom: 1px solid var(--color-neutrals-200, #cacaca); font-weight: 600;">Preview</th>
          <th style="text-align:left; padding: 12px 16px; border-bottom: 1px solid var(--color-neutrals-200, #cacaca); font-weight: 600;">Family</th>
          <th style="text-align:left; padding: 12px 16px; border-bottom: 1px solid var(--color-neutrals-200, #cacaca); font-weight: 600;">Size</th>
          <th style="text-align:left; padding: 12px 16px; border-bottom: 1px solid var(--color-neutrals-200, #cacaca); font-weight: 600;">Line Height</th>
          <th style="text-align:left; padding: 12px 16px; border-bottom: 1px solid var(--color-neutrals-200, #cacaca); font-weight: 600;">Font Weight</th>
        </tr>
      </thead>
      <tbody></tbody>
    `;

    const tbody = table.querySelector('tbody')!;
    let lastCategory = '';
    TYPOGRAPHY_ROWS.forEach((row) => {
      if (row.category && row.category !== lastCategory) {
        lastCategory = row.category;
        const trCat = document.createElement('tr');
        trCat.innerHTML = `<td colspan="6" style="background: var(--color-neutrals-200, #cacaca); font-weight: 600; padding: 8px 16px;">${row.category}</td>`;
        tbody.appendChild(trCat);
      }
      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td class="type-token-cell" style="padding: 12px 16px; border-bottom: 1px solid var(--color-neutrals-200, #cacaca); cursor: pointer;" title="Click to copy" data-token="${row.token}">
          <code style="font-size: 13px;">${row.token}</code>
        </td>
        <td style="padding: 12px 16px; border-bottom: 1px solid var(--color-neutrals-200, #cacaca);"><span style="${row.previewStyle}">${row.preview}</span></td>
        <td style="padding: 12px 16px; border-bottom: 1px solid var(--color-neutrals-200, #cacaca);">${row.family}</td>
        <td style="padding: 12px 16px; border-bottom: 1px solid var(--color-neutrals-200, #cacaca);">${row.size}</td>
        <td style="padding: 12px 16px; border-bottom: 1px solid var(--color-neutrals-200, #cacaca);">${row.lineHeight}</td>
        <td style="padding: 12px 16px; border-bottom: 1px solid var(--color-neutrals-200, #cacaca);">${row.weight}</td>
      `;
      tbody.appendChild(tr);
    });

    table.addEventListener('click', (e: Event) => {
      const cell = (e.target as HTMLElement).closest?.('.type-token-cell') as HTMLElement | null;
      if (cell?.dataset?.token) {
        navigator.clipboard.writeText(cell.dataset.token);
        showCopiedToast();
      }
    });

    wrapper.appendChild(table);
    return wrapper;
  }
};
