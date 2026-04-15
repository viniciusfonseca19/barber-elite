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
    if (error.response?.status === 401) {
      if (!window.location.pathname.includes('/login')) {
        window.location.href = '/login'
      }
    }
    return Promise.reject(error)
  }
)

export default api