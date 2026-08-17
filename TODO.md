# TODO — Vishwa

> Remaining work, grouped by milestone.

## Phase 0 — Research, PRD, and Foundations (Docs-only)
- [x] Create PRD.md (vision, requirements, NFR, risks)
- [x] Create Architecture.md (technical architecture blueprint)
- [x] Create Design-System.md (tokens, typography, spacing, components)
- [x] Create Folder-Structure.md (repo layout, module boundaries)
- [x] Create Roadmap.md (milestones + deliverables)
- [x] Create Data-Model.md (schemas)
- [x] Create Licensing.md (data sources + attribution plan)
- [x] Create Accessibility.md (a11y standards + required patterns)
- [x] Create Performance.md (budgets + map/SVG strategy)
- [x] Create Map-Engine-Spec.md (interfaces + rendering strategy)
- [x] Create Quiz-Engine-Spec.md (generic question engine interfaces)
- [x] Create Security-Privacy.md (local-first storage + security checklist)
- [x] Update CHANGELOG.md with Phase 0 completion notice


## Phase 1 — Information Architecture + UX Specs + Wireframes (Docs-only)
- [x] Wireframes (mobile-first): Home, Explore, India dashboard, State detail, Learning modes
- [x] User flows: onboarding, map interaction, revision loop, offline mode
- [x] Component inventory and reusability spec


## Phase 2 — Foundation Implementation (App Shell)
- [x] Scaffold Vishwa app (build system, routing, theming)
- [x] Theme engine (light/dark + reduced motion)
- [x] Settings page (accessibility + sound toggles)
- [x] Offline shell (service worker + caching strategy)
- [x] Global CSS — premium design system (Inter + Outfit fonts, light/dark tokens, cards, glass, skeleton, animations)
- [x] Button component — primary/secondary/ghost variants, size variants, press-down micro-interaction
- [x] Badge component — semantic tones (neutral/brand/success/warning/danger), premium pill style
- [x] AppShell — sticky glass header, full-width footer, responsive nav, mobile hamburger, theme cycle button, premium gradient logo

## Phase 3 — India Explorer Implementation
- [x] Data pipeline for India map + region metadata (GeoJSON → SVG conversion)
- [x] Interactive map MVP (36 region paths from Natural Earth data, selection, hover, keyboard selection, floating label)
- [x] State/UT info panel (sticky sidebar, capital initial avatar, facts grid, kind badge, search chips)
- [x] Search MVP (instant state/capital search with keyboard focus)
- [x] IndiaPage — premium hero with module badge, subtitle, responsive layout

## Phase 4 — Learning Engine Implementation
- [ ] Generic quiz/practice engine core
- [ ] Modes: Explore, Click State, Fill the Map (typing/drag-drop)
- [ ] Progressive hints + answer feedback
- [ ] Revision mode using spaced repetition scheduler

## Phase 5 — Progress & Mastery Implementation
- [ ] Mastery model + decay
- [ ] XP/levels + achievements
- [ ] Statistics dashboard + heatmap MVP
- [ ] Bookmarks + favorites

## Phase 6 — PWA + Offline Hardening
- [ ] PWA install flow + icons + splash screens
- [ ] Offline download management (v1 best-effort)
- [ ] Background sync architecture (future)

## Phase 7 — Polish + Release
- [ ] Accessibility audit + keyboard/screen-reader verification
- [ ] Performance audit (Lighthouse + interaction latency)
- [ ] QA + regression suite + e2e tests
- [ ] Documentation review + release checklist
- [ ] Production deployment pipeline

