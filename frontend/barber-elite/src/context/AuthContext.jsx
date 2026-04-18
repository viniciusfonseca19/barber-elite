import { createContext, useCallback, useContext, useEffect, useState } from 'react'
import authService from '../services/authService'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  // Verifica sessão existente ao montar
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const data = await authService.me()
        if (data && data.authenticated) {
          setUser(data)
        }
      } catch (err) {
        console.warn('⚠️ Nenhuma sessão ativa ao montar')
        // Tenta recuperar token local se existir
        const token = localStorage.getItem('barber_elite_token')
        if (token) {
          console.log('💾 Encontrado token local, restaurando...')
          try {
            const data = await authService.me()
            if (data) setUser(data)
          } catch (err2) {
            console.error('❌ Token local inválido')
            localStorage.removeItem('barber_elite_token')
          }
        }
      } finally {
        setLoading(false)
      }
    }
    
    checkAuth()
  }, [])

  const login = useCallback(async (username, password) => {
    const data = await authService.login(username, password)
    setUser(data)
    return data
  }, [])

  const logout = useCallback(async () => {
    try {
      await authService.logout()
    } catch (err) {
      console.warn('⚠️ Erro ao fazer logout:', err.message)
    } finally {
      setUser(null)
    }
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