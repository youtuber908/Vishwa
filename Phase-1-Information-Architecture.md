# Phase 1 — Information Architecture, UX Specs, Wireframes (Planning Docs)

> Phase 1 is documentation-only. No production code.

## 1) Global Information Architecture

### 1.1 Primary navigation (top + mobile bottom)
- **Home**
- **Explore** (free exploration + quick entry to map)
- **India** (Module One hub)
- **Challenges** (practice / mastery modes)
- **Achievements**
- **Statistics**
- **Settings**
- **Help**

### 1.2 Shared page layout (all modules)
- Header:
  - breadcrumb / current module indicator
  - global search entry point
  - theme indicator (optional)
- Main:
  - page title + short subtitle (what this page helps you master)
  - primary content
- Right/Bottom:
  - mastery snapshot + next recommended action

## 2) Core navigation rules
- Every screen answers immediately:
  - **Where am I?** (current page/module)
  - **What did I learn?** (recent mastery/progress)
  - **What remains?** (next revision or recommended step)
  - **What should I do next?** (one primary CTA)

## 3) User flows

### 3.1 First-time onboarding flow (under 2 minutes)
**Goal:** set learning preferences, language, theme, daily target.
1. Welcome screen (value proposition + premium feel)
2. Choose **Language** (English/Hindi first)
3. Choose **Theme** (system / light / dark)
4. Choose **Learning goal** (exploration / mastery / practice)
5. Choose **Daily target** (minutes or sessions)
6. Choose preferred interaction style:
   - Explore-first
   - Guided-first
   - Practice-first
7. Land on **Home** with personalized recommendations.

Accessibility requirements:
- fully keyboard navigable
- clear focus order
- no motion-critical transitions

### 3.2 Explore flow (free)
1. Learner enters **Explore**
2. Map appears with minimal overlays by default
3. Learner can:
   - hover/click regions
   - open info panel
   - zoom/pan
4. Map selection updates the “context” panel.
5. Secondary CTA: **Practice this topic** (optional)

### 3.3 Guided learning flow: “Click the State”
1. Learner clicks **Challenges → Click State**
2. Prompt shows a target (e.g., “Click Maharashtra”)
3. User selects a state via map interaction
4. Feedback:
   - immediate highlight (correct/incorrect)
   - explanation + related topics
5. Scheduler updates mastery; next prompt changes to weak topics more often.

### 3.4 Revision loop
1. Revision mode selects topics due for review
2. Learner does short interaction bursts (not long tests)
3. Feedback updates mastery and nextReviewAt
4. “Revision complete” shows what improved and what remains.

### 3.5 Offline flow (best-effort v1)
- If offline:
  - allow access to cached shell UI
  - allow map rendering only if cached datasets exist
  - show “offline content unavailable for some topics” without breaking app

## 4) Wireframes (mobile-first) — textual specs

### 4.1 Home (mobile)
Sections (vertical stack):
1. Hero:
   - title: “Vishwa”
   - subtitle: “Explore and master India’s geography—playfully.”
   - primary CTA: **Continue Learning**
2. Interactive background:
   - subtle animated map particles / regions outline (reduced motion safe)
3. Progress summary card:
   - today’s progress
   - current streak
   - mastery snapshot (top 3 strong, top 3 weak)
4. Daily challenge card:
   - one task with easy entry
5. Recommended lessons (3 cards):
   - Map basics
   - States & UTs
   - Capitals
6. Recently visited (horizontal list)
7. Explore categories grid (2x2):
   - States/UTs
   - Capitals
   - Rivers
   - Culture & UNESCO

### 4.2 Explore
1. Top bar: layer toggles icon + search icon
2. Map canvas full width
3. Bottom sheet info panel (collapsed)
4. Floating buttons:
   - Zoom in
   - Zoom out
   - Reset
5. Optional labels toggle

### 4.3 India dashboard
1. Header: “India”
2. Large map preview card with selection entry
3. Topic tiles grouped into sections:
   - Discover
   - Practice
   - Compare
4. Quick facts row (e.g., “28 States + 8 UTs” — factual; verify later)
5. “Start a lesson” CTA

### 4.4 State detail
1. Breadcrumb: India → Maharashtra
2. Quick summary (3-5 key facts)
3. Tabs:
   - Overview
   - Timeline
   - Statistics
   - Culture
   - Practice
   - Revision
4. Main visual: interactive map with selected state focused
5. Revision cards inline (if due)

### 4.5 Challenges page
1. Difficulty selection (Easy/Medium/Hard/Expert/Master later)
2. Mode tabs:
   - Explore
   - Click State
   - Click Capital
   - Fill the Map
   - Match Pairs
3. Each mode shows expected time/learning outcome.

## 5) Component inventory (Phase 1 planning)
- Global:
  - Button, IconButton, SegmentedControl
  - SearchBar (instant suggestions)
  - CommandPalette
  - Toast, Modal, Drawer
  - LoadingSkeleton, ErrorScreen, EmptyState
- Map:
  - InteractiveMapCanvas
  - MapControls (zoom/pan/reset)
  - LayerTogglePanel
  - RegionFocusHint
- Learning:
  - QuestionSurface
  - FeedbackPanel
  - HintStepper
  - ProgressBar / CircularProgress
  - MasteryDeltaChip
- Data display:
  - StatCard, CompareTable
  - Timeline component wrapper
  - Chart wrapper (later)

## 6) UX rules for premium feel
- All CTAs have a primary action and a secondary “more info”.
- Empty states always provide a next best action.
- Transitions:
  - route transitions use fade/slide with motion tokens
  - panel expansion uses height/opacity with reduced-motion variant

## 7) Accessibility requirements (Phase 1)
- Ensure map has keyboard fallback navigation:
  - a state list with search; selecting from list focuses map
- Ensure every bottom sheet has:
  - focus trap when open
  - escape to close
- Ensure color does not convey correctness alone; add icons/text.


