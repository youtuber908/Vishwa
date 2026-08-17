import React from 'react'

const BADGE_PLACEHOLDERS = [
  { title: 'First Steps', desc: 'Complete your first lesson.', emoji: '🌱', locked: true },
  { title: 'Perfect Accuracy', desc: 'Answer 10 questions perfectly.', emoji: '🎯', locked: true },
  { title: 'Streak Week', desc: 'Maintain a 7-day learning streak.', emoji: '🔥', locked: true },
  { title: 'Map Explorer', desc: 'Click every state on the map.', emoji: '🗺️', locked: true },
  { title: 'Capital Master', desc: 'Identify all state capitals correctly.', emoji: '🏛️', locked: true },
  { title: 'River Expert', desc: 'Master India\'s major rivers.', emoji: '🌊', locked: true },
]

export function AchievementsPage() {
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
          Achievements
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
          Earn badges and XP as you explore and learn. Achievements track meaningful progress milestones.
        </p>
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
          gap: 'var(--space-4)',
        }}
      >
        {BADGE_PLACEHOLDERS.map((badge) => (
          <div
            key={badge.title}
            className="card"
            style={{
              background: 'var(--color-bg-elevated)',
              border: '1px solid var(--color-border)',
              borderRadius: 'var(--radius-md)',
              padding: 'var(--space-5)',
              textAlign: 'center',
              opacity: badge.locked ? 0.5 : 1,
              filter: badge.locked ? 'grayscale(0.8)' : 'none',
              transition: 'all var(--dur-fast) var(--ease-out)',
            }}
          >
            <div style={{ fontSize: 36, marginBottom: 'var(--space-3)' }}>{badge.emoji}</div>
            <h3
              style={{
                margin: 0,
                fontSize: 14,
                fontWeight: 700,
                fontFamily: 'var(--font-display)',
              }}
            >
              {badge.title}
            </h3>
            <p
              style={{
                margin: '6px 0 0',
                color: 'var(--color-text-muted)',
                fontSize: 12,
                lineHeight: 1.5,
              }}
            >
              {badge.desc}
            </p>
            {badge.locked && (
              <div
                style={{
                  marginTop: 8,
                  fontSize: 10,
                  fontWeight: 600,
                  letterSpacing: '0.03em',
                  textTransform: 'uppercase',
                  color: 'var(--color-text-muted)',
                }}
              >
                Locked
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

