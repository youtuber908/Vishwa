import React from 'react'

const STATS = [
  { label: 'Questions Answered', value: '—', hint: 'Start practicing to track' },
  { label: 'Current Mastery', value: '—', hint: 'Average score across topics' },
  { label: 'Learning Streak', value: '— days', hint: 'Daily consistency' },
  { label: 'Total XP', value: '—', hint: 'Earned through exploration' },
  { label: 'States Explored', value: '—', hint: 'Click states on the map' },
  { label: 'Challenges Completed', value: '—', hint: 'Practice mode completions' },
]

export function StatisticsPage() {
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
          Statistics
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
          Track your learning progress over time. Statistics update automatically as you explore and practice.
        </p>
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
          gap: 'var(--space-4)',
        }}
      >
        {STATS.map((stat) => (
          <div
            key={stat.label}
            className="card"
            style={{
              background: 'var(--color-bg-elevated)',
              border: '1px solid var(--color-border)',
              borderRadius: 'var(--radius-md)',
              padding: 'var(--space-5)',
              transition: 'all var(--dur-fast) var(--ease-out)',
            }}
          >
            <div
              style={{
                fontSize: 10,
                fontWeight: 600,
                letterSpacing: '0.04em',
                textTransform: 'uppercase',
                color: 'var(--color-text-muted)',
                marginBottom: 4,
              }}
            >
              {stat.label}
            </div>
            <div
              style={{
                fontSize: 28,
                fontWeight: 800,
                fontFamily: 'var(--font-display)',
                letterSpacing: '-0.03em',
                color: 'var(--color-text)',
              }}
            >
              {stat.value}
            </div>
            <p
              style={{
                margin: '4px 0 0',
                fontSize: 12,
                color: 'var(--color-text-muted)',
              }}
            >
              {stat.hint}
            </p>
          </div>
        ))}
      </div>

      <div
        className="card"
        style={{
          marginTop: 'var(--space-6)',
          background: 'var(--color-bg-elevated)',
          border: '1px solid var(--color-border)',
          borderRadius: 'var(--radius-md)',
          padding: 'var(--space-6)',
          textAlign: 'center',
        }}
      >
        <div style={{ fontSize: 32, marginBottom: 'var(--space-3)' }}>📊</div>
        <h3
          style={{
            margin: 0,
            fontSize: 16,
            fontWeight: 700,
            fontFamily: 'var(--font-display)',
          }}
        >
          Learning Heatmap & Charts
        </h3>
        <p
          style={{
            margin: '8px 0 0',
            color: 'var(--color-text-muted)',
            fontSize: 13,
            lineHeight: 1.6,
            maxWidth: 400,
            marginLeft: 'auto',
            marginRight: 'auto',
          }}
        >
          Interactive charts, heatmaps, and mastery timelines will be available in Phase 5.
        </p>
      </div>
    </div>
  )
}

