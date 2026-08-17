# Vishwa — Project Context Part 2: Curriculum-Awareness Feature

## Curriculum-Awareness Feature (Additive)

This document describes an additive feature that maps Vishwa's content to educational curricula, specifically targeting the CBSE Class X Social Science curriculum for the 2026–27 academic session.

### Scope and Intent
- This feature is **ADDITIVE** to the existing locked spec/PRD/architecture/roadmap.
- It does **not** redesign or replace the core geography mastery experience.
- Vishwa remains a universal educational platform; this feature adds a lens for curriculum alignment without making Vishwa CBSE-only or modeled after GeoGuessr.

### Curriculum Mappings (Planned / Not Yet Implemented)
As of the current codebase inspection (2026-08-17), **no curriculum-awareness feature has been implemented**. The following mappings are planned but not present in the code:

1. **NCERT Relevance**: Tagging regions/topics with corresponding NCERT chapters (e.g., "Resources and Development" for certain states).
2. **CBSE Map-Work Relevance**: Identifying which regions/features are required for map work in CBSE exams.
3. **Chapter/Topic Association**: Linking Vishwa's topics (e.g., rivers, minerals, climate) to specific chapters in the CBSE textbook.
4. **Academic-Session Relevance**: Marking content as relevant for the 2026–27 academic session (distinct from calendar year).

### Current State (Verified)
- No files or code references to NCERT, CBSE, curriculum, or academic session were found in the `src/` directory.
- The `INDIA_REGIONS` data structure in `src/datasets/india/indiaRegions.ts` contains only geographical facts (population, area, formation year) and no curriculum tags.
- No UI components, pages, or services related to curriculum mapping exist.

### Implementation Note
If this feature is to be added, it should:
- Extend the `IndiaRegion` type (or create a parallel curriculum metadata structure) without breaking existing geography mastery.
- Be optional and toggleable (e.g., via settings) so users can choose to view curriculum tags.
- Keep the core exploration and mastery mechanics unchanged.

> This document reflects the absence of the feature in the current codebase. Any claims of completion in TODO.md or similar are unverified until inspected.