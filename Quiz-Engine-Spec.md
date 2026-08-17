# Vishwa — Learning/Quiz Engine Specification (Phase 0)

## 1. Goals
- Universal across subjects.
- Supports multiple question types.
- Separates UI rendering from grading/feedback.
- Integrates mastery updates and spaced repetition.

## 2. Core Interfaces
### 2.1 QuestionRenderer
- `render(question, context): ReactNode`

### 2.2 Grader
- `grade(question, userAnswer): GradeResult`

### 2.3 FeedbackBuilder
- `buildFeedback(question, gradeResult, context): FeedbackModel`

## 3. Question Types (initial)
Must support:
- multiple-choice
- type-answer with normalization
- matching pairs
- map-click / hotspot selection (for geography modules)
- fill-the-map (drag/drop + typing)

## 4. Difficulty handling
- question config includes difficulty tags
- distractors generation is data-driven
- hints are progressive and policy-driven

## 5. Hint system
- `hintPolicy`: number of hints, reveal thresholds
- grading should incorporate hints used

## 6. Answer normalization
- case-insensitive
- trim whitespace
- accept common misspellings (dataset-driven)

## 7. Mastery integration
- grade result yields:
  - accuracy score
  - time factor
  - hint usage factor
- mastery scheduler updates topic mastery.

## 8. Feedback content model
Feedback includes:
- correct explanation
- interesting fact (optional)
- related topic recommendations
- next action suggestion

## 9. Accessibility
- question UI must be keyboard accessible
- drag/drop must have an alternative input mode


