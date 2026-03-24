const groupTemplate = document.createElement('template');
groupTemplate.innerHTML = `
  <style>
    :host {
      display: block;
      width: min(760px, 100%);
      max-width: 100%;
      box-sizing: border-box;
    }

    .stack {
      display: flex;
      flex-direction: column;
      gap: 0;
      width: 100%;
    }
  </style>
  <div class="stack">
    <slot></slot>
  </div>
`;

export class NdsAccordionGroup extends HTMLElement {
  static get observedAttributes() {
    return ['mode'];
  }

  private _slotEl: HTMLSlotElement | null = null;

  constructor() {
    super();
    const root = this.attachShadow({ mode: 'open' });
    root.appendChild(groupTemplate.content.cloneNode(true));
    this._slotEl = root.querySelector('slot');
  }

  connectedCallback() {
    if (!this.hasAttribute('mode')) this.setAttribute('mode', 'single');
    this.addEventListener('accordion-toggle', this._onAccordionToggle as EventListener);
    if (this._slotEl) this._slotEl.addEventListener('slotchange', this._onSlotChange);
    this._enforceSingleMode();
  }

  disconnectedCallback() {
    this.removeEventListener('accordion-toggle', this._onAccordionToggle as EventListener);
    if (this._slotEl) this._slotEl.removeEventListener('slotchange', this._onSlotChange);
  }

  attributeChangedCallback(name: string) {
    if (name === 'mode') this._enforceSingleMode();
  }

  private _onSlotChange = () => {
    this._enforceSingleMode();
  };

  private _onAccordionToggle = (event: CustomEvent<{ open?: boolean }>) => {
    if (this.getAttribute('mode') !== 'single') return;
    if (!event.detail?.open) return;

    const source = event.target as HTMLElement | null;
    const accordions = this._getAccordions();
    accordions.forEach((item) => {
      if (item !== source) item.removeAttribute('open');
    });
  };

  private _getAccordions(): HTMLElement[] {
    if (!this._slotEl) return [];
    return this._slotEl
      .assignedElements({ flatten: true })
      .filter((el) => el.tagName.toLowerCase() === 'nds-accordion') as HTMLElement[];
  }

  private _enforceSingleMode() {
    if (this.getAttribute('mode') !== 'single') return;
    const accordions = this._getAccordions();
    const opened = accordions.filter((item) => item.hasAttribute('open'));
    opened.slice(1).forEach((item) => item.removeAttribute('open'));
  }
}

if (!customElements.get('nds-accordion-group')) {
  customElements.define('nds-accordion-group', NdsAccordionGroup);
}

