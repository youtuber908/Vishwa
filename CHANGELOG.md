# Changelog

## Unreleased
- Completed Phase 0 docs baseline (PRD, Architecture, Design System, Folder Structure, Roadmap, Data Model, Licensing, Accessibility, Performance, Map Engine Spec, Quiz Engine Spec, Security/Privacy).
- Updated TODO.md and CHANGELOG.md tracking.
- Repaired Vishwa foundation: updated `package.json` for modern Vite+React, added missing runtime deps, regenerated `package-lock.json` via fresh install, and restored working app-shell/router/theme/PWA scaffolding.
- **Premium IOQM-inspired design system implementation (Phase 2–3):**
  - Global CSS: Inter + Outfit fonts, refined light/dark color tokens, card/glass/skeleton/utility classes, CSS variable spacing/animation system, reduced-motion support.
  - Button component: primary/secondary/ghost variants, size variants (sm/md/lg), press-down micro-interaction.
  - Badge component: semantic tone system with pill style.
  - AppShell: sticky glassmorphism header with gradient brand logo, responsive navigation, mobile hamburger menu, theme cycle button.
  - All pages upgraded: HomePage premium hero + feature grid cards; IndiaPage module badge + responsive layout; SettingsPage theme radio cards + accessibility panel; ChallengesPage/AchievementsPage/StatisticsPage/HelpPage/ExplorePage with card design system and consistent visual language.
  - IndiaExplorer: IOQM-inspired info panel with capital initial avatar, kind-colored badges, facts grid, search chip results, smooth transitions.
  - IndiaMap: hover glow, keyboard selection support, floating selected label, premium state colors using theme tokens.
  - OfflineFallbackPage: centered premium offline UI.
  - index.html: added Inter + Outfit font preloads, dual theme-color meta tags, apple-mobile-web-app meta.




