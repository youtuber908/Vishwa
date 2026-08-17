import React from 'react'

export function CommandPaletteStub() {
  return (
    <button
      type="button"
      onClick={() => alert('Command palette coming soon')}
      style={{
        borderRadius: 999,
        padding: '8px 12px',
        border: '1px solid var(--color-border-subtle)',
        background: 'var(--color-surface)',
        color: 'var(--color-text-muted)',
        cursor: 'pointer',
      }}
      aria-label="Open command palette"
      title="Command palette"
    >
      Ctrl K
    </button>
  )
}

