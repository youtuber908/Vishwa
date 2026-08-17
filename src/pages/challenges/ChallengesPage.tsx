import React from 'react'
import { Link } from 'react-router-dom'
import { Button } from '../../components/ui/Button'

const MODES = [
  { title: 'Click the State', desc: 'Read a state name — click it on the map.', emoji: '📍', comingSoon: true },
  { title: 'Click the Capital', desc: '"Which state has the capital Jaipur?"', emoji: '🏛️', comingSoon: true },
  { title: 'Fill the Map', desc: 'Type or drag state names onto a blank map.', emoji: '🧩', comingSoon: true },
  { title: 'Match Pairs', desc: 'Match states to capitals, languages, and more.', emoji: '🔗', comingSoon: true },
  { title: 'Multiple Choice', desc: 'Four options. One correct. Smart distractors.', emoji: '🎯', comingSoon: true },
  { title: 'Timed Challenge', desc: 'Identify 20 states in 60 seconds.', emoji: '⏱️', comingSoon: true },
  { title: 'Weak Area Mode', desc: 'Automatically generated practice for topics you missed.', emoji: '🎓', comingSoon: true },
  { title: 'Revision Mode', desc: 'Spaced repetition — prioritizes what you are forgetting.', emoji: '🔄', comingSoon: true },
]

export function ChallengesPage() {
  return (
    <div>
      <div style={{ marginBottom: 'var(--space-8)' }}>
        <h1
          style={{
            margin: 0,
            fontSize: 28,
            fontWeight: 800,
            fontFamily: 'var(--font-display)',
            letterSpacing: '-0.03em',
          }}
        >
          Practice Modes
        </h1>
        <p
          style={{
            margin: 'var(--space-2) 0 0',
            color: 'var(--color-text-secondary)',
            fontSize: 15,
            lineHeight: 1.6,
            maxWidth: 560,
          }}
        >
          These modes help you retain knowledge through active recall, immediate feedback,
          and adaptive difficulty. More modes will be added over time.
        </p>
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))',
          gap: 'var(--space-4)',
        }}
      >
        {MODES.map((mode) => (
          <div
            key={mode.title}
            className="card"
            style={{
              background: 'var(--color-bg-elevated)',
              border: '1px solid var(--color-border)',
              borderRadius: 'var(--radius-md)',
              padding: 'var(--space-5)',
              opacity: mode.comingSoon ? 0.65 : 1,
              transition: 'all var(--dur-fast) var(--ease-out)',
            }}
          >
            <div style={{ fontSize: 28, marginBottom: 'var(--space-3)' }}>{mode.emoji}</div>
            <h3
              style={{
                margin: 0,
                fontSize: 15,
                fontWeight: 700,
                fontFamily: 'var(--font-display)',
                letterSpacing: '-0.01em',
              }}
            >
              {mode.title}
            </h3>
            <p
              style={{
                margin: '6px 0 0',
                color: 'var(--color-text-muted)',
                fontSize: 13,
                lineHeight: 1.6,
              }}
            >
              {mode.desc}
            </p>
            {mode.comingSoon && (
              <span
                style={{
                  display: 'inline-block',
                  marginTop: 8,
                  padding: '2px 8px',
                  borderRadius: 'var(--radius-full)',
                  background: 'var(--color-primary-subtle)',
                  color: 'var(--color-primary)',
                  fontSize: 10,
                  fontWeight: 600,
                  letterSpacing: '0.03em',
                  textTransform: 'uppercase',
                }}
              >
                Coming in Phase 4
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

