import { createContext, useCallback, useContext, useEffect, useState } from 'react'
import authService from '../services/authService'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  // Verifica sessão existente ao montar
  useEffect(() => {
    authService.me()
      .then((data) => {
        if (data.authenticated) setUser(data)
      })
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [])

  const login = useCallback(async (username, password) => {
    const data = await authService.login(username, password)
    setUser(data)
    return data
  }, [])

  const logout = useCallback(async () => {
    await authService.logout()
    setUser(null)
  }, [])

  const isAdmin = user?.role === 'ADMIN'
  const isClient = user?.role === 'CLIENT'

  return (
    <AuthContext.Provider value={{ user, loading, login, logout, isAdmin, isClient }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be inside AuthProvider')
  return ctx
}