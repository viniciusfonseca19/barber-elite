import api from './api'

const authService = {
  async login(username, password) {
    const { data } = await api.post('/auth/login', { username, password })
    return data
  },

  async logout() {
    await api.post('/auth/logout')
  },

  async me() {
    const { data } = await api.get('/auth/me')
    return data
  },
}

export default authService