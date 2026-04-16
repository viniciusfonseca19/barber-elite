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

// Response interceptor — trata 401 globalmente
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('❌ Erro na API:', error.response?.status, error.response?.data)
    
    if (error.response?.status === 401) {
      // Só redireciona se NÃO for uma requisição de agendamento falhando
      if (!window.location.pathname.includes('/dashboard') && 
          !error.config?.url?.includes('/appointments')) {
        window.location.href = '/login'
      }
    }
    return Promise.reject(error)
  }
)

export default api