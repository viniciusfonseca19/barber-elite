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

// Request interceptor
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('barber_elite_token')
    const hasCookie = !!document.cookie

    // Adiciona token ao header se não houver cookies
    if (token && !hasCookie && !config.headers.Authorization) {
      config.headers.Authorization = `Bearer ${token}`
    }

    return config
  },
  (error) => Promise.reject(error)
)

// Response interceptor - CAPTURA E ARMAZENA RESPOSTA DO LOGIN
api.interceptors.response.use(
  (response) => {
    // Se foi login, armazena a resposta para debug
    if (response.config.url.includes('/auth/login')) {
      const debugData = {
        timestamp: new Date().toISOString(),
        status: response.status,
        url: response.config.url,
        responseData: response.data,
        headers: {
          'content-type': response.headers['content-type'],
          'set-cookie': response.headers['set-cookie'],
        },
        cookies: document.cookie,
      }
      localStorage.setItem('barber_elite_last_login', JSON.stringify(debugData, null, 2))
      console.log('💾 Resposta do login armazenada em barber_elite_last_login')
    }
    return response
  },
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