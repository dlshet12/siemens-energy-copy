# Docs

## tokens.css

**Path:** `docs/tokens.css`

This file is a **copy** of the generated design tokens CSS. It is updated when you run:

```bash
npm run tokens:build
npm run tokens:copy
```

Or from root:

```bash
npm run build
```

The **single source of truth** is the JSON token files in `packages/tokens/src/`. Style Dictionary converts them to CSS variables (e.g. `--color-purple-500`, `--spacing-8`). The built output lives at:

- `packages/tokens/dist/css/tokens.css`

You can import the tokens in any app:

```html
<link rel="stylesheet" href="path/to/tokens.css" />
```

Or in JS:

```js
import '@nds/tokens/dist/css/tokens.css';
```

### Using web components in other projects

1. **Load the token CSS** (so variables like `--color-purple-500`, `--spacing-8` are available on `:root`):

   ```html
   <link rel="stylesheet" href="path/to/tokens.css" />
   ```

2. **Load the component script** (registers custom elements with `nds-*` tags only):

   ```html
   <script type="module" src="path/to/components.js"></script>
   ```

3. **Use the custom elements** (only the tag name uses the `nds-` prefix):

   ```html
   <nds-button>Label</nds-button>
   <nds-input placeholder="Enter value"></nds-input>
   <nds-spacing-bar token="16"></nds-spacing-bar>
   <nds-color-swatch token="purple-500"></nds-color-swatch>
   ```

   Token CSS and folder/component names do not use the `nds` substring; only the HTML tag names do (e.g. `nds-button`, `nds-input`).
