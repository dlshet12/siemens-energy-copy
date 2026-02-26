# @ui-platform/react

React adapters for UI Platform Web Components.

## Principle

- **Thin wrappers only**: forward refs to the underlying custom element; map React props to attributes and events.
- **No framework logic in core**: all behavior lives in `@ui-platform/core`.
- **Stable API**: same attribute/event contract as core; avoid breaking changes.

## Usage (when implemented)

```tsx
import { UiButton } from '@ui-platform/react';

<UiButton variant="primary" size="md" onUiClick={() => {}}>
  Submit
</UiButton>
```

## Implementation notes

- Use `createComponent` from `@lit/react` or hand-written wrappers that set attributes and listen for `ui-*` events.
- Map `onUiClick` → `ui-click` custom event.
- Publish as separate package so React apps depend only on `@ui-platform/react` (which peers `@ui-platform/core`).
