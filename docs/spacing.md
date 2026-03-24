# Noedra Design System — Spacing

**Spacing**

Spacing tokens in the Noedra Design System define a consistent scale for layout, padding, margin, and gap. Use these tokens to keep alignment and rhythm consistent across all components and pages.

| Token       | rem   | Base unit multiplier | px   | Example |
|------------|-------|----------------------|------|---------|
| spacing.00 | 0     | 0                    | 0    | —       |
| spacing.2  | 0.125 | 0.5                  | 2    | █       |
| spacing.4  | 0.25  | 1                    | 4    | ██      |
| spacing.8  | 0.5   | 2                    | 8    | ████    |
| spacing.12 | 0.75  | 3                    | 12   | ██████  |
| spacing.16 | 1     | 4                    | 16   | ████████|
| spacing.24 | 1.5   | 6                    | 24   | (12px)  |
| spacing.32 | 2     | 8                    | 32   | (16px)  |
| spacing.40 | 2.5   | 10                   | 40   | (20px)  |
| spacing.48 | 3     | 12                   | 48   | (24px)  |
| spacing.64 | 4     | 16                   | 64   | (32px)  |
| spacing.80 | 5     | 20                   | 80   | (40px)  |
| spacing.96 | 6     | 24                   | 96   | (48px)  |
| spacing.112| 7     | 28                   | 112  | (56px)  |
| spacing.128| 8     | 32                   | 128  | (64px)  |
| spacing.160| 10    | 40                   | 160  | (80px)  |

*In the live doc (Storybook), the Example column shows a purple bar whose length equals the px value.*

## CSS usage

Use the design tokens in your styles:

- `var(--spacing-0)`, `var(--spacing-2)`, `var(--spacing-4)`, … `var(--spacing-160)`
- Values are unitless; use with `px`: `calc(var(--spacing-16) * 1px)` or with `rem`: `calc(var(--spacing-16) * 0.0625rem)` (assuming 16px base).
