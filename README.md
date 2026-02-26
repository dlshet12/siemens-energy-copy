# UI Platform

Enterprise Web Components design system: **framework-agnostic**, **token-driven**, **accessible**. Single source of truth for UI used across React, Angular, Vue, and Vanilla JS.

## Quick start

### 1. Install

```bash
npm install
```

### 2. Build design tokens

Tokens are built from **variables.json** only (`packages/tokens/variables.json`). Core components depend on the generated `--ui-*` CSS variables.

```bash
npm run build:tokens
```

### 3. Build core components

```bash
npm run build:core
```

### 4. Run Storybook

```bash
npm run storybook
```

Open the URL shown in the terminal (e.g. **http://localhost:6006** or **http://localhost:6007**). Ensure tokens are built first so components receive `--ui-*` CSS variables.

### 5. Use in an app

**Vanilla / any framework**

```html
<link rel="stylesheet" href="node_modules/@ui-platform/tokens/build/tokens.css" />
<script type="module" src="node_modules/@ui-platform/core/dist/index.js"></script>

<ui-button variant="primary" size="md">Submit</ui-button>

<script>
  document.querySelector('ui-button').addEventListener('ui-click', () => console.log('clicked'));
</script>
```

**With React/Angular/Vue**  
Use the adapter packages (`@ui-platform/react`, etc.) or use the custom elements directly; they work in any framework.

## Repo structure

| Path | Purpose |
|------|--------|
| `packages/tokens` | Design tokens (JSON → CSS vars, JSON, JS) |
| `packages/core` | Web Components (Lit); button, etc. |
| `packages/adapters/*` | React, Angular, Vue adapter stubs |
| `docs/` | Documentation |
| `tooling/` | Shared tooling |
| `ARCHITECTURE.md` | Decisions, rules, and rationale |

## Scripts (root)

- `npm run build` — build all workspaces
- `npm run build:tokens` — build tokens only
- `npm run build:core` — build core only
- `npm run storybook` — dev Storybook (from core)
- `npm run build:storybook` — static Storybook to `storybook-static/`

## Standards

- **Web Components only** in core (no React/Angular/Vue APIs).
- **Design tokens** for all styling; no hard-coded colors/spacing in components.
- **Attributes + slots + custom events** for a stable, framework-agnostic API.
- **Accessibility** built in (keyboard, ARIA, focus).

See **ARCHITECTURE.md** for full design and rationale.
