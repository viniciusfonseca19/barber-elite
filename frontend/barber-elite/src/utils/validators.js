export function validatePhone(phone) {
  const digits = phone.replace(/\D/g, '')
  return digits.length >= 10 && digits.length <= 11
}

export function validateFullName(name) {
  return name.trim().split(' ').length >= 2
}

// Valida se o horário está dentro do expediente
export function isWithinBusinessHours(dateTime) {
  const d = new Date(dateTime)
  const day = d.getDay()          // 0=Dom
  if (day === 0) return false     // Domingo fechado

  const hh = d.getHours()
  const mm = d.getMinutes()
  const total = hh * 60 + mm

  const morningStart = 9 * 60 + 30    // 09:30
  const morningEnd   = 12 * 60        // 12:00
  const afternoonStart = 14 * 60      // 14:00
  const afternoonEnd   = 18 * 60      // 18:00

  return (
    (total >= morningStart && total <= morningEnd) ||
    (total >= afternoonStart && total <= afternoonEnd)
  )
}

// Gera slots de horário disponíveis para um dia
export function generateTimeSlots() {
  const slots = []
  const add = (h, m) => slots.push(`${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`)

  // Manhã: 09:30 até 12:00 (intervalos de 30min)
  for (let h = 9; h <= 12; h++) {
    for (let m = 0; m < 60; m += 30) {
      if (h === 9 && m < 30) continue
      if (h === 12 && m > 0) break
      add(h, m)
    }
  }

  // Tarde: 14:00 até 18:00 (intervalos de 30min)
  for (let h = 14; h <= 18; h++) {
    for (let m = 0; m < 60; m += 30) {
      if (h === 18 && m > 0) break
      add(h, m)
    }
  }

  return slots
}

// Retorna o mínimo de data para o datepicker (hoje)
export function getMinDate() {
  const now = new Date()
  now.setSeconds(0, 0)
  return now.toISOString().slice(0, 16)
}