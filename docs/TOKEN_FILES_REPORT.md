# Token Files Update Report

## What was done

1. **Replaced** all previous token sources in `packages/tokens/src/` with your updated files:
   - `Value.tokens.json` (primitives: color, font, spacing, radius, grid-layouts)
   - `dark.tokens.json` (Dark theme semantic tokens)
   - `light.tokens.json` (Light theme semantic tokens)
   - `token-resolver.json` (theme modifier: light/dark)

2. **CSS generation**  
   `tokens.css` is built from **Value.tokens.json** only (same as before). It contains all primitive variables (`--color-*`, `--font-*`, `--spacing-*`, `--radius-*`, `--grid-layouts-*`).  
   **Light and Dark** JSON files are stored in the repo for reference and possible future theme switching; they are not yet compiled into CSS (they reference primitives via Figma alias paths).

3. **Fix applied**  
   In `Value.tokens.json`, **radius.16** had `"$value": 6` (inconsistent with the key). It was corrected to `"$value": 16`.

4. **Components**  
   No code changes were required. Components and stories already use the same primitive token names (`--color-purple-500`, `--color-neutrals-200`, `--font-family-base`, etc.), which are unchanged in the new build.

---

## File issues / notes

### 1. **Value.tokens.json – radius.16** (fixed)
- **Issue:** Key `"16"` under `radius` had `"$value": 6`.
- **Fix:** Value set to `16` so it matches the key and scale.

### 2. **token-resolver.json – file references**
- Resolver uses **lowercase** filenames: `./light.tokens.json` and `./dark.tokens.json`.
- Your copies were saved as `light.tokens.json` and `dark.tokens.json` in `packages/tokens/src/`, so paths match. On **case-sensitive** file systems, `Light.tokens.json` / `Dark.tokens.json` would not resolve.

### 3. **Light/Dark tokens – alias resolution**
- **Light.tokens.json** and **Dark.tokens.json** use Figma-style aliases (`com.figma.aliasData.targetVariableName`, e.g. `"color/neutrals/900"`).
- The current build does **not** resolve these into CSS. Only **Value.tokens.json** is used to generate `tokens.css`.
- To support theme switching in CSS you would need an extra build step that:
  - Resolves those aliases against Value tokens, and  
  - Outputs theme-specific variables (e.g. under `:root` for light and `[data-theme="dark"]` for dark).

### 4. **Value.tokens.json – font.size / font.line units**
- Font size and line-height tokens use **numeric** values (e.g. `14`, `16`) without units.
- The generated CSS uses them as-is (e.g. `--font-size-14: 14`). In stylesheets you typically use something like `calc(var(--font-size-14) * 1px)` or a similar convention. No change was made to the token files for this.

### 5. **Overlay tokens – alpha values**
- In **Dark.tokens.json**, `overlay.purple-100` and `overlay.blue-100` have `"alpha": 0` in `$value`, so they are fully transparent. This may be intentional (e.g. “no overlay” state).

---

## Build commands

- **Tokens only:**  
  `npm run tokens:build`  
  (builds `packages/tokens/dist/css/tokens.css`)

- **Copy to docs:**  
  `npm run tokens:copy`  
  (copies that file to `docs/tokens.css` for Storybook)

- **Full build:**  
  `npm run build`  
  (tokens build + copy + components build)

---

## Summary

- Previous token sources were removed; only your four files are used.
- CSS is generated from **Value.tokens.json** and matches existing component/story token usage.
- One correction was made: **radius.16** value set to `16`.
- **Light/Dark** and **token-resolver** are in place for reference; semantic theme variables are not yet emitted to CSS. No other issues were found in the JSON structure or naming.
