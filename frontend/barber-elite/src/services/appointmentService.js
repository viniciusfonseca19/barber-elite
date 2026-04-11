import api from './api'

const appointmentService = {
  async findAll() {
    const { data } = await api.get('/appointments')
    return data
  },

  async findScheduled() {
    const { data } = await api.get('/appointments/scheduled')
    return data
  },

  async create(payload) {
    const { data } = await api.post('/appointments', payload)
    return data
  },

  async cancel(id) {
    const { data } = await api.patch(`/appointments/${id}/cancel`)
    return data
  },
}

export default appointmentService