import api from './api'
import authService from './authService'

const appointmentService = {
  async findAll() {
    try {
      const { data } = await api.get('/appointments')
      return data
    } catch (error) {
      if (error.response?.status === 401) {
        console.warn('⚠️ Não autenticado ao buscar agendamentos')
      }
      throw error
    }
  },

  async findScheduled() {
    try {
      const { data } = await api.get('/appointments/scheduled')
      return data
    } catch (error) {
      if (error.response?.status === 401) {
        console.warn('⚠️ Não autenticado ao buscar agendamentos')
      }
      throw error
    }
  },

  async create(payload) {
    try {
      console.log('📤 Criando agendamento com token:', {
        temCookie: !!document.cookie,
        temToken: !!localStorage.getItem('barber_elite_token'),
      })
      const { data } = await api.post('/appointments', payload)
      return data
    } catch (error) {
      if (error.response?.status === 401) {
        console.warn('⚠️ Erro 401 ao criar agendamento')
        console.log('📋 Token local:', localStorage.getItem('barber_elite_token') ? 'existe' : 'não existe')
        console.log('📋 Document.cookie:', document.cookie || 'vazio')
      }
      throw error
    }
  },

  async cancel(id) {
    const { data } = await api.patch(`/appointments/${id}/cancel`)
    return data
  },
}

export default appointmentService