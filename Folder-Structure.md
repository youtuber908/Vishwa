# Vishwa — Recommended Folder Structure (Phase 0)

> The goal is to keep the codebase modular and scalable across subjects.

## Top-level
- `app/`: app shell, routing, global providers
- `components/`: reusable UI component library
- `features/`: subject/module features (India, World later)
- `engines/`: universal engines (map, learning, mastery)
- `repositories/`: data layer interfaces + adapters
- `services/`: domain services (recommendations, XP rules, scheduling orchestration)
- `datasets/`: content + datasets + metadata (data only)
- `assets/`: images/icons (non-data)
- `styles/`: global styles and theme variables
- `icons/`: icon set exports
- `utils/`: shared utilities
- `animations/`: reusable animation helpers
- `tests/`: unit/component/e2e tests
- `public/`: PWA assets (icons/splash) and static files
- `docs/`: additional documentation if needed

## Feature example
- `features/india/`
  - `routes/`: page routes
  - `components/`: India-specific UI components
  - `data/`: India module content references
  - `learning/`: India-specific lesson wiring (still uses universal engines)

## Engines example
- `engines/map/`
  - `renderers/`: SVG renderers, future canvas/tile
  - `interactions/`: pan/zoom/focus logic
  - `layering/`: layer registry

- `engines/learning/`
  - `question-types/`: generic question types
  - `grading/`: grading logic
  - `feedback/`: explanation rendering models

## Repositories example
- `repositories/storage/`
  - `StorageAdapter.ts`
  - `LocalStorageAdapter.ts`

## Styling
- `styles/theme/`: tokens + CSS variables
- `styles/components/`: component-level overrides (if needed)


