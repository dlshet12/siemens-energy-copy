# @ui-platform/angular

Angular adapters for UI Platform Web Components.

## Principle

- Use Angular's **custom elements schema** so Angular treats `ui-*` tags as known elements.
- Map Angular outputs to `ui-*` custom events (e.g. `(uiClick)` → `ui-click`).
- No business logic in adapters; core remains framework-agnostic.

## Usage (when implemented)

- Add `CUSTOM_ELEMENTS_SCHEMA` or register each element.
- Use in templates: `<ui-button variant="primary" (uiClick)="onSubmit()">Submit</ui-button>`.
