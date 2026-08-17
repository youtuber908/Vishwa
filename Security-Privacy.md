# Vishwa — Security & Privacy (Phase 0)

## 1. Privacy principles
- Collect minimum necessary data.
- In v1, use local-only storage.
- Provide clear export/delete options (future-ready).

## 2. Threat model (v1)
- User device compromise is out of scope.
- Focus on:
  - XSS via dataset/content rendering
  - injection via search inputs
  - corrupted local storage

## 3. Data validation
- Validate search strings and limit lengths.
- Validate dataset schema at load time.

## 4. Content rendering safety
- Avoid rendering untrusted HTML.
- Use sanitized text rendering.

## 5. Offline data handling
- Ensure service worker caching does not exceed memory/disk limits.
- Versioned caches with cleanup.

## 6. Future authentication readiness
- All repositories are designed behind interfaces.
- Sync queue stored locally.

## 7. Analytics (optional)
- Make analytics opt-in.
- Provide event taxonomy with minimal PII.


