import { Navigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import Spinner from '../common/Spinner'

export default function PrivateRoute({ children, requireAdmin = false }) {
  const { user, loading } = useAuth()

  if (loading) return <Spinner text="Verificando sessão..." />

  if (!user) return <Navigate to="/login" replace />

  if (requireAdmin && user.role !== 'ADMIN') {
    return <Navigate to="/dashboard" replace />
  }

  return children
}