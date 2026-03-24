/**
 * Foundation component: color swatch using a token (e.g. --color-purple-500).
 * Uses token CSS from JSON → Style Dictionary.
 */
const template = document.createElement('template');
template.innerHTML = `
  <style>
    :host {
      display: inline-block;
    }
    .swatch {
      width: 48px;
      height: 48px;
      border-radius: 4px;
      border: 1px solid rgba(0,0,0,0.08);
      background: var(--color-purple-500, #824ace);
    }
  </style>
  <div class="swatch" part="swatch"></div>
`;

export class ColorSwatch extends HTMLElement {
  static get observedAttributes() {
    return ['token'];
  }

  connectedCallback() {
    const root = this.attachShadow({ mode: 'open' });
    root.appendChild(template.content.cloneNode(true));
    this._swatch = root.querySelector('.swatch') as HTMLElement;
    this._updateColor();
  }

  attributeChangedCallback(name: string, _old: string | null, value: string | null) {
    if (name === 'token' && this._swatch) this._updateColor(value ?? 'purple-500');
  }

  private _swatch?: HTMLElement;

  private _updateColor(token?: string) {
    if (!this._swatch) return;
    const t = token ?? this.getAttribute('token') ?? 'purple-500';
    this._swatch.style.background = `var(--color-${t})`;
  }
}

if (!customElements.get('nds-color-swatch')) {
  customElements.define('nds-color-swatch', ColorSwatch);
}
