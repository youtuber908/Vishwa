import React from 'react'

const SECTIONS = [
  {
    title: 'What is Vishwa?',
    content:
      'Vishwa is a premium interactive educational platform designed to help you achieve complete mastery of knowledge through exploration, interaction, visualization, practice, and long-term memory. It is not a quiz website — it is a mastery platform.',
    emoji: '🌍',
  },
  {
    title: 'How does mastery work?',
    content:
      'Each topic has a mastery score from 0 to 100. Mastery improves when you answer correctly and decays naturally over time if not revised. This encourages spaced repetition and long-term retention.',
    emoji: '🧠',
  },
  {
    title: 'Is Vishwa free?',
    content:
      'Yes, Vishwa is completely free to use. All current features and future modules will remain accessible without payment.',
    emoji: '💚',
  },
  {
    title: 'Does Vishwa work offline?',
    content:
      'Vishwa is built as a Progressive Web App (PWA). Once loaded, previously visited content and your progress remain available offline.',
    emoji: '📡',
  },
  {
    title: 'What subjects are available?',
    content:
      'Currently, Vishwa focuses on India Geography (States, Capitals, Rivers, Mountains, Culture, and more). Future modules will include World Geography, History, Science, Mathematics, and many other subjects.',
    emoji: '📚',
  },
  {
    title: 'Is my data private?',
    content:
      'Vishwa stores all data locally in your browser. No personal information is collected or sent to any server. Your progress stays on your device.',
    emoji: '🔒',
  },
]

export function HelpPage() {
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
          Help
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
          Everything you need to know about Vishwa.
        </p>
      </div>

      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: 'var(--space-4)',
        }}
      >
        {SECTIONS.map((section) => (
          <details
            key={section.title}
            className="card"
            style={{
              background: 'var(--color-bg-elevated)',
              border: '1px solid var(--color-border)',
              borderRadius: 'var(--radius-md)',
              padding: 'var(--space-5)',
              cursor: 'pointer',
              transition: 'all var(--dur-fast) var(--ease-out)',
            }}
          >
            <summary
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 12,
                fontWeight: 600,
                fontSize: 15,
                cursor: 'pointer',
                listStyle: 'none',
                fontFamily: 'var(--font-display)',
              }}
            >
              <span style={{ fontSize: 20 }}>{section.emoji}</span>
              {section.title}
              <span style={{ marginLeft: 'auto', color: 'var(--color-text-muted)', fontSize: 12 }}>▼</span>
            </summary>
            <p
              style={{
                margin: 'var(--space-3) 0 0',
                color: 'var(--color-text-secondary)',
                fontSize: 14,
                lineHeight: 1.7,
              }}
            >
              {section.content}
            </p>
          </details>
        ))}
      </div>
    </div>
  )
}

