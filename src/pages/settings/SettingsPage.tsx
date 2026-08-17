import React, { useCallback, useEffect, useState } from 'react'
import { ThemeMode, ThemeContext } from '../../theme/ThemeProvider'
import { useTheme } from '../../app-shell/useTheme'

const STORAGE_KEY_REDUCED_MOTION = 'vishwa.reducedMotion'

function ThemeRadio({
  mode,
  current,
  onChange,
}: {
  mode: ThemeMode
  current: ThemeMode
  onChange: (m: ThemeMode) => void
}) {
  const id = `theme-${mode}`
  return (
    <label
      htmlFor={id}
      style={{
        display: 'flex',
        gap: 10,
        alignItems: 'center',
        padding: 'var(--space-4)',
        borderRadius: 'var(--radius-sm)',
        border: `1px solid ${mode === current ? 'var(--color-primary)' : 'var(--color-border)'}`,
        background: mode === current ? 'var(--color-primary-subtle)' : 'transparent',
        cursor: 'pointer',
        transition: 'all var(--dur-fast) var(--ease-out)',
      }}
    >
      <input
        id={id}
        type="radio"
        name="theme"
        value={mode}
        checked={current === mode}
        onChange={() => onChange(mode)}
        style={{ accentColor: 'var(--color-primary)' }}
      />
      <span style={{ fontSize: 14, fontWeight: 500 }}>
        {mode === 'system' ? 'System' : mode === 'light' ? 'Light' : 'Dark'}
      </span>
    </label>
  )
}

export function SettingsPage() {
  const { themeMode, setThemeMode } = useTheme()
  const [reducedMotion, setReducedMotion] = useState(false)

  useEffect(() => {
    try {
      const v = window.localStorage.getItem(STORAGE_KEY_REDUCED_MOTION)
      setReducedMotion(v === '1')
    } catch {
      // ignore
    }
  }, [])

  const toggleReducedMotion = useCallback(() => {
    setReducedMotion((prev) => {
      const next = !prev
      try {
        window.localStorage.setItem(STORAGE_KEY_REDUCED_MOTION, next ? '1' : '0')
      } catch {
        // ignore
      }
      document.documentElement.setAttribute('data-reduced-motion', next ? '1' : '0')
      return next
    })
  }, [])

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
          Settings
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
          Customize your Vishwa experience. All preferences are stored locally.
        </p>
      </div>

      <div
        style={{
          display: 'grid',
          gap: 'var(--space-5)',
          maxWidth: 600,
        }}
      >
        {/* Theme */}
        <div
          className="card"
          style={{
            background: 'var(--color-bg-elevated)',
            border: '1px solid var(--color-border)',
            borderRadius: 'var(--radius-md)',
            padding: 'var(--space-6)',
          }}
        >
          <h2
            style={{
              margin: '0 0 var(--space-4)',
              fontSize: 16,
              fontWeight: 700,
              fontFamily: 'var(--font-display)',
            }}
          >
            Theme
          </h2>
          <div
            style={{
              display: 'grid',
              gap: 8,
              gridTemplateColumns: 'repeat(3, 1fr)',
            }}
          >
            <ThemeRadio mode="system" current={themeMode} onChange={setThemeMode} />
            <ThemeRadio mode="light" current={themeMode} onChange={setThemeMode} />
            <ThemeRadio mode="dark" current={themeMode} onChange={setThemeMode} />
          </div>
        </div>

        {/* Accessibility */}
        <div
          className="card"
          style={{
            background: 'var(--color-bg-elevated)',
            border: '1px solid var(--color-border)',
            borderRadius: 'var(--radius-md)',
            padding: 'var(--space-6)',
          }}
        >
          <h2
            style={{
              margin: '0 0 var(--space-4)',
              fontSize: 16,
              fontWeight: 700,
              fontFamily: 'var(--font-display)',
            }}
          >
            Accessibility
          </h2>

          <label
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: 12,
              cursor: 'pointer',
            }}
          >
            <div>
              <div style={{ fontWeight: 600, fontSize: 14 }}>Reduced motion</div>
              <div style={{ color: 'var(--color-text-muted)', fontSize: 12, marginTop: 2 }}>
                Minimize non-essential animations
              </div>
            </div>
            <input
              type="checkbox"
              checked={reducedMotion}
              onChange={toggleReducedMotion}
              style={{
                width: 20,
                height: 20,
                accentColor: 'var(--color-primary)',
                cursor: 'pointer',
              }}
            />
          </label>
        </div>

        {/* Sound placeholder */}
        <div
          className="card"
          style={{
            background: 'var(--color-bg-elevated)',
            border: '1px solid var(--color-border)',
            borderRadius: 'var(--radius-md)',
            padding: 'var(--space-6)',
          }}
        >
          <h2
            style={{
              margin: '0 0 var(--space-2)',
              fontSize: 16,
              fontWeight: 700,
              fontFamily: 'var(--font-display)',
            }}
          >
            Sound
          </h2>
          <p
            style={{
              margin: 0,
              color: 'var(--color-text-muted)',
              fontSize: 13,
              lineHeight: 1.6,
            }}
          >
            Sound toggles will be enabled alongside learning modes in Phase 4.
          </p>
        </div>

        {/* About */}
        <div
          className="card"
          style={{
            background: 'var(--color-bg-elevated)',
            border: '1px solid var(--color-border)',
            borderRadius: 'var(--radius-md)',
            padding: 'var(--space-6)',
          }}
        >
          <h2
            style={{
              margin: '0 0 var(--space-2)',
              fontSize: 16,
              fontWeight: 700,
              fontFamily: 'var(--font-display)',
            }}
          >
            About Vishwa
          </h2>
          <p
            style={{
              margin: 0,
              color: 'var(--color-text-muted)',
              fontSize: 13,
              lineHeight: 1.6,
            }}
          >
            Version 1.0 · Local-first · Accessible · PWA-ready · Made with ❤️ for lifelong learners.
          </p>
        </div>
      </div>
    </div>
  )
}

