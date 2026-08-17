import React from 'react'
import { Link } from 'react-router-dom'
import { Button } from '../components/ui/Button'

export function OfflineFallbackPage() {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        padding: 'var(--space-12) var(--space-4)',
      }}
    >
      <div
        style={{
          width: 56,
          height: 56,
          borderRadius: 'var(--radius-md)',
          background: 'var(--color-warning)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: 28,
          marginBottom: 'var(--space-5)',
        }}
      >
        📡
      </div>

      <h1
        style={{
          margin: 0,
          fontSize: 24,
          fontWeight: 700,
          fontFamily: 'var(--font-display)',
        }}
      >
        You&apos;re offline
      </h1>

      <p
        style={{
          margin: 'var(--space-3) 0 0',
          color: 'var(--color-text-muted)',
          fontSize: 14,
          lineHeight: 1.6,
          maxWidth: 400,
        }}
      >
        Vishwa will still work with previously cached content.
        Your progress is saved locally and will sync when you&apos;re back online.
      </p>

      <div
        style={{
          marginTop: 'var(--space-6)',
          display: 'flex',
          gap: 10,
          flexWrap: 'wrap',
          justifyContent: 'center',
        }}
      >
        <Link to="/">
          <Button variant="primary">Go Home</Button>
        </Link>
        <Link to="/settings">
          <Button variant="secondary">Settings</Button>
        </Link>
      </div>
    </div>
  )
}

