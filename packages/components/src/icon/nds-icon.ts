const template = document.createElement('template');
template.innerHTML = `
  <style>
    :host {
      --nds-icon-size: 24px;
      --nds-icon-color: currentColor;
      --nds-icon-weight: 400;
      --nds-icon-fill: 0;
      --nds-icon-grade: 0;
      --nds-icon-opsz: 24;

      display: inline-flex;
      align-items: center;
      justify-content: center;
      color: var(--nds-icon-color);
      line-height: 1;
      vertical-align: middle;
    }

    :host([size='sm']) { --nds-icon-size: 16px; --nds-icon-opsz: 20; }
    :host([size='md']) { --nds-icon-size: 20px; --nds-icon-opsz: 24; }
    :host([size='lg']) { --nds-icon-size: 24px; --nds-icon-opsz: 24; }
    :host([size='xl']) { --nds-icon-size: 32px; --nds-icon-opsz: 32; }

    .icon {
      font-size: var(--nds-icon-size);
      color: var(--nds-icon-color);
      user-select: none;
      font-style: normal;
      font-weight: normal;
      font-display: block;
      letter-spacing: normal;
      text-transform: none;
      white-space: nowrap;
      word-wrap: normal;
      direction: ltr;
      -webkit-font-smoothing: antialiased;
      text-rendering: optimizeLegibility;
      font-feature-settings: 'liga';
      font-variation-settings:
        'FILL' var(--nds-icon-fill),
        'wght' var(--nds-icon-weight),
        'GRAD' var(--nds-icon-grade),
        'opsz' var(--nds-icon-opsz);
    }

    .filled { font-family: 'Material Icons'; }
    .outlined { font-family: 'Material Icons Outlined'; }
    .round { font-family: 'Material Icons Round'; }
    .sharp { font-family: 'Material Icons Sharp'; }
    .two-tone { font-family: 'Material Icons Two Tone'; }
  </style>
  <span class="icon filled" part="icon" aria-hidden="true"><slot></slot></span>
`;

export class NdsIcon extends HTMLElement {
  static get observedAttributes() {
    return ['variant', 'fill', 'weight', 'grade', 'opsz', 'color', 'label'];
  }

  private _iconEl: HTMLSpanElement | null = null;

  constructor() {
    super();
    const root = this.attachShadow({ mode: 'open' });
    root.appendChild(template.content.cloneNode(true));
    this._iconEl = root.querySelector('.icon');
  }

  connectedCallback() {
    ['variant', 'fill', 'weight', 'grade', 'opsz', 'color', 'label'].forEach((prop) => this._upgradeProperty(prop));
    this._normalizeIconTextAndVariant();
    this._applyVariant();
    this._applyA11y();
    this._applyStyleVars();
  }

  attributeChangedCallback(name: string) {
    if (name === 'variant') this._applyVariant();
    if (name === 'label') this._applyA11y();
    if (name === 'fill' || name === 'weight' || name === 'grade' || name === 'opsz' || name === 'color') this._applyStyleVars();
  }

  private _applyVariant() {
    if (!this._iconEl) return;
    const variant = (this.getAttribute('variant') || 'filled').toLowerCase();
    const allowed = ['filled', 'outlined', 'round', 'sharp', 'two-tone'];
    const normalized = allowed.includes(variant) ? variant : 'filled';
    this._iconEl.className = `icon ${normalized}`;
  }

  private _normalizeIconTextAndVariant() {
    // Accept developer-friendly names like "home_filled", "home_outlined", etc.
    // Material ligature text should be base name ("home"), while style comes from variant/font.
    const raw = (this.textContent || '').trim();
    if (!raw) return;

    const mappings: Array<{ suffix: string; variant: string }> = [
      { suffix: '_filled', variant: 'filled' },
      { suffix: '_outlined', variant: 'outlined' },
      { suffix: '_round', variant: 'round' },
      { suffix: '_sharp', variant: 'sharp' },
      { suffix: '_two_tone', variant: 'two-tone' }
    ];

    const hit = mappings.find((m) => raw.endsWith(m.suffix));
    if (!hit) return;

    const baseName = raw.slice(0, -hit.suffix.length).trim();
    if (baseName) this.textContent = baseName;

    // Only infer variant when consumer did not provide one explicitly.
    if (!this.hasAttribute('variant')) {
      this.setAttribute('variant', hit.variant);
    }
  }

  private _applyA11y() {
    if (!this._iconEl) return;
    const label = this.getAttribute('label');
    if (label) {
      this._iconEl.setAttribute('aria-hidden', 'false');
      this._iconEl.setAttribute('role', 'img');
      this._iconEl.setAttribute('aria-label', label);
    } else {
      this._iconEl.setAttribute('aria-hidden', 'true');
      this._iconEl.removeAttribute('role');
      this._iconEl.removeAttribute('aria-label');
    }
  }

  private _applyStyleVars() {
    if (this.hasAttribute('fill')) this.style.setProperty('--nds-icon-fill', this.getAttribute('fill') || '0');
    if (this.hasAttribute('weight')) this.style.setProperty('--nds-icon-weight', this.getAttribute('weight') || '400');
    if (this.hasAttribute('grade')) this.style.setProperty('--nds-icon-grade', this.getAttribute('grade') || '0');
    if (this.hasAttribute('opsz')) this.style.setProperty('--nds-icon-opsz', this.getAttribute('opsz') || '24');
    if (this.hasAttribute('color')) this.style.setProperty('--nds-icon-color', this.getAttribute('color') || 'currentColor');
  }

  private _upgradeProperty(prop: string) {
    if (Object.prototype.hasOwnProperty.call(this, prop)) {
      const value = (this as any)[prop];
      delete (this as any)[prop];
      (this as any)[prop] = value;
    }
  }
}

if (!customElements.get('nds-icon')) {
  customElements.define('nds-icon', NdsIcon);
}

