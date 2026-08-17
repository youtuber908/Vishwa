# Vishwa — Accessibility Standards (Phase 0)

## 1. Goals
- WCAG-oriented implementation.
- Mandatory: keyboard + screen reader access.
- Avoid color-only communication.

## 2. Core rules
### 2.1 Semantic HTML
- Use correct landmarks: header/nav/main/footer.
- Use buttons for actions, links for navigation.

### 2.2 Focus management
- Every interactive element must show focus-visible.
- Map selection must be focusable via keyboard.

### 2.3 Reduced motion
- Respect `prefers-reduced-motion`.
- Motion tokens must reduce animations appropriately.

### 2.4 Color contrast
- Semantic tokens must meet contrast requirements for text and UI controls.

### 2.5 Screen reader labeling
- Map regions require aria-labels and role semantics.
- Panels update should be announced when relevant (ARIA live regions only when necessary).

## 3. Map accessibility requirements
- Keyboard: tab to region focus (or provide an alternate list-based navigation)
- Enter/Space selects focused region
- Provide an accessible fallback:
  - State list with search that is equivalent to map selection

## 4. Form and input accessibility
- Type answer: label + help text.
- Drag/drop: provide alternative interaction mode (e.g., select-to-place).

## 5. Toasts, dialogs, and modals
- Ensure focus trap in modal.
- Escape closes.
- Toasts are not essential for critical info.

## 6. Testing checklist (mandatory)
- Keyboard navigation across all pages
- Screen reader pass on key flows
- Contrast check in light/dark
- Reduced motion check
- Responsive layout with zoom (browser text zoom)


