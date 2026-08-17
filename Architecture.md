# Vishwa — Technical Architecture (Phase 0)

## 1. Design Goals
- **Scalability:** add modules without rewriting core engines.
- **Maintainability:** clear boundaries, reusable systems, minimal duplication.
- **Accessibility:** keyboard + screen reader usable from day one.
- **Performance:** fast interactions, minimal re-rendering, optimized assets.
- **Offline-first:** local progress and content; future sync-ready.
- **Modularity:** map engine, learning engine, data layer, UI component library.

## 2. High-Level Architecture
Vishwa is structured as a **frontend SPA** with:
- App Shell (routing, theme, layout)
- Feature modules (India module)
- Universal engines (map engine, learning/quiz engine, mastery scheduler)
- Data layer abstraction (storage adapters)
- Content layer (datasets + educational content)

### Key principle: Separation of concerns
- UI does not own business logic.
- Business logic is in engines/services.
- Storage is behind repository interfaces.
- Content is data-driven (config + datasets).

## 3. Recommended Tech Stack (guidance; can be adjusted)
Because the repository is greenfield, decisions must optimize long-term maintenance:
- TypeScript
- Modern bundler (Vite or equivalent)
- Component library strategy: custom components + minimal dependencies
- State management: local React state + context; or lightweight store if needed
- i18n framework compatible with future modules

*(Implementation choices will be finalized in later phases.)*

## 4. Core Modules (universal)
### 4.1 Map Engine (generic)
Responsibilities:
- render scalable interactive map (SVG-first)
- support zoom/pan/focus
- handle region selection (mouse/touch/keyboard)
- manage layers (labels, rivers, boundaries, overlays)
- integrate with search and learning modes

Must be data-driven:
- regions are defined by geometry + metadata
- layers are configured by layer registry

### 4.2 Learning/Practice Engine (generic)
Responsibilities:
- render question types using reusable components
- handle answer submission and grading
- support hint progression
- provide feedback with explanations
- integrate mastery and revision scheduling

Must be generic across subjects:
- question schema includes render hints and grading logic
- UI rendering is separated from grading model

### 4.3 Mastery & Revision Scheduler
Responsibilities:
- compute mastery update after attempts
- decay mastery over time
- select next revision items for weak-area and spaced repetition

Requires:
- attempt history per topic
- scheduling algorithm

### 4.4 Recommendation Engine
Responsibilities:
- recommend lessons/challenges based on mastery, weak topics, and recency

### 4.5 Gamification Engine
Responsibilities:
- XP rules
- levels
- achievements

### 4.6 Analytics/Event Tracking (optional)
- Must be privacy-aware.
- Can be disabled entirely.

## 5. Data Layer Abstraction
Introduce repository interfaces:
- `StorageAdapter` for key/value and structured entities
- `ProgressRepository`
- `ContentRepository`

Adapters:
- `LocalStorageAdapter` (v1)
- future: `SQLiteAdapter`, `SupabaseAdapter`, etc.

## 6. Content Layer (data-driven)
Content is represented as data objects:
- Topic definitions
- Region definitions
- Lessons (sequence of learning objects)
- Challenges and questions
- Explanations, misconceptions tags

UI renders from content schema.

## 7. Internationalization & Localization
- All user-facing strings are externalized.
- Dataset metadata should support localization for names/aliases when possible.

## 8. Theming System
- Detect system theme.
- Allow manual override.
- Smooth transition without layout shift.
- Reduced motion support.

## 9. Accessibility Architecture
- Focus management utilities.
- Keyboard interaction patterns for map and learning modes.
- Reduced-motion aware animations.

## 10. PWA Architecture
- Service worker with caching strategies.
- Offline UI states.
- Install prompt handling.

## 11. Security & Privacy
- local-only storage in v1.
- export/import future-ready.
- minimal data collection.
- validate inputs for search and data operations.

## 12. Folder-level boundaries (to be detailed in Folder-Structure.md)
- `app/` app shell
- `features/` module features
- `engines/` universal engines (map, learning, mastery)
- `datasets/` content and geometry assets + metadata
- `services/` domain services
- `repositories/` data adapters
- `components/` reusable UI library
- `styles/`, `icons/`, `utils/`, `tests/`

## 13. Design decision upgrades beyond original spec
- Prefer a **unified “LearningObject / Topic” model** across entities and subjects.
  - This avoids rebuilding logic when new subjects arrive.
  - Enables mastery/heatmap/challenges consistently.


