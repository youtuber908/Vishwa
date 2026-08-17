import React, { useMemo } from 'react'
import type { IndiaMapRegionId } from './types'

export type IndiaMapRegion = {
  id: IndiaMapRegionId
  label: string
  d: string
}

export type IndiaMapProps = {
  regions: IndiaMapRegion[]
  selectedId: IndiaMapRegionId | null
  onSelect: (id: IndiaMapRegionId) => void
  hoveredId?: IndiaMapRegionId | null
  onHover?: (id: IndiaMapRegionId | null) => void
}

export function IndiaMap({ regions, selectedId, onSelect, hoveredId, onHover }: IndiaMapProps) {
  const regionById = useMemo(() => new Map(regions.map((r) => [r.id, r])), [regions])

  return (
    <div
      style={{
        position: 'relative',
        background: 'var(--color-bg-subtle)',
        borderRadius: 'var(--radius-lg)',
        border: '1px solid var(--color-border)',
        overflow: 'hidden',
        padding: 8,
      }}
    >
      <svg
        viewBox="341 335 332 328"
        preserveAspectRatio="xMidYMid meet"
        role="img"
        aria-label="Interactive map of India states and union territories. Use arrow keys or search to navigate."
        style={{
          width: '100%',
          height: 'auto',
          display: 'block',
          outline: 'none',
        }}
      >
        {regions.map((r) => {
          const selected = r.id === selectedId
          const hovered = r.id === hoveredId
          return (
            <path
              key={r.id}
              d={r.d}
              onClick={() => onSelect(r.id)}
              onMouseEnter={() => onHover?.(r.id)}
              onMouseLeave={() => onHover?.(null)}
              tabIndex={0}
              role="button"
              aria-label={`Select ${r.label}`}
              aria-pressed={selected}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault()
                  onSelect(r.id)
                }
              }}
              style={{
                fill: selected
                  ? 'var(--color-primary)'
                  : hovered
                    ? 'var(--color-primary-glow)'
                    : 'var(--color-bg-elevated)',
                stroke: selected
                  ? 'var(--color-primary)'
                  : hovered
                    ? 'var(--color-primary)'
                    : 'var(--color-border)',
                strokeWidth: selected ? 2 : hovered ? 1.5 : 0.5,
                strokeLinejoin: 'round',
                strokeLinecap: 'round',
                cursor: 'pointer',
                outline: 'none',
                transition:
                  'fill var(--dur-fast) var(--ease-out), stroke var(--dur-fast) var(--ease-out), stroke-width var(--dur-fast) var(--ease-out)',
              }}
            />
          )
        })}
      </svg>

      {/* Floating label for selected region */}
      {selectedId && regionById.get(selectedId) && (
        <div
          className="fade-in"
          style={{
            position: 'absolute',
            bottom: 12,
            left: '50%',
            transform: 'translateX(-50%)',
            background: 'var(--color-bg-elevated)',
            border: '1px solid var(--color-border)',
            borderRadius: 'var(--radius-full)',
            padding: '6px 16px',
            fontSize: 13,
            fontWeight: 600,
            color: 'var(--color-text)',
            whiteSpace: 'nowrap',
            boxShadow: 'var(--shadow-md)',
            pointerEvents: 'none',
          }}
        >
          {regionById.get(selectedId)!.label}
        </div>
      )}
    </div>
  )
}

