# @ui-platform/tokens

Design tokens are built from **variables.json only**. No other token files are used.

- **Source**: `variables.json` (structure: `$value`, `$type`; references `{Primitives.*}`, `{Semantics.*}`; theme via `Dark`/`Light` in `$value`).
- **Build**: `npm run build` or `node build.js`. Outputs to `build/`:
  - `tokens.css` — CSS custom properties for `:root` / `[data-theme="light"]` and `[data-theme="dark"]`
  - `tokens.json` — flattened resolved tokens
  - `tokens.js` / `tokens.d.ts` — ESM export and types

Components must use only `var(--ui-*)` names from this build (e.g. `--ui-Semantics-colors-action-primary-bg`, `--ui-Primitives-space-8`).
