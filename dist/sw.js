/* eslint-disable no-restricted-globals */

const CACHE_VERSION = 'vishwa-shell-v1'
const CORE_ASSETS = [
  '/',
  '/index.html',
]

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_VERSION).then((cache) => {
      return cache.addAll(CORE_ASSETS)
    }),
  )
  self.skipWaiting()
})

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.map((key) => {
          if (key !== CACHE_VERSION) return caches.delete(key)
        }),
      )
    }),
  )
})

self.addEventListener('fetch', (event) => {
  const req = event.request
  if (req.method !== 'GET') return

  event.respondWith(
    caches.match(req).then((cached) => {
      if (cached) return cached

      return fetch(req)
        .then((res) => {
          const copy = res.clone()
          caches.open(CACHE_VERSION).then((cache) => {
            cache.put(req, copy)
          })
          return res
        })
        .catch(() => {
          // If offline and we can't fetch, fall back to the cached shell.
          return caches.match('/')
        })
    }),
  )
})

