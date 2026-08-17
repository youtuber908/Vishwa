import React from 'react'
import { Link } from 'react-router-dom'
import { Button } from '../../components/ui/Button'

const FEATURES = [
  {
    title: 'Interactive Map',
    desc: 'Click any state or union territory to explore geographic and cultural facts.',
    emoji: '🗺️',
    to: '/india',
  },
  {
    title: 'Mastery Learning',
    desc: 'Practice intelligently. The platform adapts to your knowledge and schedules revision.',
    emoji: '🧠',
    to: '/challenges',
  },
  {
    title: 'Achievements',
    desc: 'Earn XP and badges as you explore, practice, and retain knowledge.',
    emoji: '🏆',
    to: '/achievements',
  },
  {
    title: 'Statistics',
    desc: 'Track your progress, mastery, and learning heatmap over time.',
    emoji: '📊',
    to: '/statistics',
  },
  {
    title: 'Offline-ready',
    desc: 'Vishwa is a PWA. Learn even without an internet connection.',
    emoji: '📡',
    to: '/settings',
  },
  {
    title: 'India Module',
    desc: 'The first module — a complete interactive resource for India geography.',
    emoji: '🇮🇳',
    to: '/india',
  },
]

export function HomePage() {
  return (
    <div>
      {/* Hero */}
      <div
        style={{
          textAlign: 'center',
          padding: 'var(--space-12) 0 var(--space-8)',
        }}
      >
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 6,
            padding: '4px 14px',
            borderRadius: 'var(--radius-full)',
            background: 'var(--color-primary-subtle)',
            color: 'var(--color-primary)',
            fontSize: 11,
            fontWeight: 600,
            letterSpacing: '0.04em',
            textTransform: 'uppercase',
            marginBottom: 'var(--space-5)',
          }}
        >
          <span style={{ opacity: 0.8 }}>Mastery through exploration</span>
        </div>

        <h1
          style={{
            margin: 0,
            fontSize: 48,
            fontWeight: 800,
            fontFamily: 'var(--font-display)',
            letterSpacing: '-0.04em',
            lineHeight: 1.05,
          }}
        >
          <span
            style={{
              background: 'linear-gradient(135deg, var(--color-primary), var(--color-secondary))',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            Vishwa
          </span>
        </h1>
        <p
          style={{
            margin: 'var(--space-4) auto 0',
            color: 'var(--color-text-secondary)',
            fontSize: 16,
            lineHeight: 1.6,
            maxWidth: 520,
          }}
        >
          A premium interactive educational platform designed for long-term mastery.
          Explore, practice, and remember — naturally.
        </p>

        <div
          style={{
            marginTop: 'var(--space-6)',
            display: 'flex',
            gap: 10,
            justifyContent: 'center',
            flexWrap: 'wrap',
          }}
        >
          <Link to="/india">
            <Button variant="primary" size="lg">
              Start Exploring India
            </Button>
          </Link>
          <Link to="/challenges">
            <Button variant="secondary" size="lg">
              Practice Mode
            </Button>
          </Link>
        </div>
      </div>

      {/* Feature grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
          gap: 'var(--space-4)',
          marginTop: 'var(--space-8)',
        }}
      >
        {FEATURES.map((f) => (
          <Link
            key={f.title}
            to={f.to}
            className="card"
            style={{
              textDecoration: 'none',
              color: 'inherit',
              background: 'var(--color-bg-elevated)',
              border: '1px solid var(--color-border)',
              borderRadius: 'var(--radius-md)',
              padding: 'var(--space-5)',
              transition:
                'transform var(--dur-fast) var(--ease-out), box-shadow var(--dur-fast) var(--ease-out), border-color var(--dur-fast) var(--ease-out)',
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
            <div
              style={{
                fontSize: 28,
                marginBottom: 'var(--space-3)',
              }}
            >
              {f.emoji}
            </div>
            <h3
              style={{
                margin: 0,
                fontSize: 15,
                fontWeight: 700,
                fontFamily: 'var(--font-display)',
                letterSpacing: '-0.01em',
              }}
            >
              {f.title}
            </h3>
            <p
              style={{
                margin: '6px 0 0',
                color: 'var(--color-text-muted)',
                fontSize: 13,
                lineHeight: 1.6,
              }}
            >
              {f.desc}
            </p>
          </Link>
        ))}
      </div>
    </div>
  )
}

