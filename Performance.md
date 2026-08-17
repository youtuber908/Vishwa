# Vishwa — Performance Strategy (Phase 0)

## 1. Performance budgets (targets)
To maintain “instantaneous” feel:
- LCP (mobile): < 2.5s on 4G equivalent
- TTI or INP: < 200ms for common interactions
- JS bundle gzipped: target under 200KB for initial route (enforce in CI later)

## 2. Rendering strategy for the map
- SVG first, but optimized:
  - minify paths
  - avoid per-frame DOM mutations
  - precompute region paths and reuse DOM nodes
- Layer toggles must toggle visibility via CSS classes (not re-rendering all geometry)
- Use requestAnimationFrame for controlled interactions

## 3. Interaction latency
Map interactions (hover/select/zoom) must feel under ~50ms before perceptible feedback.
- Debounce expensive operations.
- Cache computed transforms.

## 4. Data loading strategy
- Split content by route and by feature.
- Lazy load state detail content.
- Preload likely next content (small prefetch).

## 5. Search performance
- Build a precomputed search index at build-time.
- Use a fast fuzzy matcher with bounds.
- Avoid blocking main thread; optionally use web worker for large indices.

## 6. Animations
- Prefer transforms/opacity.
- Avoid layout thrashing.
- Respect reduced motion.

## 7. Offline strategy performance
- Service worker caching with versioned caches.
- Avoid large cache growth; use eviction strategy.

## 8. Observability
- Add lightweight performance marks around map and learning interactions.
- Make telemetry optional and privacy aware.


