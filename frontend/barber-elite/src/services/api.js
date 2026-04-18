import axios from 'axios'

const api = axios.create({
  baseURL: '/api',
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 15000,
})

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
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