import React from 'react'

export function SettingsSoundToggleStub() {
  return (
    <button
      type="button"
      onClick={() => alert('Sound settings will be implemented in the Settings page')}
      style={{
        borderRadius: 999,
        padding: '8px 12px',
        border: '1px solid var(--color-border-subtle)',
        background: 'transparent',
        color: 'var(--color-text-muted)',
        cursor: 'pointer',
      }}
      aria-label="Sound settings"
      title="Sound settings"
    >
      Sound
    </button>
  )
}

