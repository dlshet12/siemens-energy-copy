import '../icon';

const template = document.createElement('template');
template.innerHTML = `
  <style>
    :host {
      --nds-btn-font-size: 0.875rem;
      --nds-btn-padding-y: 0.5rem;
      --nds-btn-padding-x: 1rem;

      display: inline-flex;
      align-items: center;
      justify-content: center;
      border-radius: 999px;

      font-family: var(--font-family-base, system-ui, sans-serif);
      font-weight: var(--font-weight-medium, 500);
      font-size: var(--nds-btn-font-size);

      padding: var(--nds-btn-padding-y) var(--nds-btn-padding-x);
      cursor: pointer;

      border: 1px solid transparent;
      background: var(--color-purple-500, #824ACE);
      color: var(--color-alphas-white-100, #FFFFFF);

      transition:
        background 150ms ease-out,
        border-color 150ms ease-out,
        color 150ms ease-out,
        box-shadow 150ms ease-out,
        opacity 150ms ease-out;

      user-select: none;
      box-sizing: border-box;
    }

    :host([size='small']) {
      --nds-btn-font-size: 0.75rem;
      --nds-btn-padding-y: 0.375rem;
      --nds-btn-padding-x: 0.75rem;
    }

    :host([size='medium']) {
      --nds-btn-font-size: 0.875rem;
      --nds-btn-padding-y: 0.5rem;
      --nds-btn-padding-x: 1rem;
    }

    :host([size='large']) {
      --nds-btn-font-size: 0.95rem;
      --nds-btn-padding-y: 0.625rem;
      --nds-btn-padding-x: 1.25rem;
    }

    :host([variant='primary']) {
      background: var(--color-purple-500, #824ACE);
      color: var(--color-alphas-white-100, #FFFFFF);
      border-color: transparent;
    }

    :host([variant='primary'][state='hover']),
    :host([variant='primary']:hover) {
      background: var(--color-purple-600, #7C38BC);
    }

    :host([variant='secondary']) {
      background: transparent;
      color: var(--color-purple-500, #824ACE);
      border-color: var(--color-purple-600, #7C38BC);
    }

    :host([variant='secondary'][state='hover']),
    :host([variant='secondary']:hover) {
      background: rgba(124, 56, 188, 0.10);
    }

    :host([variant='tertiary']) {
      background: transparent;
      color: var(--color-neutrals-500, #525252);
      border: none;
    }

    :host([variant='tertiary'][state='hover']),
    :host([variant='tertiary']:hover) {
      color: var(--color-neutrals-700, #2D2D2D);
      background: rgba(0, 0, 0, 0.05);
    }

    :host([variant='destructive']) {
      background: var(--color-red-500, #E01F22);
      color: var(--color-alphas-white-100, #FFFFFF);
      border-color: transparent;
    }

    :host([variant='destructive'][state='hover']),
    :host([variant='destructive']:hover) {
      background: var(--color-red-600, #C1001D);
    }

    :host([disabled]),
    :host([aria-disabled='true']) {
      opacity: 0.5;
      cursor: not-allowed;
      pointer-events: none;
    }

    button {
      all: unset;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
      width: 100%;
      height: 100%;
    }

    .icon {
      display: none;
      line-height: 1;
    }

    :host([with-icon]) .icon {
      display: inline-flex;
    }

    :host([variant='widget-action']) {
      border-radius: var(--spacing-4, 4px);
      border: var(--space-6, 1px) solid var(--surface-border, rgba(255, 255, 255, 0.12));
      background: var(
        --surface-elevated-light,
        linear-gradient(
          180deg,
          var(--colors-surface-raised-gradient-0, rgba(255, 255, 255, 0.06)) 0%,
          var(--colors-surface-raised-gradient-100, rgba(255, 255, 255, 0.04)) 100%
        )
      );
      box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.05);
      color: var(--color-alphas-white-100, #FFFFFF);
    }

    :host([variant='widget-action'][state='hover']),
    :host([variant='widget-action']:hover) {
      box-shadow: 0 6px 12px 0 rgba(0, 0, 0, 0.08);
    }
  </style>
  <button part="button" type="button" aria-label="Button">
    <nds-icon class="icon" size="sm" variant="filled" label="button icon">add</nds-icon>
    <slot></slot>
  </button>
`;

export class NdsButton extends HTMLElement {
  static get observedAttributes() {
    return ['variant', 'size', 'state', 'disabled', 'aria-disabled', 'with-icon', 'icon-name'];
  }

  private _button: HTMLButtonElement | null = null;
  private _iconEl: HTMLElement | null = null;

  constructor() {
    super();
    const root = this.attachShadow({ mode: 'open' });
    root.appendChild(template.content.cloneNode(true));
    this._button = root.querySelector('button');
    this._iconEl = root.querySelector('.icon');
  }

  connectedCallback() {
    // Upgrade any pre-set properties (pattern used across the repo).
    ['variant', 'size', 'state', 'disabled', 'withIcon', 'iconName'].forEach((prop) => this._upgradeProperty(prop));
    this._syncDisabled();
    this._syncIcon();
  }

  attributeChangedCallback(name: string, _oldValue: string | null, _newValue: string | null) {
    if (name === 'disabled' || name === 'aria-disabled') this._syncDisabled();
    if (name === 'with-icon' || name === 'icon-name') this._syncIcon();
  }

  private _syncDisabled() {
    if (!this._button) return;
    const disabledByAttr = this.hasAttribute('disabled');
    const ariaDisabled = this.getAttribute('aria-disabled') === 'true';
    const disabled = disabledByAttr || ariaDisabled;
    this._button.disabled = disabled;
  }

  private _upgradeProperty(prop: string) {
    if (Object.prototype.hasOwnProperty.call(this, prop)) {
      const value = (this as any)[prop];
      delete (this as any)[prop];
      (this as any)[prop] = value;
    }
  }

  private _syncIcon() {
    if (!this._iconEl) return;
    const iconName = this.getAttribute('icon-name') || 'add';
    this._iconEl.textContent = iconName;
    this._iconEl.setAttribute('label', iconName.replace(/_/g, ' '));
  }
}

if (!customElements.get('nds-button')) {
  customElements.define('nds-button', NdsButton);
}

