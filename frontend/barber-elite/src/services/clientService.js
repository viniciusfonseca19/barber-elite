import api from './api'

const clientService = {
  async findAll() {
    const { data } = await api.get('/clients')
    return data
  },

  async block(id) {
    const { data } = await api.patch(`/clients/${id}/block`)
    return data
  },

  async unblock(id) {
    const { data } = await api.patch(`/clients/${id}/unblock`)
    return data
  },
}

export default clientService