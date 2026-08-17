import React, { useEffect, useMemo, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { useTheme } from './useTheme'
import { CommandPaletteStub } from './components/CommandPaletteStub'
import { SettingsSoundToggleStub } from './components/SettingsSoundToggleStub'

import { useRegisterServiceWorker } from '../pwa/useRegisterServiceWorker'

const NAV = [
  { to: '/', label: 'Home' },
  { to: '/explore', label: 'Explore' },
  { to: '/india', label: 'India' },
  { to: '/challenges', label: 'Challenges' },
  { to: '/achievements', label: 'Achievements' },
  { to: '/statistics', label: 'Statistics' },
  { to: '/settings', label: 'Settings' },
  { to: '/help', label: 'Help' },
]

export function AppShell({ children }: { children: React.ReactNode }) {
  const { resolvedTheme, themeMode, setThemeMode } = useTheme()
  const location = useLocation()

  const [offline, setOffline] = useState(false)
  const [mobileNavOpen, setMobileNavOpen] = useState(false)

  useRegisterServiceWorker()

  useEffect(() => {
    const on = () => setOffline(!navigator.onLine)
    on()
    window.addEventListener('online', on)
    window.addEventListener('offline', on)
    return () => {
      window.removeEventListener('online', on)
      window.removeEventListener('offline', on)
    }
  }, [])

  // Close mobile nav on route change
  useEffect(() => {
    setMobileNavOpen(false)
  }, [location.pathname])

  const pageTitle = useMemo(() => {
    const current = NAV.find((n) => n.to === location.pathname)
    return current ? `Vishwa · ${current.label}` : 'Vishwa'
  }, [location.pathname])

  useEffect(() => {
    document.title = pageTitle
  }, [pageTitle])

  const cycleTheme = () => {
    const modes: Array<'light' | 'dark' | 'system'> = ['dark', 'light', 'system']
    const idx = modes.indexOf(themeMode)
    setThemeMode(modes[(idx + 1) % modes.length])
  }

  return (
    <div style={{ minHeight: '100dvh', background: 'var(--color-bg)', display: 'flex', flexDirection: 'column' }}>
      {/* Floating background symbols */}
      <div className="bg-symbol" aria-hidden="true">✦</div>
      <div className="bg-symbol" aria-hidden="true">◈</div>
      <div className="bg-symbol" aria-hidden="true">◇</div>
      <div className="bg-symbol" aria-hidden="true">○</div>

      {/* --- Header --- */}
      <header
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 100,
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
          background: 'var(--color-bg-elevated)',
          borderBottom: '1px solid var(--color-border)',
        }}
      >
        <div
          style={{
            maxWidth: 1200,
            margin: '0 auto',
            padding: '0 var(--space-4)',
            height: 56,
            display: 'flex',
            alignItems: 'center',
            gap: 12,
            justifyContent: 'space-between',
          }}
        >
          {/* Brand */}
          <Link
            to="/"
            aria-label="Vishwa home"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 10,
              textDecoration: 'none',
              color: 'inherit',
            }}
          >
            <span
              style={{
                fontFamily: 'var(--font-display)',
                fontWeight: 800,
                fontSize: 22,
                letterSpacing: '-0.04em',
                lineHeight: 1,
                background: 'linear-gradient(135deg, var(--color-primary), var(--color-secondary))',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              Vishwa
            </span>
            <span style={{ color: 'var(--color-text-muted)', fontSize: 11, fontWeight: 500, letterSpacing: '0.02em' }}>
              Mastery through exploration
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav
            aria-label="Primary navigation"
            style={{
              display: 'flex',
              gap: 2,
              alignItems: 'center',
            }}
          >
            {NAV.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.to === '/'}
                style={({ isActive }) => ({
                  padding: '6px 14px',
                  borderRadius: 'var(--radius-sm)',
                  fontSize: 13,
                  fontWeight: 500,
                  textDecoration: 'none',
                  color: isActive ? 'var(--color-text)' : 'var(--color-text-muted)',
                  background: isActive ? 'var(--color-bg-hover)' : 'transparent',
                  transition: 'all var(--dur-fast) var(--ease-out)',
                })}
              >
                {item.label}
              </NavLink>
            ))}
          </nav>

          {/* Right actions */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <CommandPaletteStub />

            {/* Theme toggle */}
            <button
              onClick={cycleTheme}
              aria-label={`Theme: ${resolvedTheme}. Click to cycle.`}
              style={{
                padding: '6px 10px',
                borderRadius: 'var(--radius-sm)',
                fontSize: 12,
                fontWeight: 500,
                border: '1px solid var(--color-border)',
                background: 'transparent',
                color: 'var(--color-text-muted)',
                cursor: 'pointer',
                transition: 'all var(--dur-fast) var(--ease-out)',
              }}
            >
              {themeMode === 'system' ? 'Auto' : resolvedTheme === 'dark' ? '🌙' : '☀️'}
            </button>

            {/* Mobile nav toggle */}
            <button
              aria-label="Toggle navigation menu"
              onClick={() => setMobileNavOpen((o) => !o)}
              style={{
                display: 'none',
                padding: 6,
                borderRadius: 'var(--radius-sm)',
                border: '1px solid var(--color-border)',
                background: 'transparent',
                color: 'var(--color-text)',
                cursor: 'pointer',
              }}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                {mobileNavOpen ? (
                  <path d="M18 6L6 18M6 6l12 12" />
                ) : (
                  <path d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile nav dropdown */}
        {mobileNavOpen && (
          <div
            style={{
              borderTop: '1px solid var(--color-border)',
              background: 'var(--color-bg-elevated)',
              padding: 'var(--space-2) var(--space-4)',
              display: 'flex',
              flexDirection: 'column',
              gap: 2,
            }}
          >
            {NAV.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.to === '/'}
                style={({ isActive }) => ({
                  padding: '10px 14px',
                  borderRadius: 'var(--radius-sm)',
                  fontSize: 14,
                  fontWeight: 500,
                  textDecoration: 'none',
                  color: isActive ? 'var(--color-text)' : 'var(--color-text-muted)',
                  background: isActive ? 'var(--color-bg-hover)' : 'transparent',
                })}
              >
                {item.label}
              </NavLink>
            ))}
          </div>
        )}
      </header>

      {/* --- Main content --- */}
      <main
        style={{
          flex: 1,
          maxWidth: 1200,
          margin: '0 auto',
          padding: 'var(--space-6) var(--space-4) var(--space-10)',
          width: '100%',
        }}
      >
        {children}
      </main>

      {/* --- Footer --- */}
      <footer
        style={{
          borderTop: '1px solid var(--color-border-subtle)',
          padding: '16px var(--space-4)',
          color: 'var(--color-text-muted)',
          fontSize: 12,
          background: 'var(--color-bg-subtle)',
        }}
      >
        <div
          style={{
            maxWidth: 1200,
            margin: '0 auto',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: 8,
          }}
        >
          <span>© {new Date().getFullYear()} Vishwa</span>
          <span>Local-first · Accessible · PWA-ready</span>
        </div>
      </footer>
    </div>
  )
}

