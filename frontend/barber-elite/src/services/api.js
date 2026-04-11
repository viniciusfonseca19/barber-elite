import axios from 'axios'

const api = axios.create({
  baseURL: '/api',
  withCredentials: true,          // envia JSESSIONID automaticamente
  headers: { 'Content-Type': 'application/json' },
  timeout: 10000,
})

// Response interceptor — trata 401 globalmente
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Sessão expirada: redireciona para login
      if (!window.location.pathname.includes('/login')) {
        window.location.href = '/login'
      }
    }
    return Promise.reject(error)
  }
)

export default api