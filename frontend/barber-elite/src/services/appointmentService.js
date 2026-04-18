import api from './api'

const appointmentService = {
  async findAll() {
    try {
      const { data } = await api.get('/appointments')
      return data
    } catch (error) {
      if (error.response?.status === 401) {
        console.warn('⚠️ 401 ao buscar agendamentos')
        const token = localStorage.getItem('barber_elite_token')
        const sessionId = localStorage.getItem('barber_elite_sessionId')
        console.log('Token armazenado?', token ? 'SIM' : 'NÃO')
        console.log('SessionId armazenado?', sessionId ? 'SIM' : 'NÃO')
        console.log('Cookies?', document.cookie || 'NENHUM')
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
        console.warn('⚠️ 401 ao buscar agendamentos agendados')
      }
      throw error
    }
  },

  async create(payload) {
    try {
      const token = localStorage.getItem('barber_elite_token')
      const sessionId = localStorage.getItem('barber_elite_sessionId')
      
      console.log('📤 Criando agendamento com:')
      console.log('  - Token?', token ? 'SIM' : 'NÃO')
      console.log('  - SessionId?', sessionId ? `SIM: ${sessionId}` : 'NÃO')
      console.log('  - Cookies?', document.cookie || 'NENHUM')
      console.log('  - Payload:', payload)
      
      const { data } = await api.post('/appointments', payload)
      return data
    } catch (error) {
      if (error.response?.status === 401) {
        console.error('❌ 401 Unauthorized ao criar agendamento')
        console.error('DADOS ARMAZENADOS:')
        console.error(JSON.parse(localStorage.getItem('barber_elite_last_login') || 'null'))
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