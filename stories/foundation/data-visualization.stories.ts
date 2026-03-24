import type { Meta, StoryObj } from '@storybook/web-components';

/**
 * Data visualization colors and guidelines.
 * Use semantic and categorical palettes for charts and dashboards.
 */
const meta: Meta = {
  title: 'Foundation/Data Visualization',
  parameters: {
    docs: {
      source: { type: 'none' },
      canvas: { sourceState: 'none' as const },
      codePanel: false,
      description: {
        component:
          'Our approach to data visualization emphasizes clarity and functionality. We provide guidelines and tools that help you represent data effectively and beautifully. Use color by data meaning for consistency and accessibility.'
      }
    }
  }
};

export default meta;

type Story = StoryObj;

const dataVizColors = [
  // Theme-aware categorical palette (changes under [data-theme="dark"]).
  // Mapped to our existing semantic chart labels (Primary/Success/Warning/Error/Info).
  { name: 'Primary', token: '--categorical-purple-200' },
  { name: 'Success', token: '--categorical-green-100' },
  { name: 'Warning', token: '--categorical-yellow-200' },
  { name: 'Error', token: '--categorical-red-50' },
  { name: 'Info', token: '--categorical-blue-50' }
];

export const BestPractices: Story = {
  render: () => {
    const section = document.createElement('div');
    section.style.cssText = 'font-family: var(--font-family-base); max-width: 640px;';
    section.innerHTML = `
      <h2 style="font-size: 20px; margin: 0 0 12px;">Best Practices</h2>
      <p style="color: var(--color-neutrals-700); margin: 0 0 16px; line-height: 1.5;">
        Simplicity, Consistency, Hierarchy, Context, Accessibility, Iteration.
      </p>
      <h3 style="font-size: 16px; margin: 24px 0 8px;">Categorical (Qualitative)</h3>
      <p style="color: var(--color-neutrals-700); margin: 0 0 16px; line-height: 1.5;">
        For distinct categories without inherent order. Use primary, green, yellow, red, blue and neutrals for different series.
      </p>
      <h3 style="font-size: 16px; margin: 24px 0 8px;">Sequential</h3>
      <p style="color: var(--color-neutrals-700); margin: 0 0 16px; line-height: 1.5;">
        For ordered data from low to high. Use a single hue from light (e.g. purple-100) to dark (e.g. purple-800).
      </p>
      <h3 style="font-size: 16px; margin: 24px 0 8px;">Diverging</h3>
      <p style="color: var(--color-neutrals-700); margin: 0 0 16px; line-height: 1.5;">
        For data with a critical central value. Use two hues meeting at a neutral middle (e.g. red → neutrals-200 → blue).
      </p>
      <h3 style="font-size: 16px; margin: 24px 0 8px;">Semantic (Alerts / Status)</h3>
      <p style="color: var(--color-neutrals-700); margin: 0 0 16px; line-height: 1.5;">
        For success, warning, error, and info. Use green-500, yellow-500, red-500, blue-500 consistently across light and dark themes.
      </p>
    `;
    return section;
  }
};

export const SemanticColors: Story = {
  render: () => {
    const rootStyle =
      typeof document !== 'undefined'
        ? getComputedStyle(document.documentElement)
        : null;

    const table = document.createElement('table');
    table.style.cssText = `
      width: 100%;
      max-width: 480px;
      border-collapse: collapse;
      font-family: var(--font-family-base);
      font-size: 14px;
    `;
    table.innerHTML = `
      <thead>
        <tr>
          <th style="text-align:left; padding: 12px; border-bottom: 1px solid var(--color-neutrals-200);">Token</th>
          <th style="text-align:left; padding: 12px; border-bottom: 1px solid var(--color-neutrals-200);">HEX</th>
          <th style="padding: 12px; border-bottom: 1px solid var(--color-neutrals-200); width: 80px;">Swatch</th>
        </tr>
      </thead>
      <tbody></tbody>
    `;
    const tbody = table.querySelector('tbody')!;
    dataVizColors.forEach((row) => {
      const hex = rootStyle?.getPropertyValue(row.token).trim() || '';

      const tr = document.createElement('tr');
      const swatch = document.createElement('div');
      swatch.style.cssText = `
        height: 32px;
        border-radius: 4px;
        background: var(${row.token});
        border: 1px solid rgba(0,0,0,0.08);
      `;
      tr.innerHTML = `
        <td style="padding: 12px; border-bottom: 1px solid var(--color-neutrals-200);"><code>${row.token}</code></td>
        <td style="padding: 12px; border-bottom: 1px solid var(--color-neutrals-200);">${hex}</td>
        <td style="padding: 12px; border-bottom: 1px solid var(--color-neutrals-200);"></td>
      `;
      tr.querySelector('td:last-child')?.appendChild(swatch);
      tbody.appendChild(tr);
    });
    return table;
  }
};
