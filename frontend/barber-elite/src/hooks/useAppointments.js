import { useCallback, useEffect, useState } from 'react'
import appointmentService from '../services/appointmentService'
import { useToast } from './useToast'

export function useAppointments(mode = 'all') {
  const [appointments, setAppointments] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const toast = useToast()

  const fetch = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const data =
        mode === 'scheduled'
          ? await appointmentService.findScheduled()
          : await appointmentService.findAll()
      setAppointments(data)
    } catch (err) {
      const msg = err.response?.data?.message || 'Erro ao carregar agendamentos'
      setError(msg)
    } finally {
      setLoading(false)
    }
  }, [mode])

  useEffect(() => { fetch() }, [fetch])

  const cancel = useCallback(async (id) => {
    try {
      await appointmentService.cancel(id)
      toast.success('Agendamento cancelado com sucesso')
      setAppointments((prev) =>
        prev.map((a) => (a.id === id ? { ...a, status: 'CANCELLED' } : a))
      )
    } catch (err) {
      const msg = err.response?.data?.message || 'Erro ao cancelar agendamento'
      toast.error(msg)
    }
  }, [toast])

  return { appointments, loading, error, cancel, refetch: fetch }
}