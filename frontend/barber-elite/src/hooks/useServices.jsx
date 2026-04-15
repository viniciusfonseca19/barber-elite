import { useEffect, useState } from 'react'
import serviceService from '../services/serviceService'

export function useServices() {
  const [services, setServices] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    setLoading(true)
    setError(null)
    serviceService.findAll()
      .then(data => setServices(data || []))
      .catch((err) => {
        setError(err.message || 'Erro ao carregar serviços')
        setServices([])
      })
      .finally(() => setLoading(false))
  }, [])

  return { services, loading, error }
}