import { LitElement, html, css, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';

/**
 * Button component — attributes over JS API, events over callbacks.
 * Stable public API: variant, size, disabled, fullWidth; slot for content; ui-click event.
 */
@customElement('ui-button')
export class UiButton extends LitElement {
  static override styles = [
    css`
      :host {
        display: inline-flex;
        box-sizing: border-box;
      }
      .button {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        gap: var(--ui-Primitives-space-8);
        font-family: var(--ui-Primitives-type-family-base);
        font-weight: var(--ui-Primitives-type-weight-medium);
        line-height: var(--ui-Primitives-type-line-87);
        border: 1px solid transparent;
        border-radius: var(--ui-Primitives-space-4);
        cursor: pointer;
        transition: background-color 0.15s ease, border-color 0.15s ease, color 0.15s ease, box-shadow 0.15s ease;
        -webkit-tap-highlight-color: transparent;
      }
      .button:focus {
        outline: none;
      }
      .button:focus-visible {
        box-shadow: 0 0 0 2px var(--ui-Semantics-colors-surface-canvas), 0 0 0 4px var(--ui-Semantics-colors-overlay-ring-0);
      }
      .button--sm {
        padding: var(--ui-Primitives-space-8) var(--ui-Primitives-space-12);
        font-size: var(--ui-Primitives-type-size-87);
      }
      .button--md {
        padding: var(--ui-Primitives-space-12) var(--ui-Primitives-space-16);
        font-size: var(--ui-Primitives-type-size-100);
      }
      .button--lg {
        padding: var(--ui-Primitives-space-16) var(--ui-Primitives-space-20);
        font-size: var(--ui-Primitives-type-size-125);
      }
      .button--primary {
        background-color: var(--ui-Semantics-colors-action-primary-bg);
        color: var(--ui-Semantics-colors-action-primary-text);
        border-color: var(--ui-Semantics-colors-action-primary-bg);
      }
      .button--primary:hover:not(:disabled) {
        background-color: var(--ui-Semantics-colors-action-primary-hover-bg);
        border-color: var(--ui-Semantics-colors-action-primary-hover-bg);
      }
      .button--primary:active:not(:disabled) {
        background-color: var(--ui-Semantics-colors-action-primary-hover-bg);
        border-color: var(--ui-Semantics-colors-action-primary-hover-bg);
      }
      .button--secondary {
        background-color: var(--ui-Semantics-colors-surface-subtle);
        color: var(--ui-Semantics-colors-action-secondary-text);
        border-color: var(--ui-Semantics-colors-divider-default);
      }
      .button--secondary:hover:not(:disabled) {
        background-color: var(--ui-Semantics-colors-surface-canvas);
        color: var(--ui-Semantics-colors-action-secondary-hover);
        border-color: var(--ui-Semantics-colors-divider-default);
      }
      .button--secondary:active:not(:disabled) {
        background-color: var(--ui-Semantics-colors-surface-input);
      }
      .button:disabled {
        cursor: not-allowed;
        opacity: 0.6;
        color: var(--ui-Semantics-colors-text-tertiary);
      }
      .button--primary:disabled {
        background-color: var(--ui-Semantics-colors-action-primary-bg);
        border-color: var(--ui-Semantics-colors-action-primary-bg);
      }
      .button--secondary:disabled {
        background-color: var(--ui-Semantics-colors-surface-subtle);
        border-color: var(--ui-Semantics-colors-divider-default);
      }
      .button--full-width {
        width: 100%;
      }
    `,
  ];

  /** primary | secondary — maps to token-based appearance */
  @property({ type: String, reflect: true }) variant: 'primary' | 'secondary' = 'primary';

  /** sm | md | lg — spacing and typography from tokens */
  @property({ type: String, reflect: true }) size: 'sm' | 'md' | 'lg' = 'md';

  @property({ type: Boolean, reflect: true }) disabled = false;

  @property({ type: Boolean, attribute: 'full-width', reflect: true }) fullWidth = false;

  /** type attribute for form submit (button | submit | reset) */
  @property({ type: String }) type: 'button' | 'submit' | 'reset' = 'button';

  @property({ type: String }) label = '';
@property({ type: String }) color = 'primary';
@property({ type: Boolean }) isIcon = false;


  private _handleClick(e: MouseEvent) {
    if (this.disabled) {
      e.preventDefault();
      e.stopPropagation();
      return;
    }
    this.dispatchEvent(
      new CustomEvent('ui-click', {
        bubbles: true,
        composed: true,
        detail: { originalEvent: e },
      })
    );
  }

  private _handleKeyDown(e: KeyboardEvent) {
    if (this.disabled) return;
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      (e.target as HTMLElement).click();
    }
  }

  override render() {
    const sizeClass = `button--${this.size}` as 'button--sm' | 'button--md' | 'button--lg';
    const variantClass = `button--${this.variant}` as 'button--primary' | 'button--secondary';
    return html`
      <button
        part="button"
        class="button ${sizeClass} ${variantClass} ${this.fullWidth ? 'button--full-width' : ''}"
        ?disabled=${this.disabled}
        type=${this.type}
        aria-disabled=${this.disabled ? 'true' : nothing}
        @click=${this._handleClick}
        @keydown=${this._handleKeyDown}
      >
        <slot></slot>
      </button>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'ui-button': UiButton;
  }
}
