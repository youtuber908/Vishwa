import React, { createContext, useEffect, useMemo, useState } from 'react'

export type ThemeMode = 'system' | 'light' | 'dark'

type ThemeContextValue = {
  themeMode: ThemeMode
  resolvedTheme: 'light' | 'dark'
  setThemeMode: (mode: ThemeMode) => void
}

export const ThemeContext = createContext<ThemeContextValue | null>(null)

const STORAGE_KEY = 'vishwa.themeMode'

function getSystemTheme(): 'light' | 'dark' {
  return window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark'
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [themeMode, setThemeModeState] = useState<ThemeMode>('dark')
  const [resolvedTheme, setResolvedTheme] = useState<'light' | 'dark'>('dark')

  useEffect(() => {
    try {
      const saved = window.localStorage.getItem(STORAGE_KEY)
      if (saved === 'system' || saved === 'light' || saved === 'dark') {
        setThemeModeState(saved)
      } else {
        // No valid saved value, set to dark as default (but don't save it)
        setThemeModeState('dark')
      }
    } catch {
      // ignore
    }
  }, [])

  useEffect(() => {
    const apply = () => {
      const saved = window.localStorage.getItem(STORAGE_KEY)
      let next: 'light' | 'dark'
      if (!saved) {
        // No saved value, force dark on first load
        next = 'dark'
      } else {
        // Force dark theme, ignore system preference and saved value for first load
        // Check if this is truly first load by seeing if we have ever set a value
        const hasEverBeenSet = window.localStorage.getItem(STORAGE_KEY) !== null
        if (!hasEverBeenSet) {
          next = 'dark'
        } else {
          const sys = getSystemTheme()
          next = themeMode === 'system' ? sys : themeMode
        }
      }
      setResolvedTheme(next)
      document.documentElement.setAttribute('data-theme', next)
    }

    apply()

    const mql = window.matchMedia?.('(prefers-color-scheme: light)')
    if (!mql) return

    const handler = () => {
      if (themeMode === 'system') apply()
    }

    const mqlTyped = mql as MediaQueryList

    if ('addEventListener' in mqlTyped) {
      mqlTyped.addEventListener('change', handler)
    } else {
      // Safari legacy
      ;(mqlTyped as unknown as { addListener: (cb: () => void) => void }).addListener(handler)
    }

    return () => {
      if ('removeEventListener' in mqlTyped) {
        mqlTyped.removeEventListener('change', handler)
      } else {
        ;(mqlTyped as unknown as { removeListener: (cb: () => void) => void }).removeListener(handler)
      }
    }

  }, [themeMode])

  const setThemeMode = (mode: ThemeMode) => {
    setThemeModeState(mode)
    try {
      window.localStorage.setItem(STORAGE_KEY, mode)
    } catch {
      // ignore
    }
  }

  const value = useMemo(() => ({ themeMode, resolvedTheme, setThemeMode }), [themeMode, resolvedTheme])

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}

