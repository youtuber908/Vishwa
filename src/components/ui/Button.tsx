import React, { useCallback } from 'react'

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'primary' | 'secondary' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
}

const base: React.CSSProperties = {
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: 8,
  fontFamily: 'var(--font-sans)',
  fontWeight: 600,
  letterSpacing: '-0.01em',
  borderRadius: 'var(--radius-md)',
  border: '1px solid transparent',
  cursor: 'pointer',
  position: 'relative',
  overflow: 'hidden',
  transition:
    'transform var(--dur-fast) var(--ease-out), box-shadow var(--dur-fast) var(--ease-out), background-color var(--dur-fast) var(--ease-out), border-color var(--dur-fast) var(--ease-out), opacity var(--dur-fast) var(--ease-out)',
  WebkitTapHighlightColor: 'transparent',
}

const sizes: Record<string, React.CSSProperties> = {
  sm: { padding: '6px 14px', fontSize: 13 },
  md: { padding: '10px 20px', fontSize: 14 },
  lg: { padding: '14px 28px', fontSize: 15 },
}

const variants: Record<string, React.CSSProperties> = {
  primary: {
    background: 'var(--color-primary)',
    color: '#ffffff',
    borderColor: 'transparent',
    boxShadow: 'var(--shadow-glow)',
  },
  secondary: {
    background: 'var(--color-bg-elevated)',
    color: 'var(--color-text)',
    borderColor: 'var(--color-border)',
  },
  ghost: {
    background: 'transparent',
    color: 'var(--color-text-secondary)',
    borderColor: 'transparent',
  },
}

export function Button({ variant = 'secondary', size = 'md', style, onMouseDown, onMouseUp, onMouseLeave, disabled, children, ...rest }: Props) {
  const handleMouseDown = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      if (disabled) return
      const el = e.currentTarget
      el.style.transform = 'scale(0.97)'
      onMouseDown?.(e)
    },
    [disabled, onMouseDown],
  )

  const handleMouseUp = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      e.currentTarget.style.transform = ''
      onMouseUp?.(e)
    },
    [onMouseUp],
  )

  const handleMouseLeave = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      e.currentTarget.style.transform = ''
      onMouseLeave?.(e)
    },
    [onMouseLeave],
  )

  return (
    <button
      {...rest}
      disabled={disabled}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseLeave}
      style={{
        ...base,
        ...sizes[size],
        ...variants[variant],
        opacity: disabled ? 0.45 : 1,
        cursor: disabled ? 'not-allowed' : 'pointer',
        ...style,
      }}
    >
      {children}
    </button>
  )
}

