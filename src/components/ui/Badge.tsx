import React from 'react'

type Tone = 'neutral' | 'brand' | 'success' | 'warning' | 'danger'

const toneStyles: Record<Tone, { bg: string; color: string }> = {
  neutral: { bg: 'var(--color-bg-hover)', color: 'var(--color-text-secondary)' },
  brand: { bg: 'var(--color-primary-subtle)', color: 'var(--color-primary)' },
  success: { bg: 'rgba(52,211,153,0.12)', color: 'var(--color-success)' },
  warning: { bg: 'rgba(251,191,36,0.12)', color: 'var(--color-warning)' },
  danger: { bg: 'rgba(248,113,113,0.12)', color: 'var(--color-danger)' },
}

export function Badge({
  children,
  tone = 'neutral',
}: {
  children: React.ReactNode
  tone?: Tone
}) {
  const t = toneStyles[tone] ?? toneStyles.neutral
  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 6,
        padding: '3px 10px',
        borderRadius: 'var(--radius-full)',
        background: t.bg,
        color: t.color,
        fontSize: 11,
        fontWeight: 600,
        letterSpacing: '0.02em',
        lineHeight: 1.4,
        whiteSpace: 'nowrap',
      }}
    >
      {children}
    </span>
  )
}

