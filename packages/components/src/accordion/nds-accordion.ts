import '../icon';

const template = document.createElement('template');
template.innerHTML = `
  <style>
    :host {
      --nds-accordion-padding-x: 16px;
      --nds-accordion-padding-y: 12px;
      --nds-accordion-font-size: 14px;
      --nds-accordion-radius: var(--radius-8, 8px);
      --nds-accordion-border-color: var(--colors-action-primary-muted-bg, var(--color-neutrals-200, #CACACA));
      --nds-accordion-header-bg: var(--surface-elevated-light, var(--color-neutrals-50, #F5F5F5));
      --nds-accordion-hover-bg: rgba(0, 0, 0, 0.03);
      --nds-accordion-panel-bg: transparent;
      --nds-accordion-title-color: var(--colors-text-primary, var(--color-neutrals-900, #0D0D0D));
      --nds-accordion-panel-color: var(--colors-text-secondary, var(--color-neutrals-700, #2D2D2D));

      display: block;
      width: 100%;
      max-width: 100%;
      font-family: var(--font-family-base, system-ui, sans-serif);
      border: 1px solid var(--nds-accordion-border-color);
      border-radius: var(--nds-accordion-radius);
      background: var(--nds-accordion-header-bg);
      color: var(--nds-accordion-title-color);
      overflow: hidden;
      box-sizing: border-box;
    }

    :host-context([data-theme='dark']) {
      --nds-accordion-border-color: var(--colors-action-primary-muted-bg, rgba(255, 255, 255, 0.12));
      --nds-accordion-header-bg: var(
        --surface-elevated-light,
        linear-gradient(
          90deg,
          var(--colors-surface-raised-gradient-0, rgba(255, 255, 255, 0.06)) 0%,
          var(--colors-surface-raised-gradient-100, rgba(255, 255, 255, 0.04)) 100%
        )
      );
      --nds-accordion-title-color: var(--colors-text-primary, var(--color-alphas-white-100, #FFFFFF));
      --nds-accordion-panel-color: var(--colors-text-primary, #FFF);
      --nds-accordion-hover-bg: rgba(255, 255, 255, 0.03);
    }

    :host([size='small']) {
      --nds-accordion-padding-x: 12px;
      --nds-accordion-padding-y: 10px;
      --nds-accordion-font-size: 12px;
    }

    :host([size='medium']) {
      --nds-accordion-padding-x: 16px;
      --nds-accordion-padding-y: 12px;
      --nds-accordion-font-size: 14px;
    }

    :host([size='large']) {
      --nds-accordion-padding-x: 20px;
      --nds-accordion-padding-y: 14px;
      --nds-accordion-font-size: 16px;
    }

    .trigger {
      all: unset;
      box-sizing: border-box;
      width: 100%;
      min-width: 0;
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 12px;
      cursor: pointer;
      padding: var(--nds-accordion-padding-y) var(--nds-accordion-padding-x);
      font-size: var(--nds-accordion-font-size);
      font-weight: var(--font-weight-medium, 500);
      color: var(--nds-accordion-title-color);
      background: var(--nds-accordion-header-bg);
    }

    .trigger:hover {
      background: var(--nds-accordion-hover-bg);
    }

    .header-left {
      min-width: 0;
      display: inline-flex;
      align-items: center;
      gap: 8px;
      flex-wrap: wrap;
    }

    .title {
      min-width: 0;
      overflow-wrap: anywhere;
    }

    .link {
      font-size: calc(var(--nds-accordion-font-size) - 1px);
      color: var(--colors-action-secondary-text, var(--color-purple-600, #7C38BC));
      text-decoration: underline;
      text-decoration-thickness: 1px;
      cursor: pointer;
    }

    .chevron {
      transition: transform 150ms ease;
      color: var(--colors-action-primary-muted-text, var(--color-neutrals-500, #525252));
      flex: 0 0 auto;
    }

    :host([open]) .chevron {
      transform: rotate(180deg);
    }

    .panel {
      display: none;
      box-sizing: border-box;
      width: 100%;
      padding: var(--nds-accordion-padding-y) var(--nds-accordion-padding-x) calc(var(--nds-accordion-padding-y) + 2px);
      font-size: var(--nds-accordion-font-size);
      line-height: 1.5;
      color: var(--nds-accordion-panel-color);
      border-top: 1px solid var(--nds-accordion-border-color);
      background: var(--nds-accordion-panel-bg);
    }

    :host([open]) .panel {
      display: block;
    }

    :host([disabled]),
    :host([aria-disabled='true']) {
      opacity: 0.55;
      pointer-events: none;
    }
  </style>
  <button class="trigger" part="trigger" type="button" aria-expanded="false" aria-controls="panel">
    <span class="header-left">
      <span class="title" part="title"></span>
      <a class="link" part="link" target="_blank" rel="noreferrer noopener"></a>
    </span>
    <nds-icon class="chevron" size="sm" variant="filled" label="expand">expand_more</nds-icon>
  </button>
  <div id="panel" class="panel" part="panel" role="region">
    <slot></slot>
  </div>
`;

export class NdsAccordion extends HTMLElement {
  static get observedAttributes() {
    return ['title', 'open', 'disabled', 'aria-disabled', 'size', 'link-text', 'link-href'];
  }

  private _trigger: HTMLButtonElement | null = null;
  private _titleEl: HTMLSpanElement | null = null;
  private _panelEl: HTMLDivElement | null = null;
  private _linkEl: HTMLAnchorElement | null = null;

  constructor() {
    super();
    const root = this.attachShadow({ mode: 'open' });
    root.appendChild(template.content.cloneNode(true));
    this._trigger = root.querySelector('.trigger');
    this._titleEl = root.querySelector('.title');
    this._panelEl = root.querySelector('.panel');
    this._linkEl = root.querySelector('.link');
  }

  connectedCallback() {
    ['title', 'open', 'disabled', 'size', 'linkText', 'linkHref'].forEach((prop) => this._upgradeProperty(prop));

    if (this._trigger) this._trigger.addEventListener('click', this._onToggle);

    if (!this.hasAttribute('size')) this.setAttribute('size', 'medium');
    this._syncTitle();
    this._syncLink();
    this._syncA11y();
  }

  disconnectedCallback() {
    if (this._trigger) this._trigger.removeEventListener('click', this._onToggle);
  }

  attributeChangedCallback(name: string) {
    if (name === 'title') this._syncTitle();
    if (name === 'link-text' || name === 'link-href') this._syncLink();
    if (name === 'open' || name === 'disabled' || name === 'aria-disabled') this._syncA11y();
  }

  private _onToggle = () => {
    if (this.hasAttribute('disabled') || this.getAttribute('aria-disabled') === 'true') return;
    let open = false;
    if (this.hasAttribute('open')) this.removeAttribute('open');
    else {
      this.setAttribute('open', 'true');
      open = true;
    }

    this.dispatchEvent(
      new CustomEvent('accordion-toggle', {
        bubbles: true,
        composed: true,
        detail: { open }
      })
    );
  };

  private _syncTitle() {
    if (!this._titleEl) return;
    this._titleEl.textContent = this.getAttribute('title') || 'This is panel header';
  }

  private _syncLink() {
    if (!this._linkEl) return;
    const text = this.getAttribute('link-text') || '';
    const href = this.getAttribute('link-href') || '#';

    if (!text) {
      this._linkEl.style.display = 'none';
      this._linkEl.textContent = '';
      this._linkEl.removeAttribute('href');
      return;
    }

    this._linkEl.style.display = 'inline';
    this._linkEl.textContent = text;
    this._linkEl.setAttribute('href', href);
  }

  private _syncA11y() {
    if (!this._trigger || !this._panelEl) return;
    const isOpen = this.hasAttribute('open');
    this._trigger.setAttribute('aria-expanded', String(isOpen));

    const disabled = this.hasAttribute('disabled') || this.getAttribute('aria-disabled') === 'true';
    this._trigger.disabled = disabled;
    this._trigger.setAttribute('aria-disabled', String(disabled));
  }

  private _upgradeProperty(prop: string) {
    if (Object.prototype.hasOwnProperty.call(this, prop)) {
      const value = (this as any)[prop];
      delete (this as any)[prop];
      (this as any)[prop] = value;
    }
  }
}

if (!customElements.get('nds-accordion')) {
  customElements.define('nds-accordion', NdsAccordion);
}

