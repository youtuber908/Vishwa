# Phase 2 — Foundation Implementation Approach (Planning + Execution Plan)

> This is the approach document for Phase 2 (Foundation Implementation / App Shell). No UI/content feature code exists yet; this will define exactly what we implement before moving to Phase 3.

## 0) Phase 2 objective
Create a production-quality **app shell** that supports:
- routing + navigation framework
- theme engine (system detect + manual override, no layout shifts)
- settings infrastructure (audio + accessibility toggles)
- offline shell (service worker + graceful offline UI)

## 1) Architectural approach
### 1.1 Keep engines/UI separate
- App shell owns routing, global layout, theme provider, and global providers.
- Universal engines (map/learning) will be introduced later under `engines/`.

### 1.2 Data layer readiness
Even before real data, create a storage abstraction layer interface and local adapter so later milestones can plug in without refactors.

## 2) Implementation checklist (Phase 2)
1. Project scaffolding
   - package.json + TypeScript setup
   - build tool config
2. App shell
   - routes: Home/Explore/India/Challenges/Achievements/Statistics/Settings/Help (stubs for now but real layouts)
   - global layout components
3. Theme system
   - detect system theme
   - manual override persisted
   - smooth transitions respecting reduced motion
4. Settings page
   - toggles: theme mode, reduced motion option display, sound on/off (sound engine stub is acceptable only if it’s a safe interface)
5. Offline shell
   - service worker registration
   - caching strategy for app shell
   - offline fallback page/route
6. Accessibility baseline
   - focus-visible styles
   - keyboard navigation for nav

## 3) Decisions to lock before coding
- Choose rendering framework (React + TS is recommended).
- Choose router (URL-based routing preferred).
- Choose i18n approach (string dictionaries + locale switch later).
- Decide if sound is purely optional and disabled by default.

## 4) Non-goals for Phase 2
- No interactive map yet.
- No mastery system yet.
- No factual datasets yet.


