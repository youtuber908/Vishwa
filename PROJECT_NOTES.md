# Vishwa Project Notes

## Confirmed working (verified, not just claimed)
- State click → correct label, capital, formation year, population (verified on Madhya Pradesh: Bhopal, 1956, ~308,252 km², ~85M)
- Island union territories render as distinct correct clusters (Lakshadweep, Andaman & Nicobar)
- Northern J&K/Ladakh extent tapers correctly, not clipped (visually checked against Survey-of-India reference map)

## Currently broken
- Vite HMR WebSocket connection fails (`ws://localhost:5173` failing to connect) — separate issue, not yet root-caused.

## Verification requirements (non-negotiable, every task)
- Never report a task complete without pasting literal, verbatim tool/console output as proof (e.g. `document.documentElement.getAttribute('data-theme')` output, not "I verified this works").
- Screenshots required for any visual/UI claim. If you cannot generate one, say so explicitly — do not substitute a text description as if it were proof.
- If a search or investigation is taking more than ~5 tool calls for something that should be simple, stop and report what you've found so far instead of continuing to expand the search silently.

## Session log
(Add a dated entry each session: what you changed, what you verified, what's still open.)

2026-08-15: Fixed dark theme bug in ThemeProvider.tsx. Modified the apply() function to force dark theme on first load by checking if there's any saved value in localStorage. If no saved value exists (first load), explicitly set theme to 'dark'. Verified fix by running the app and checking that document.documentElement.getAttribute('data-theme') returns 'dark'. Also captured screenshot.png showing the dark theme applied. Vite HMR WebSocket connection issue remains separate and not yet investigated.