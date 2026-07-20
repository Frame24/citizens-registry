import { Navigate, Route, Routes } from 'react-router-dom'
import { AppLayout } from './layout/AppLayout'
import { CitizenCardPage } from './pages/CitizenCard'
import { CitizensRegistryPage } from './pages/CitizensRegistry'
import { DashboardPage } from './pages/Dashboard'

export default function App() {
  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route index element={<DashboardPage />} />
        <Route path="citizens" element={<CitizensRegistryPage />} />
        <Route path="citizens/:id" element={<CitizenCardPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  )
}
