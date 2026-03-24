/**
 * Foundation component: visual bar whose width is a spacing token.
 * Uses token CSS (--spacing-*) from JSON → Style Dictionary.
 */
const template = document.createElement('template');
template.innerHTML = `
  <style>
    :host {
      display: block;
    }
    .bar {
      height: 24px;
      background: var(--color-purple-400, #a571f2);
      border-radius: 2px;
      width: calc(var(--spacing-8) * 1px);
    }
  </style>
  <div class="bar" part="bar"></div>
`;

export class SpacingBar extends HTMLElement {
  static get observedAttributes() {
    return ['token'];
  }

  connectedCallback() {
    const root = this.attachShadow({ mode: 'open' });
    root.appendChild(template.content.cloneNode(true));
    this._bar = root.querySelector('.bar') as HTMLElement;
    this._updateWidth();
  }

  attributeChangedCallback(name: string, _old: string | null, value: string | null) {
    if (name === 'token' && this._bar) this._updateWidth(value ?? '8');
  }

  private _bar?: HTMLElement;

  private _updateWidth(token?: string) {
    if (!this._bar) return;
    const t = token ?? this.getAttribute('token') ?? '8';
    this._bar.style.width = `calc(var(--spacing-${t}) * 1px)`;
  }
}

if (!customElements.get('nds-spacing-bar')) {
  customElements.define('nds-spacing-bar', SpacingBar);
}
