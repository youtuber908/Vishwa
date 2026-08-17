# Vishwa — Map Engine Specification (Phase 0)

## 1. Goals
- Generic map engine usable for any subject/country.
- Premium interactions: hover feedback, smooth selection, focus/zoom.
- Keyboard and touch support.
- Layer system for future overlays.

## 2. Map Model
### 2.1 Region
- `id`
- `label`
- `geometry`: path(s) in SVG coordinates
- `centroid`: for focus zoom
- `neighbors`: optional
- `layersVisibility`: per layer optional

### 2.2 Layer
- `id`
- `type`: boundaries | labels | overlays
- `rendering`: svgPathGroup | svgTextGroup | rasterTile (future)
- `defaultVisible`
- `zIndex`

### 2.3 Map View State
- `transform`: scale + translate
- `focusedRegionId`: optional
- `labelsOn`: boolean
- `layerVisibility`: record by layer id

## 3. Interactions
### 3.1 Hover
- lightweight style update (CSS classes)
- throttle if needed

### 3.2 Click / Tap select
- set focusedRegionId
- show selection glow
- open or update info panel (callback)

### 3.3 Zoom/pan
- pinch zoom on mobile
- wheel zoom on desktop (optional)
- pan via drag
- reset view

### 3.4 Keyboard
- Provide accessible list navigation:
  - Focus region via list or map focus ring
- Enter/Space selects

## 4. Performance requirements
- avoid rebuilding region DOM on every interaction
- keep layer toggle changes localized

## 5. Extensibility
Future district-level maps:
- regions become hierarchical (country → state → district)
- engine supports selection drilling while keeping interfaces stable.


