import api from './api'

const serviceService = {
  async findAll() {
    const { data } = await api.get('/services', {
      headers: { 'Pragma': 'no-cache' }
    })
    return data
  },
}

export default serviceService