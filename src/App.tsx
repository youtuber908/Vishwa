import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { AppShell } from './app-shell/AppShell'

import { HomePage } from './pages/home/HomePage'
import { ExplorePage } from './pages/explore/ExplorePage'
import { IndiaPage } from './pages/india/IndiaPage'
import { ChallengesPage } from './pages/challenges/ChallengesPage'
import { AchievementsPage } from './pages/achievements/AchievementsPage'
import { StatisticsPage } from './pages/statistics/StatisticsPage'
import { SettingsPage } from './pages/settings/SettingsPage'
import { HelpPage } from './pages/help/HelpPage'
import { OfflineFallbackPage } from './pwa/OfflineFallbackPage'

export default function App() {
  return (
    <AppShell>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/explore" element={<ExplorePage />} />
        <Route path="/india" element={<IndiaPage />} />
        <Route path="/challenges" element={<ChallengesPage />} />
        <Route path="/achievements" element={<AchievementsPage />} />
        <Route path="/statistics" element={<StatisticsPage />} />
        <Route path="/settings" element={<SettingsPage />} />
        <Route path="/help" element={<HelpPage />} />

        <Route path="/offline" element={<OfflineFallbackPage />} />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </AppShell>
  )
}

