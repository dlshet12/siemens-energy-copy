# UI Platform — Architecture

Enterprise-grade Web Components design system. Framework-agnostic, token-driven, accessible, and built for long-term maintenance.

---

## 1. Why Lit (and not Stencil)

We use **Lit** for the core component layer.

| Concern | Lit | Stencil |
|--------|-----|--------|
| **Output** | Standard Custom Elements + Shadow DOM | Custom Elements + optional framework outputs |
| **Coupling** | Zero framework coupling; pure W3C stack | Can emit React/Angular wrappers and runtime glue |
| **Bundle size** | ~5KB (lit only) | Larger; includes compiler and optional adapters |
| **Maintainability** | Minimal abstraction; follows specs | More moving parts (decorators, compiler, multiple targets) |
| **10+ year stability** | Aligns with Web Components standards; less to change | Compiler and multi-target pipeline add evolution surface |

**Conclusion**: For a *single source of truth* consumed by React, Angular, Vue, and Vanilla JS, we want one output: standard Web Components. Lit gives us that with minimal runtime and no framework-specific code in core. Stencil is a better fit when you want the toolchain to *generate* framework-specific bundles; we prefer hand-maintained or generated adapters in separate packages (`@ui-platform/react`, etc.) so core stays untouched.

---

## 2. Project structure

```
ui-platform/
├── packages/
│   ├── tokens/          # Design tokens — single source of styling
│   │   ├── variables.json  # Canonical token set ($value/$type, Dark/Light, refs)
│   │   └── build/       # Generated: CSS vars, JSON, JS
│   ├── core/            # Web Components (Lit)
│   │   ├── components/  # ui-button, ui-modal, etc.
│   │   ├── styles/      # Base / shared styles (token-only)
│   │   ├── utils/       # a11y, focus trap, etc.
│   │   └── index.ts     # Public API + side-effect registration
│   └── adapters/
│       ├── react/       # Thin React wrappers
│       ├── angular/     # Angular custom elements / directives
│       └── vue/         # Vue custom elements / wrappers
├── storybook/           # Static export (from core)
├── docs/
└── tooling/
```

- **tokens**: No hard-coded values in components; all styling comes from tokens (CSS variables, JSON, JS).
- **core**: Only Lit + TS; no React/Angular/Vue APIs. Components use attributes, slots, and custom events.
- **adapters**: Optional per-framework packages that map framework idioms to the same attribute/event contract.

---

## 3. Design tokens (non-negotiable)

- **Single source**: `packages/tokens/variables.json` only. Structure follows `$value`/`$type`; references use `{Primitives.*}` / `{Semantics.*}`; theme via `Dark`/`Light` in `$value`.
- **Outputs**: CSS custom properties (`:root` + `[data-theme="dark"]`), JSON, and ESM JS. No other token files; variables.json is the only input.
- **Categories**: Primitives (palette, space, type, breakpoint), Semantics (colors: surface, text, action, divider, status, overlay, border, input), Components (chips, avatar, toast, comment, etc.).
- **No hard-coded values in components**: Component styles use only `var(--ui-*)` matching the generated variable names from variables.json.

Build: `node build.js` in `packages/tokens`; reads `variables.json`, outputs to `build/`.

---

## 4. Component design rules

Every component must:

1. **Use custom elements** — e.g. `<ui-button>`, `<ui-modal>`.
2. **Configure via attributes** — not required to call methods for normal use.
3. **Use slots for content** — default slot and named slots where needed.
4. **Emit custom events** — e.g. `ui-click`, `ui-close`; no callback props in core.
5. **Be keyboard accessible** — Enter/Space for buttons; focus management for overlays.
6. **Follow ARIA best practices** — roles and states documented in Storybook.
7. **Support theming via CSS variables** — all visuals from tokens.
8. **Work in Shadow DOM** — encapsulated styles; no reliance on global CSS except token layer.

Example: `<ui-button variant="primary" size="md">Submit</ui-button>` and listen for `ui-click`.

---

## 5. API stability

- **Attributes over JS APIs**: Prefer configuration through attributes so that the same component works in any framework or vanilla HTML.
- **Events over callbacks**: Use `ui-*` custom events so that framework adapters can map to their event systems without core knowing.
- **Predictable naming**: `ui-` prefix; kebab-case for attributes; `ui-<action>` for events.
- **No breaking changes without versioning**: Follow semver; document deprecations.

---

## 6. Accessibility baseline

- Keyboard navigation is mandatory; no mouse-only interactions.
- Overlays (modals, popovers) trap focus and restore it on close.
- ARIA roles and states are documented per component in Storybook.
- Color contrast is enforced via token choices (tokens can be validated for WCAG).

---

## 7. Documentation and preview

- **Storybook** (in `packages/core`) is the primary component preview and docs.
- Each component has: usage example, props/attributes table, accessibility notes, Do/Don’t guidelines.
- Addon a11y is enabled for automated checks.

---

## 8. Future-proofing

- **Framework wrappers**: Can be generated or hand-written in `packages/adapters/*`; core does not change.
- **NPM**: Each package can be published (`@ui-platform/tokens`, `@ui-platform/core`, `@ui-platform/react`, etc.).
- **CDN**: Core and tokens can be loaded via ESM CDN (e.g. import maps + script type="module").
- **Multiple themes**: Token build can take theme files and output multiple CSS files or layers.
- **Evolution**: New components and tokens can be added without rewrites; adapters stay thin and stable.

---

## 9. Commands (summary)

From repo root:

- `npm install` — install all workspaces.
- `npm run build:tokens` — build tokens to `packages/tokens/build/`.
- `npm run build:core` — build core to `packages/core/dist/`.
- `npm run storybook` — run Storybook (from core).
- `npm run build:storybook` — output static Storybook to `storybook-static/`.

Ensure tokens are built before running Storybook so `--ui-*` variables are available.
