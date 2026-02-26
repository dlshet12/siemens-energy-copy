# @ui-platform/vue

Vue adapters for UI Platform Web Components.

## Principle

- Vue 3 supports custom elements; map Vue props to attributes and `@ui-click` to `ui-click` event.
- Optional wrapper components for better DX (typed props, v-model if needed).
- Core stays framework-agnostic.

## Usage (when implemented)

```vue
<ui-button variant="primary" size="md" @ui-click="onSubmit">Submit</ui-button>
```
