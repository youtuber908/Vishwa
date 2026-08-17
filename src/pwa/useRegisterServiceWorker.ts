import { useEffect } from 'react'

export function useRegisterServiceWorker() {
  useEffect(() => {
    if (!('serviceWorker' in navigator)) return

    // Register only if the file exists; Vite will serve it from /public.
    // We do it defensively; if missing, simply skip.
    const swUrl = '/sw.js'

    navigator.serviceWorker
      .register(swUrl)
      .then(() => {
        // no-op
      })
      .catch(() => {
        // no-op (offline UX will still work for cached shell)
      })
  }, [])
}

