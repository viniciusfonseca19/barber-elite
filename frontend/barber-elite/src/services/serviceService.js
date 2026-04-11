import api from './api'

const serviceService = {
  async findAll() {
    const { data } = await api.get('/services')
    return data
  },
}

export default serviceService