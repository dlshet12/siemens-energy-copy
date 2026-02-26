# Tooling

Shared tooling and configs (e.g. ESLint, Prettier, custom-elements-manifest) can live here. The repo currently relies on:

- **TypeScript** (root and per-package tsconfig)
- **npm workspaces** (root package.json)
- **Design token build** (packages/tokens/build.js)
- **Storybook** (packages/core)

Future: CEM for `custom-elements.json`, lint rules for token-only styling, versioning scripts.
