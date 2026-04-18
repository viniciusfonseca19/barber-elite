import api from './api'

const TOKEN_KEY = 'barber_elite_token'

const authService = {
  async login(username, password) {
    const response = await api.post('/auth/login', { username, password })
    const { data } = response

    if (data.token) {
      localStorage.setItem(TOKEN_KEY, data.token)
    }
    if (data.access_token) {
      localStorage.setItem(TOKEN_KEY, data.access_token)
    }

    return data
  },

  async logout() {
    try {
      await api.post('/auth/logout')
    } catch (err) {
      console.warn('Erro ao fazer logout:', err.message)
    } finally {
      localStorage.removeItem(TOKEN_KEY)
      localStorage.removeItem('barber_elite_sessionId')
    }
  },

  async me() {
    const { data } = await api.get('/auth/me')
    return data
  },

  getToken() {
    return localStorage.getItem(TOKEN_KEY)
  },

  clearToken() {
    localStorage.removeItem(TOKEN_KEY)
  },
}

export default authService