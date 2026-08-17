# Vishwa — Licensing & Attribution Plan (Phase 0)

## 1. Mandatory policy
- Never fabricate facts.
- Every dataset and geometry must have verified licensing.
- Dataset usage must include required attribution.
- Licenses must be recorded in this file and in dataset manifests.

## 2. What must be documented
For each dataset/asset:
- source name
- URL
- license type
- attribution text
- modification policy
- last verified date

## 3. Map geometry (India)
**Needs decision before V1 release:** source for:
- state/UT boundary polygons
- topology simplification/optimization
- map SVG conversion pipeline license

## 4. Factual datasets
For each factual category (to be sourced):
- population, density
- area
- formation dates
- rivers
- mountain ranges
- national parks
- UNESCO sites
- languages

## 5. Recommended approach
- Prefer open datasets with permissive licenses when possible.
- For government-derived datasets, confirm terms of use.
- Maintain a `datasets/manifest.json` with per-file licensing metadata.

## 6. UI icons/illustrations
- Only use assets with licenses compatible with distribution.
- Store attribution in `public/ATTRIBUTIONS.txt` for runtime inclusion if needed.

## 7. Output data derived from sources
If geometry is converted/minified:
- preserve license attribution
- do not change license terms

## 8. Release gate
Before production release:
- Licensing manifest must be complete.
- Attribution must be visible (in Settings → About or a footer link).

