import React from 'react'
import { IndiaExplorer } from '../../features/india/IndiaExplorer/IndiaExplorer'

export function IndiaPage() {
  return (
    <div>
      {/* Hero */}
      <div
        style={{
          marginBottom: 'var(--space-8)',
        }}
      >
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 8,
            padding: '4px 12px',
            borderRadius: 'var(--radius-full)',
            background: 'var(--color-primary-subtle)',
            color: 'var(--color-primary)',
            fontSize: 11,
            fontWeight: 600,
            letterSpacing: '0.04em',
            textTransform: 'uppercase',
            marginBottom: 'var(--space-3)',
          }}
        >
          <span style={{ opacity: 0.8 }}>Module 1</span>
          <span>·</span>
          <span>Geography</span>
        </div>
        <h1
          style={{
            margin: 0,
            fontSize: 32,
            fontWeight: 800,
            fontFamily: 'var(--font-display)',
            letterSpacing: '-0.03em',
            lineHeight: 1.15,
          }}
        >
          India Explorer
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
          Click any state or union territory to discover its geography, culture, capitals, and more.
          Explore freely — there are no tests here.
        </p>
      </div>

      {/* Explorer */}
      <IndiaExplorer />
    </div>
  )
}

