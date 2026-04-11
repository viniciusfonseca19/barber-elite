import { Navigate, Route, Routes } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import PrivateRoute from '../components/layout/PrivateRoute'
import LoginPage from '../pages/LoginPage'
import ClientDashboard from '../pages/ClientDashboard'
import AdminDashboard from '../pages/AdminDashboard'
import NotFound from '../pages/NotFound'

export default function AppRoutes() {
  const { user, loading } = useAuth()

  return (
    <Routes>
      <Route
        path="/login"
        element={
          !loading && user
            ? <Navigate to="/dashboard" replace />
            : <LoginPage />
        }
      />

      <Route
        path="/dashboard"
        element={
          <PrivateRoute>
            {user?.role === 'ADMIN' ? <AdminDashboard /> : <ClientDashboard />}
          </PrivateRoute>
        }
      />

      <Route
        path="/admin"
        element={
          <PrivateRoute requireAdmin>
            <AdminDashboard />
          </PrivateRoute>
        }
      />

      <Route path="/" element={<Navigate to="/dashboard" replace />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}