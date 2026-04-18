import axios from 'axios'

const BASE_URL = import.meta.env.PROD
  ? 'https://barber-elite.onrender.com/api'
  : '/api'

const api = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 15000,
})

// Request interceptor — sempre envia o token JWT se disponível
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('barber_elite_token')
    if (token && !config.headers.Authorization) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => Promise.reject(error)
)

// Response interceptor
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('barber_elite_token')
      localStorage.removeItem('barber_elite_sessionId')

      setTimeout(() => {
        if (!window.location.pathname.includes('/login')) {
          window.location.href = '/login'
        }
      }, 1000)
    }
    return Promise.reject(error)
  }
)

export default api