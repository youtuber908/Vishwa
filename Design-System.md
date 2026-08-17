# Vishwa — Design System (Phase 0)

> This document defines the visual and interaction language. It must be enforced consistently.

## 1. Principles
- Premium, minimal, modern.
- Intentional whitespace.
- Expensive typography (clean, readable, consistent rhythm).
- Subtle animations with meaningful state feedback.
- Accessible contrast.

## 2. Breakpoints (mobile-first)
- `sm`: 360–480px
- `md`: 481–768px
- `lg`: 769–1024px
- `xl`: 1025–1440px
- `2xl`: 1441px+

## 3. Typography Scale
Define a type scale (example targets):
- `display`: hero/title
- `h1`, `h2`, `h3` for headings
- `body`: primary text
- `small`: captions/metadata
- `mono`: for code-like values (if used)

Requirements:
- Ensure line-height and spacing for readability.
- Support scalable typography with user preference (Settings).

## 4. Spacing System
Use an 8pt grid:
- `0, 4, 8, 12, 16, 24, 32, 40, 48, 64...`

All component paddings/margins must use these tokens.

## 5. Color Tokens
Define semantic tokens (light/dark):
- `bg/Surface` (app background, cards)
- `text/primary`, `text/muted`
- `border/strong`, `border/subtle`
- `brand/primary`, `brand/secondary`
- `success`, `warning`, `danger`

Accessibility:
- Minimum contrast targets for body text.

## 6. Border Radius & Elevation
- Radius tokens: `sm`, `md`, `lg`, `xl`
- Elevation levels: 1–4 with subtle shadows.

## 7. Shadows / Blur
- Use subtle, non-distracting shadows.
- Prefer `box-shadow` and controlled alpha.

## 8. Animation System
Animation tokens:
- `dur-fast`: 120ms
- `dur-med`: 200–260ms
- `dur-slow`: 350ms

Curves:
- `ease-out`, `ease-in-out`

Rules:
- Always respect `prefers-reduced-motion`.
- Theme switching transitions must not create layout shifts.

## 9. Component Guidelines (library)
Core components (must be reusable):
- Button, IconButton
- Card, InteractiveCard
- Modal, Drawer
- Tabs, Accordion
- Tooltip
- SearchBar
- CommandPalette
- Toast
- ProgressBar, CircularProgress
- AchievementCard
- MapLegend
- Timeline
- Flashcard
- QuizCard / QuestionSurface
- Timer
- StatsChart wrappers
- LoadingSkeleton, ErrorScreen, EmptyState

State styling:
- hover, active, focus-visible, disabled, loading

## 10. Map Styling Guidelines
- Region hover: subtle outline/opacity.
- Selected region: stable, not jittery.
- Keyboard focus: visible ring or outline on region.
- Layer toggles: immediate visual feedback.

## 11. Dark/Light Theme
- Theme is implemented with CSS variables.
- Manual override persists.

## 12. Accessibility Rules
- Focus rings must be visible on all interactive elements.
- Map interactions must be keyboard operable.
- Text must scale.


