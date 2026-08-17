# Vishwa — Data Model (Phase 0)

## 1. Core Entities (universal)
### 1.1 Topic
A `Topic` represents a mastery-tracked unit of learning (e.g., a state, a capital, a river fact, a concept).

Fields:
- `id: string`
- `subjectId: string` (e.g., "geography")
- `moduleId: string` (e.g., "india")
- `type: 'region' | 'fact' | 'relationship' | 'skill' | ...` 
- `titleKey: string` (i18n reference)
- `aliases: string[]` (search)
- `relatedTopicIds: string[]`
- `metadata: Record<string, unknown>` (for extensibility)

### 1.2 Region (map-bound entity)
Used by map engine.

Fields:
- `id: string` (state/UT id)
- `labelKey: string`
- `geometryRef: string` (points to geometry in datasets)
- `neighbors: string[]` (optional)
- `center: { lat: number, lon: number }` or `centroidXY`
- `properties: Record<string, unknown>`

### 1.3 LearningObject / Lesson Step
A lesson is a sequence of learning steps that can use different interaction types.

Fields:
- `lessonId: string`
- `topicIds: string[]`
- `sequence: LearningStep[]`
- `prerequisites: string[]`

`LearningStep`:
- `type`: e.g., 'map-focus', 'reading-panel', 'practice', 'timeline-explore'
- `payload`: step-specific configuration (data-driven)

### 1.4 Challenge
A challenge is a set of questions/practice tasks with mode and difficulty.

Fields:
- `challengeId: string`
- `mode`: 'explore' | 'practice' | 'timed' | 'endless' | 'revision'
- `difficulty`: 'easy' | 'medium' | 'hard' | 'expert' | 'master'
- `topicIds: string[]`
- `questions: Question[]` or `questionPoolRef`
- `settings`: time limit, hint policy, scoring policy

### 1.5 QuestionAttempt
Stores attempt events for mastery and analytics.

Fields:
- `attemptId: string`
- `questionId: string`
- `challengeId: string`
- `topicId: string`
- `timestamp: number`
- `answer`: normalized answer payload
- `isCorrect: boolean`
- `confidence: 'low'|'med'|'high' | null`
- `timeSpentMs: number`
- `hintsUsed: number`
- `difficultyAtAttempt: string`

### 1.6 MasteryCard
Stores current mastery and scheduling data.

Fields:
- `topicId: string`
- `mastery: number` (0–100)
- `lastUpdatedAt: number`
- `decayAnchorAt: number`
- `nextReviewAt: number`
- `stability: number` (scheduler param)
- `history: MasteryHistory[]` (optional bounded)

## 2. Mastery Update Model (defined precisely)
Approach:
- Treat mastery as a confidence score.
- Update based on outcome and speed.
- Decay over time.

### 2.1 Inputs
- `accuracy`: correct/incorrect + partial credit if applicable
- `speedFactor`: based on timeSpentMs relative to difficulty expectations
- `hintsFactor`: penalize heavy hint usage mildly
- `recentWeight`: emphasize recent attempts

### 2.2 Outputs
- `deltaMastery` between -X and +Y
- Update `nextReviewAt` so that weaker topics get earlier reviews

### 2.3 Decay
- Every day/time, mastery decays toward a baseline.
- Successful revisions reset the decay anchor.

> Exact numeric parameters must be tuned during testing with V1 content.

## 3. Generic Question Schema
A universal question must separate:
- rendering UI needs
- grading logic
- feedback explanation

### 3.1 Question
Fields:
- `id: string`
- `type`: e.g., 'multiple-choice' | 'type-answer' | 'match-pairs' | 'map-click'
- `topicIds: string[]`
- `promptKey: string`
- `data`: type-specific configuration (data-driven)
- `answerSpec`: grading configuration
- `feedbackSpec`: correct/incorrect explanations and related topics
- `difficultyTags: string[]`

### 3.2 AnswerSpec
Must support:
- normalization (case-insensitive, common misspellings)
- accepted variants
- partial scoring where feasible

## 4. Search Index Data Model
- Precomputed index entries:
  - `entityId`
  - `entityType`
  - `displayLabel`
  - `tokens[]`
  - `aliases[]`
  - `boost` values based on entity importance

## 5. Local Storage Schema (v1)
- `progress/` topic mastery
- `attempts/` bounded history
- `profile/` settings
- `ui/` bookmarks/favorites
- `sync/` queue (future)

## 6. Extensibility for Future Modules
All of the above are universal:
- new module adds new `subjectId/moduleId`
- datasets provide new region/entities
- lessons/challenges reference topics and questions

No engine rewrite.


