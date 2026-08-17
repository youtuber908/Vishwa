# Vishwa — Product Requirements Document (PRD) — Phase 0

## 1. Overview
**Product:** Vishwa — a premium interactive educational platform.

**V1 scope:** Mastering India’s geography.

**Non-scope:** Vishwa is **not** a quiz site. Practice exists, but learning is framed as exploration, visualization, interaction, and long-term retention.

**North star:** Learners achieve **complete mastery** through repeated, enjoyable retrieval and interaction.

## 2. Mission & Core Philosophy
Learning should feel like:
- exploring
- playing
- discovering
- experimenting
- solving
- interacting
- building intuition
- remembering naturally over time

All interactions should:
- teach something immediately
- support long-term retention
- keep curiosity high and pressure low

## 3. Universal Architecture (future-proof)
Vishwa is a **universal educational platform**.
- Geography is **Module One**.
- Architecture must support new modules: World geography, History, Mathematics, Science, Space, Languages, Coding, Economics, Environment, etc.

**Key requirement:** Never hardcode geography assumptions into core engines.
- Map engine and quiz engine must be generic.
- Data layer must be separated from UI.

## 4. Users
Primary user archetypes (V1):
- Casual learners: want exploration without stress.
- Geography enthusiasts: want depth and visualization.
- Competitive exam aspirants: want practice and progression.
- Parents/students: want safe, accessible learning.

## 5. Key Experiences in V1 India
### Home
- Hero / interactive background (subtle, premium)
- Continue learning
- Recommended lessons
- Current streak
- Progress summary
- Daily challenge
- Recently visited topics
- Explore categories
- Instant search (global)

### Explore
- Free exploration: click/hover/zoom/read.
- No scoring, no timer.

### India Module Hub (Dashboard)
- Interactive political map
- State/UT selection
- Information panel
- Organized access to topics (capitals, rivers, climate, culture, etc.)

### State selection → information panel
- Smooth selection feedback
- “Quick summary” first, then structured sections
- Related challenges + revision cards

### State detail page
- Timeline
- Charts/statistics
- Sections with interactive visuals (future-ready)
- Revision mode within page

### Learning modes (non-quiz framing)
- Explore mode
- Click-the-region / click-the-capital (guided)
- Fill-the-map (typing + drag/drop)
- Matching mode (state ↔ capital, river origin/destination)
- Multiple choice / timed / endless as optional later (but still mastery-first)
- Revision mode with spaced repetition
- Weak-area mode
- Reverse mode (capital → state)

## 6. Learning Science Requirements
Vishwa must implement evidence-informed learning principles:
- Active recall (practice + retrieval)
- Spaced repetition and forgetting curves (mastery decay)
- Interleaving (mixed topic practice)
- Immediate feedback and explanations
- Progressive difficulty and hints

## 7. Mastery Model Requirements (0–100)
Mastery is not “completion %”.

**Invariants (must-haves):**
- Mastery updates after attempts using accuracy + speed + retention signals.
- Mastery naturally decays over time if not revised.
- Users should not reach permanent 100%.

**Planned implementation approach:**
- A topic has mastery score and history of attempts.
- Scheduler decides next revision based on mastery and time since last success.

(Exact formula is defined in Data-Model.md.)

## 8. Progression, Gamification
Gamification must motivate learning, not addiction.

- XP awarded only for meaningful actions.
- Levels correspond to mastery progression.
- Achievements and badges are prestige-like (premium, not childish).
- Streaks encourage consistency without punishing missed days excessively.

## 9. Search Requirements
- Instant search across states/UTs/capitals/cities/rivers/mountains/parks/UNESCO/languages and future entities.
- Misspelling tolerance and intelligent ranking.
- Smooth animated results.
- Keyboard accessible.

## 10. PWA and Offline Requirements
Vishwa must be a first-class PWA.
- Installable
- Offline launch gracefully
- Offline-first local progress and previously loaded content

**Offline-first scope (V1):** best-effort.
- Full offline datasets may be limited initially.

## 11. Data & Storage Requirements
- Local browser storage for v1.
- Architecture must enable migration to SQLite/Supabase/Firebase/PostgreSQL.
- Storage is separated behind a repository/data-layer interface.

## 12. Accessibility Requirements (mandatory)
- Semantic HTML
- Screen reader support
- Keyboard navigation everywhere
- Proper focus management
- Color contrast compliance
- Reduced motion support
- Scalable typography
- ARIA only where necessary

Defined in Accessibility.md.

## 13. Non-Functional Requirements (NFR)
### Performance
- Mobile-first.
- Minimal JS and lazy loading.
- SVG map interaction must be smooth.

Budgets specified in Performance.md.

### Security & Privacy
- Minimal data collection.
- Clear privacy statements about local storage.
- Future auth-ready architecture.

### Reliability / Error Handling
- Friendly UI for empty results, offline states, and failures.
- No crashes.

## 14. Content & Dataset Quality Standards
- Never fabricate facts.
- Use accurate public datasets with verified licensing.
- Dataset sources documented in Licensing.md.

## 15. Risks & Mitigations
1. **SVG map performance risk:** optimize SVG and implement layer caching.
2. **Data licensing risk:** create licensing manifest and verify sources before shipping.
3. **Mastery complexity risk:** define mastery model explicitly and test with real scenarios.
4. **UX overwhelm risk:** progressive disclosure; keep explore flow minimal.
5. **Offline scope risk:** best-effort offline, not guaranteed full offline initially.

## 16. Definition of Done (Phase 0)
- All required documentation files created.
- Architecture decisions documented with reasoning.
- Data model and licensing approach defined.
- Accessibility + performance constraints specified.


