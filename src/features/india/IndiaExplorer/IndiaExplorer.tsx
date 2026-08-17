import React, { useMemo, useState, useCallback } from 'react'
import { Button } from '../../../components/ui/Button'
import { INDIA_REGIONS, INDIA_REGION_BY_ID } from '../../../datasets/india/indiaRegions'
import { IndiaMap } from '../IndiaMap/IndiaMap'
import { INDIA_REAL_PATHS, INDIA_MAP_VIEWBOX } from '../IndiaMap/indiaRealPaths'
import type { IndiaMapRegionId } from '../IndiaMap/types'

function normalize(s: string) {
  return s.trim().toLowerCase()
}

const kindColors: Record<string, { bg: string; text: string }> = {
  state: { bg: 'var(--color-primary-subtle)', text: 'var(--color-primary)' },
  ut: { bg: 'rgba(6,182,212,0.12)', text: 'var(--color-secondary)' },
}

export function IndiaExplorer() {
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const [hoveredId, setHoveredId] = useState<string | null>(null)
  const [query, setQuery] = useState('')

  const mapRegions = useMemo(
    () =>
      Object.values(INDIA_REAL_PATHS).map((p) => ({
        id: p.id,
        label: p.name,
        d: p.d,
      })),
    [],
  )

  const filtered = useMemo(() => {
    const q = normalize(query)
    if (!q) return INDIA_REGIONS
    return INDIA_REGIONS.filter((r) => {
      const name = normalize(r.name)
      const cap = normalize(r.capital)
      return name.includes(q) || cap.includes(q)
    })
  }, [query])

  const selected = selectedId ? INDIA_REGION_BY_ID[selectedId] : null

  const handleSelect = useCallback((id: IndiaMapRegionId) => {
    setSelectedId((prev) => (prev === id ? null : id))
  }, [])

  const handleGo = useCallback(() => {
    const first = filtered[0]
    if (first) setSelectedId(first.id)
  }, [filtered])

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'minmax(0, 1fr) 380px',
        gap: 'var(--space-6)',
        alignItems: 'start',
      }}
    >
      {/* --- Map Section --- */}
      <section aria-label="India map" style={{ minWidth: 0 }}>
        {/* Search */}
        <div
          style={{
            display: 'flex',
            gap: 10,
            alignItems: 'flex-end',
            marginBottom: 'var(--space-4)',
          }}
        >
          <label
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: 6,
              flex: '1 1 240px',
              position: 'relative',
            }}
          >
            <span
              style={{
                fontSize: 11,
                fontWeight: 600,
                letterSpacing: '0.04em',
                textTransform: 'uppercase',
                color: 'var(--color-text-muted)',
              }}
            >
              Search state or UT
            </span>
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Type: Maharashtra, Jaipur, Rajasthan..."
              aria-label="Search state or union territory"
              style={{
                width: '100%',
                border: '1px solid var(--color-border)',
                borderRadius: 'var(--radius-md)',
                padding: '10px 14px',
                background: 'var(--color-bg-elevated)',
                color: 'var(--color-text)',
                fontSize: 14,
                outline: 'none',
                transition: 'border-color var(--dur-fast) var(--ease-out), box-shadow var(--dur-fast) var(--ease-out)',
              }}
              onFocus={(e) => {
                e.currentTarget.style.borderColor = 'var(--color-primary)'
                e.currentTarget.style.boxShadow = 'var(--shadow-glow)'
              }}
              onBlur={(e) => {
                e.currentTarget.style.borderColor = 'var(--color-border)'
                e.currentTarget.style.boxShadow = 'none'
              }}
            />
          </label>

          <Button variant="primary" onClick={handleGo} disabled={filtered.length === 0} size="md">
            Go
          </Button>
        </div>

        {/* Search results chips */}
        {query && (
          <div
            className="fade-in"
            style={{
              display: 'flex',
              gap: 6,
              flexWrap: 'wrap',
              marginBottom: 'var(--space-3)',
            }}
          >
            {filtered.slice(0, 12).map((r) => {
              const isSelected = r.id === selectedId
              const colors = kindColors[r.kind] ?? kindColors.state
              return (
                <button
                  key={r.id}
                  onClick={() => setSelectedId(r.id)}
                  style={{
                    cursor: 'pointer',
                    borderRadius: 'var(--radius-full)',
                    padding: '4px 12px',
                    border: `1px solid ${isSelected ? 'var(--color-primary)' : 'var(--color-border)'}`,
                    background: isSelected
                      ? 'var(--color-primary)'
                      : 'var(--color-bg-elevated)',
                    color: isSelected ? '#ffffff' : 'var(--color-text)',
                    fontSize: 12,
                    fontWeight: 500,
                    transition: 'all var(--dur-fast) var(--ease-out)',
                  }}
                >
                  {r.name}
                </button>
              )
            })}
          </div>
        )}

        {/* Map */}
        <IndiaMap
          regions={mapRegions}
          selectedId={selectedId}
          onSelect={handleSelect}
          hoveredId={hoveredId}
          onHover={setHoveredId}
        />
      </section>

      {/* --- Info Panel --- */}
      <aside
        aria-label="State information panel"
        className="fade-in"
        style={{
          position: 'sticky',
          top: 80,
        }}
      >
        {selected ? (
          <div
            className="card"
            style={{
              background: 'var(--color-bg-elevated)',
              border: '1px solid var(--color-border)',
              borderRadius: 'var(--radius-lg)',
              padding: 'var(--space-6)',
            }}
          >
            {/* Header */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 'var(--space-4)' }}>
              <div
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: 'var(--radius-md)',
                  background: kindColors[selected.kind]?.bg ?? kindColors.state.bg,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 18,
                  fontWeight: 700,
                  color: kindColors[selected.kind]?.text ?? kindColors.state.text,
                  fontFamily: 'var(--font-display)',
                }}
              >
                {selected.name.charAt(0)}
              </div>
              <div>
                <h2
                  style={{
                    margin: 0,
                    fontSize: 18,
                    fontWeight: 700,
                    fontFamily: 'var(--font-display)',
                    letterSpacing: '-0.02em',
                  }}
                >
                  {selected.name}
                </h2>
                <span
                  style={{
                    fontSize: 11,
                    fontWeight: 600,
                    letterSpacing: '0.04em',
                    textTransform: 'uppercase',
                    color: kindColors[selected.kind]?.text ?? kindColors.state.text,
                  }}
                >
                  {selected.kind === 'state' ? 'State' : 'Union Territory'}
                </span>
              </div>
            </div>

            {/* Facts grid */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: 'var(--space-3)',
                marginBottom: 'var(--space-5)',
              }}
            >
              <FactItem label="Capital" value={selected.capital} />
              <FactItem label="Population" value={selected.facts.population} />
              <FactItem label="Area" value={selected.facts.area} />
              <FactItem label="Formation" value={selected.facts.foundedOrFormed} />
            </div>

            {/* Actions */}
            <div style={{ display: 'flex', gap: 8 }}>
              <Button
                variant="secondary"
                size="sm"
                onClick={() => setSelectedId(null)}
                style={{ flex: 1 }}
              >
                Clear
              </Button>
              <Button
                variant="primary"
                size="sm"
                style={{ flex: 1 }}
              >
                Explore
              </Button>
            </div>
          </div>
        ) : (
          <div
            className="card"
            style={{
              background: 'var(--color-bg-elevated)',
              border: '1px solid var(--color-border)',
              borderRadius: 'var(--radius-lg)',
              padding: 'var(--space-8) var(--space-6)',
              textAlign: 'center',
            }}
          >
            <div
              style={{
                width: 48,
                height: 48,
                margin: '0 auto var(--space-4)',
                borderRadius: 'var(--radius-md)',
                background: 'var(--color-primary-subtle)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 24,
              }}
            >
              🗺️
            </div>
            <h3
              style={{
                margin: 0,
                fontSize: 16,
                fontWeight: 600,
                fontFamily: 'var(--font-display)',
                letterSpacing: '-0.01em',
              }}
            >
              Select a state
            </h3>
            <p
              style={{
                margin: '8px 0 0',
                color: 'var(--color-text-muted)',
                fontSize: 13,
                lineHeight: 1.6,
              }}
            >
              Click any state or union territory on the map, or type its name in the search above.
            </p>
          </div>
        )}
      </aside>
    </div>
  )
}

function FactItem({ label, value }: { label: string; value: string }) {
  return (
    <div
      style={{
        background: 'var(--color-bg-subtle)',
        borderRadius: 'var(--radius-sm)',
        padding: '10px 12px',
        border: '1px solid var(--color-border-subtle)',
      }}
    >
      <div
        style={{
          fontSize: 10,
          fontWeight: 600,
          letterSpacing: '0.04em',
          textTransform: 'uppercase',
          color: 'var(--color-text-muted)',
          marginBottom: 2,
        }}
      >
        {label}
      </div>
      <div style={{ fontWeight: 600, fontSize: 14 }}>{value}</div>
    </div>
  )
}

