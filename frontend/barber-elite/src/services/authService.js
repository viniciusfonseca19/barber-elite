import api from './api'

const authService = {
  async login(username, password) {
    const { data } = await api.post('/auth/login', { username, password })
    return data
  },

  async logout() {
    try {
      await api.post('/auth/logout')
    } catch (err) {
      console.warn('Erro ao fazer logout:', err.message)
    }
  },

  async me() {
    const { data } = await api.get('/auth/me')
    return data
  },
}

export default authService