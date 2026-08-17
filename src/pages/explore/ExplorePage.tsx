import React from 'react'
import { Link } from 'react-router-dom'
import { Button } from '../../components/ui/Button'

export function ExplorePage() {
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
          Explore
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
          Discover knowledge without pressure. Click, hover, read, and zoom — everything is designed for curiosity.
        </p>
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
          gap: 'var(--space-4)',
        }}
      >
        <Link
          to="/india"
          className="card"
          style={{
            textDecoration: 'none',
            color: 'inherit',
            background: 'var(--color-bg-elevated)',
            border: '1px solid var(--color-border)',
            borderRadius: 'var(--radius-md)',
            padding: 'var(--space-5)',
            transition: 'all var(--dur-fast) var(--ease-out)',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-2px)'
            e.currentTarget.style.boxShadow = 'var(--shadow-glow)'
            e.currentTarget.style.borderColor = 'var(--color-border-hover)'
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = ''
            e.currentTarget.style.boxShadow = ''
            e.currentTarget.style.borderColor = 'var(--color-border)'
          }}
        >
          <div style={{ fontSize: 32, marginBottom: 'var(--space-3)' }}>🗺️</div>
          <h3 style={{ margin: 0, fontSize: 15, fontWeight: 700, fontFamily: 'var(--font-display)' }}>
            India Explorer
          </h3>
          <p style={{ margin: '6px 0 0', color: 'var(--color-text-muted)', fontSize: 13, lineHeight: 1.6 }}>
            Interactive map with clickable states, information panels, and guided exploration.
          </p>
        </Link>

        <Link
          to="/challenges"
          className="card"
          style={{
            textDecoration: 'none',
            color: 'inherit',
            background: 'var(--color-bg-elevated)',
            border: '1px solid var(--color-border)',
            borderRadius: 'var(--radius-md)',
            padding: 'var(--space-5)',
            transition: 'all var(--dur-fast) var(--ease-out)',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-2px)'
            e.currentTarget.style.boxShadow = 'var(--shadow-glow)'
            e.currentTarget.style.borderColor = 'var(--color-border-hover)'
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = ''
            e.currentTarget.style.boxShadow = ''
            e.currentTarget.style.borderColor = 'var(--color-border)'
          }}
        >
          <div style={{ fontSize: 32, marginBottom: 'var(--space-3)' }}>🧩</div>
          <h3 style={{ margin: 0, fontSize: 15, fontWeight: 700, fontFamily: 'var(--font-display)' }}>
            Practice Modes
          </h3>
          <p style={{ margin: '6px 0 0', color: 'var(--color-text-muted)', fontSize: 13, lineHeight: 1.6 }}>
            Mastery-first challenges: click the state, fill the map, match pairs, and more.
          </p>
        </Link>
      </div>
    </div>
  )
}

