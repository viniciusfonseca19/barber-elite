import axios from 'axios'

const BASE_URL = import.meta.env.PROD
  ? 'https://barber-elite.onrender.com/api'
  : '/api'

const api = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
  headers: { 
    'Content-Type': 'application/json',
    'Cache-Control': 'no-cache',
  },
  timeout: 15000,
})

// Request interceptor - log de requisições
api.interceptors.request.use(
  (config) => {
    console.log(`📤 [${config.method.toUpperCase()}] ${config.url}`)
    console.log('Cookies:', document.cookie)
    return config
  },
  (error) => Promise.reject(error)
)

// Response interceptor
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('❌ Erro na API:', error.response?.status, error.response?.data)
    
    if (error.response?.status === 401) {
      console.warn('⚠️ Sessão expirada ou não autenticado')
      if (!window.location.pathname.includes('/dashboard') && 
          !error.config?.url?.includes('/appointments')) {
        setTimeout(() => {
          window.location.href = '/login'
        }, 1000)
      }
    }
    return Promise.reject(error)
  }
)

export default api