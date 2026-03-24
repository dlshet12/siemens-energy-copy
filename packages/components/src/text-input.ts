const template = document.createElement('template');
template.innerHTML = `
  <style>
    :host {
      display: inline-flex;
      flex-direction: column;
      gap: 0.25rem;
      font-family: var(--font-family-base, system-ui, sans-serif);
    }

    label {
      font-size: 0.875rem;
      color: var(--color-neutrals-500, #525252);
    }

    input {
      font: inherit;
      padding: 0.5rem 0.75rem;
      border-radius: 0.5rem;
      border: 1px solid var(--color-neutrals-200, #CACACA);
      background: var(--color-neutrals-100, #E6E6E6);
      color: var(--color-neutrals-950, #050505);
      outline: none;
      transition: border-color 120ms ease-out, box-shadow 120ms ease-out, background 120ms ease-out;
    }

    input::placeholder {
      color: var(--color-neutrals-400, #707070);
    }

    input:focus-visible {
      border-color: var(--color-purple-500, #824ACE);
      box-shadow: 0 0 0 1px var(--color-purple-500, #824ACE);
      background: var(--color-neutrals-100, #E6E6E6);
    }

    :host([state='error']) input {
      border-color: var(--color-red-500, #E01F22);
    }

    .helper-text {
      font-size: 0.75rem;
      color: var(--color-neutrals-500, #525252);
    }

    :host([state='error']) .helper-text {
      color: var(--color-red-500, #E01F22);
    }
  </style>
  <label part="label">
    <slot name="label"></slot>
  </label>
  <input part="input" />
  <div class="helper-text" part="helper-text">
    <slot name="helper"></slot>
  </div>
`;

export class TextInput extends HTMLElement {
  static get observedAttributes() {
    return ['value', 'placeholder', 'type', 'state'];
  }

  private _input: HTMLInputElement | null = null;

  constructor() {
    super();
    const root = this.attachShadow({ mode: 'open' });
    root.appendChild(template.content.cloneNode(true));
    this._input = root.querySelector('input');
  }

  connectedCallback() {
    ['value', 'placeholder', 'type'].forEach((prop) => this._upgradeProperty(prop));
  }

  attributeChangedCallback(name: string, _oldValue: string | null, newValue: string | null) {
    if (!this._input) return;

    switch (name) {
      case 'value':
        this._input.value = newValue ?? '';
        break;
      case 'placeholder':
        this._input.placeholder = newValue ?? '';
        break;
      case 'type':
        this._input.type = newValue || 'text';
        break;
    }
  }

  private _upgradeProperty(prop: string) {
    if (Object.prototype.hasOwnProperty.call(this, prop)) {
      const value = (this as any)[prop];
      delete (this as any)[prop];
      (this as any)[prop] = value;
    }
  }
}

if (!customElements.get('nds-input')) {
  customElements.define('nds-input', TextInput);
}
