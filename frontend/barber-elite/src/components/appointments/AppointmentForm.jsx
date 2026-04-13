import { useState } from 'react'
import appointmentService from '../../services/appointmentService'
import { useToast } from '../../hooks/useToast'
import { generateTimeSlots, isWithinBusinessHours, validateFullName, validatePhone } from '../../utils/validators'
import Input from '../common/Input'
import Button from '../common/Button'
import ServiceSelector from './ServiceSelector'
import styles from './AppointmentForm.module.css'

export default function AppointmentForm({ onSuccess }) {
  const toast = useToast()
  const timeSlots = generateTimeSlots()

  const [form, setForm] = useState({
    fullName: '',
    phone: '',
    date: '',
    time: '',
    serviceIds: [],
  })
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)

  function handleChange(field, value) {
    setForm((prev) => ({ ...prev, [field]: value }))
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: null }))
  }

  function validate() {
    const errs = {}
    if (!validateFullName(form.fullName))
      errs.fullName = 'Informe nome e sobrenome'
    if (!validatePhone(form.phone))
      errs.phone = 'Telefone inválido (ex: 85 99999-9999)'
    if (!form.date)
      errs.date = 'Selecione uma data'
    if (!form.time)
      errs.time = 'Selecione um horário'
    if (!form.serviceIds || form.serviceIds.length === 0)
      errs.serviceIds = 'Selecione um tipo de corte'

    if (form.date && form.time) {
      const dt = new Date(`${form.date}T${form.time}:00`)
      if (dt <= new Date()) errs.date = 'A data deve ser futura'
      else if (!isWithinBusinessHours(dt))
        errs.time = 'Horário fora do expediente'
    }

    return errs
  }

  async function handleSubmit(e) {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length) { setErrors(errs); return }

    setLoading(true)
    try {
      const scheduledAt = `${form.date}T${form.time}:00`
      await appointmentService.create({
        fullName: form.fullName.trim(),
        phone: form.phone.replace(/\D/g, ''),
        scheduledAt,
        serviceIds: form.serviceIds,
      })
      toast.success('Agendamento realizado com sucesso!')
      setForm({ fullName: '', phone: '', date: '', time: '', serviceIds: [] })
      onSuccess?.()
    } catch (err) {
      const msg = err.response?.data?.message || 'Erro ao realizar agendamento'
      toast.error(msg)
    } finally {
      setLoading(false)
    }
  }

  // Data mínima: hoje
  const today = new Date().toISOString().split('T')[0]

  return (
    <form className={styles.form} onSubmit={handleSubmit} noValidate>
      <div className={styles.row}>
        <Input
          label="Nome completo"
          placeholder="João da Silva"
          value={form.fullName}
          onChange={(e) => handleChange('fullName', e.target.value)}
          error={errors.fullName}
          autoComplete="name"
        />
        <Input
          label="Telefone / WhatsApp"
          placeholder="(85) 99999-9999"
          value={form.phone}
          onChange={(e) => handleChange('phone', e.target.value)}
          error={errors.phone}
          autoComplete="tel"
          inputMode="tel"
        />
      </div>

      <div className={styles.row}>
        <Input
          label="Data"
          type="date"
          value={form.date}
          min={today}
          onChange={(e) => handleChange('date', e.target.value)}
          error={errors.date}
        />

        <div className={styles.timeWrapper}>
          <label className={styles.timeLabel}>Horário</label>
          <select
            className={[styles.select, errors.time ? styles.selectError : ''].join(' ')}
            value={form.time}
            onChange={(e) => handleChange('time', e.target.value)}
            aria-label="Horário"
          >
            <option value="">Selecione</option>
            <optgroup label="Manhã (09:30 – 12:00)">
              {timeSlots.filter(t => t < '13:00').map(t => (
                <option key={t} value={t}>{t}</option>
              ))}
            </optgroup>
            <optgroup label="Tarde (14:00 – 18:00)">
              {timeSlots.filter(t => t >= '14:00').map(t => (
                <option key={t} value={t}>{t}</option>
              ))}
            </optgroup>
          </select>
          {errors.time && <span className={styles.errorMsg}>{errors.time}</span>}
        </div>
      </div>

      <ServiceSelector
        selectedIds={form.serviceIds}
        onChange={(ids) => handleChange('serviceIds', ids)}
      />
      {errors.serviceIds && (
        <span className={styles.errorMsg}>{errors.serviceIds}</span>
      )}

      <Button type="submit" loading={loading} fullWidth size="lg">
        Confirmar agendamento
      </Button>
    </form>
  )
}