import { useEffect, useState } from 'react'
import serviceService from '../services/serviceService'

export function useServices() {
  const [services, setServices] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    serviceService.findAll()
      .then(setServices)
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [])

  return { services, loading }
}