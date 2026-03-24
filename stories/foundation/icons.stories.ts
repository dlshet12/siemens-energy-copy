import type { Meta, StoryObj } from '@storybook/web-components';
import '../../packages/components/src/icon';

const meta: Meta = {
  title: 'Foundation/Icons',
  parameters: {
    layout: 'fullscreen',
    docs: {
      source: { type: 'none' },
      canvas: { sourceState: 'none' as const },
      codePanel: false
    }
  }
};

export default meta;

type Story = StoryObj;

const variants = ['filled', 'outlined', 'round', 'sharp', 'two-tone'] as const;

function createIconCell(name: string, variant: (typeof variants)[number]) {
  const td = document.createElement('td');
  td.style.cssText = 'padding: 8px 10px; border-bottom: 1px solid var(--color-neutrals-200, #cacaca); text-align: center;';
  const icon = document.createElement('nds-icon');
  icon.setAttribute('variant', variant);
  icon.setAttribute('size', 'lg');
  icon.setAttribute('label', name);
  icon.textContent = name;
  td.appendChild(icon);
  return td;
}

export const Catalog: Story = {
  render: () => {
    const root = document.createElement('div');
    root.style.cssText =
      'font-family: var(--font-family-base, DM Sans), system-ui, sans-serif; width: 100%; max-width: none; padding: 16px 20px 24px; box-sizing: border-box;';

    const heading = document.createElement('h2');
    heading.textContent = 'Material Icons Catalog';
    heading.style.cssText = 'margin: 0 0 8px; font-size: 20px;';

    const desc = document.createElement('p');
    desc.textContent =
      'Loaded from Google material-design-icons list. Filter icons and inspect all supported variants used across this project.';
    desc.style.cssText = 'margin: 0 0 16px; color: var(--color-neutrals-600, #3d3d3d);';

    const controls = document.createElement('div');
    controls.style.cssText = 'display: flex; gap: 12px; align-items: center; flex-wrap: wrap; margin-bottom: 12px;';
    controls.innerHTML = `
      <label style="display:flex; flex-direction:column; gap:4px; font-size:12px;">
        Search icon
        <input id="icon-search" type="text" placeholder="e.g. home, account, menu" style="min-width:260px; padding:8px 10px; border:1px solid var(--color-neutrals-300,#adadad); border-radius:6px;" />
      </label>
      <label style="display:flex; flex-direction:column; gap:4px; font-size:12px;">
        Rows to show
        <select id="icon-limit" style="min-width:120px; padding:8px 10px; border:1px solid var(--color-neutrals-300,#adadad); border-radius:6px;">
          <option value="100">100</option>
          <option value="300">300</option>
          <option value="600">600</option>
          <option value="1200">1200</option>
          <option value="2000">2000</option>
          <option value="all">All</option>
        </select>
      </label>
      <span id="icon-count" style="font-size:12px; color: var(--color-neutrals-500,#525252);"></span>
    `;

    const tableWrap = document.createElement('div');
    tableWrap.style.cssText =
      'max-height: calc(100vh - 220px); min-height: 55vh; overflow: auto; border: 1px solid var(--color-neutrals-200, #cacaca); border-radius: 8px; width: 100%;';

    const table = document.createElement('table');
    table.style.cssText = 'width: 100%; border-collapse: collapse; font-size: 13px;';
    table.innerHTML = `
      <thead style="position: sticky; top: 0; background: var(--color-neutrals-50, #f5f5f5); z-index: 1;">
        <tr>
          <th style="padding: 10px; border-bottom: 1px solid var(--color-neutrals-200, #cacaca); text-align:left; min-width: 220px;">Name</th>
          <th style="padding: 10px; border-bottom: 1px solid var(--color-neutrals-200, #cacaca);">Filled</th>
          <th style="padding: 10px; border-bottom: 1px solid var(--color-neutrals-200, #cacaca);">Outlined</th>
          <th style="padding: 10px; border-bottom: 1px solid var(--color-neutrals-200, #cacaca);">Round</th>
          <th style="padding: 10px; border-bottom: 1px solid var(--color-neutrals-200, #cacaca);">Sharp</th>
          <th style="padding: 10px; border-bottom: 1px solid var(--color-neutrals-200, #cacaca);">Two-tone</th>
        </tr>
      </thead>
      <tbody></tbody>
    `;

    tableWrap.appendChild(table);
    root.appendChild(heading);
    root.appendChild(desc);
    root.appendChild(controls);
    root.appendChild(tableWrap);

    const searchInput = controls.querySelector('#icon-search') as HTMLInputElement;
    const limitSelect = controls.querySelector('#icon-limit') as HTMLSelectElement;
    const countEl = controls.querySelector('#icon-count') as HTMLSpanElement;
    const tbody = table.querySelector('tbody') as HTMLTableSectionElement;

    let allIconNames: string[] = [];

    const renderRows = () => {
      const query = searchInput.value.trim().toLowerCase();
      const filtered = query ? allIconNames.filter((name) => name.includes(query)) : allIconNames;
      const limit = limitSelect.value === 'all' ? filtered.length : Number(limitSelect.value);
      const rows = filtered.slice(0, limit);

      tbody.innerHTML = '';
      rows.forEach((name) => {
        const tr = document.createElement('tr');

        const nameTd = document.createElement('td');
        nameTd.style.cssText =
          'padding: 8px 10px; border-bottom: 1px solid var(--color-neutrals-200, #cacaca); min-width: 220px; max-width: 380px; word-break: break-word;';
        nameTd.innerHTML = `<code style="white-space: normal; line-height: 1.35;">${name}</code>`;

        tr.appendChild(nameTd);
        variants.forEach((variant) => tr.appendChild(createIconCell(name, variant)));
        tbody.appendChild(tr);
      });

      countEl.textContent = `Showing ${rows.length} of ${filtered.length} filtered (${allIconNames.length} total).`;
    };

    fetch('/material-icons.json')
      .then((res) => res.json())
      .then((names: string[]) => {
        allIconNames = names;
        limitSelect.value = 'all';
        renderRows();
      })
      .catch(() => {
        countEl.textContent = 'Could not load icon catalog.';
      });

    searchInput.addEventListener('input', renderRows);
    limitSelect.addEventListener('change', renderRows);

    return root;
  }
};

