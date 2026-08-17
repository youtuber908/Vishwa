# Phase 2 — Design System Implementation Notes (No code)

> This doc supports Foundation Implementation (Phase 2). It defines how the design system becomes code: tokens → CSS variables, components → reusable primitives.

## 1) Token-to-code mapping
### 1.1 CSS variables
- Implement theme tokens as `:root` and `[data-theme="dark"]` sets.
- Use semantic tokens only (no raw colors in components).

Recommended variables:
- `--color-bg`, `--color-surface`, `--color-text`, `--color-text-muted`
- `--color-border-subtle`, `--color-border-strong`
- `--color-brand`, `--color-brand-2`
- `--color-success`, `--color-warning`, `--color-danger`

### 1.2 Typography
- Use `font-size` and `line-height` based on scale.
- Support scalable typography by mapping user setting to a multiplier.

### 1.3 Spacing
- Use 8pt grid for padding/margins.
- Provide helpers in code (e.g., `space-2` → 16px) only if necessary.

## 2) Motion system
- Use `prefers-reduced-motion` to disable or shorten non-essential animation.
- Theme switching must be subtle: fade background color transitions only.

## 3) Component primitives list (implementation-ready)
- `AppButton` (variants: primary/secondary/ghost, sizes)
- `IconButton`
- `Card`
- `InteractiveCard` (hover lift)
- `Modal` (focus trap)
- `Drawer` (slide + focus trap)
- `Tabs`
- `Accordion`
- `Tooltip` (keyboard accessible)
- `SearchBar`
- `Toast`
- `ProgressBar` and `CircularProgress`
- `LoadingSkeleton`
- `EmptyState`

## 4) Accessibility implementation notes
- Focus ring via `:focus-visible`.
- Use consistent aria patterns:
  - tabs: `role="tablist"`, `aria-controls`, etc.
  - accordion: `aria-expanded`.

## 5) Map styling notes
- Regions default:
  - `fill` based on political/neutral scheme
  - hover: outline/opacity
  - selected: strong outline + fill tint
- Ensure enough contrast in both themes.


