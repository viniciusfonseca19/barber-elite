import { useServices } from '../../hooks/useServices'
import { formatCurrency } from '../../utils/formatters'
import styles from './ServiceSelector.module.css'

const haircuts = ['Degradê', 'Social']
const extras = ['Barba', 'Cavanhaque', 'Sobrancelha']
const mutuallyExclusive = ['Barba', 'Cavanhaque']

export default function ServiceSelector({ selectedIds = [], onChange }) {
  const { services, loading } = useServices()

  if (loading) return <div className={styles.loading}>Carregando serviços...</div>

  console.log('Serviços recebidos da API:', services)
  console.log('Nomes esperados para haircuts:', haircuts)
  console.log('Nomes esperados para extras:', extras)

  const haircutServices = services.filter((s) => haircuts.includes(s.name))
  const extraServices = services.filter((s) => extras.includes(s.name))

  console.log('Haircut services filtrados:', haircutServices)
  console.log('Extra services filtrados:', extraServices)

  function handleHaircutChange(serviceId) {
    onChange([serviceId, ...selectedIds.filter((id) => !haircutServices.some((s) => s.id === id))])
  }

  function handleExtraChange(serviceId, isChecked) {
    const serviceName = services.find((s) => s.id === serviceId)?.name
    let newIds = selectedIds.filter((id) => id !== serviceId)

    if (isChecked) {
      // Se o serviço é um dos mutuamente exclusivos, remove o outro
      if (mutuallyExclusive.includes(serviceName)) {
        const otherExclusive = mutuallyExclusive.find((name) => name !== serviceName)
        const otherServiceId = services.find((s) => s.name === otherExclusive)?.id
        newIds = newIds.filter((id) => id !== otherServiceId)
      }
      newIds.push(serviceId)
    }

    onChange(newIds)
  }

  const selectedHaircutId = selectedIds.find((id) =>
    haircutServices.some((s) => s.id === id)
  )

  const selectedExtraIds = selectedIds.filter((id) =>
    extraServices.some((s) => s.id === id)
  )

  return (
    <div className={styles.container}>
      {/* Cortes */}
      <fieldset className={styles.fieldset}>
        <legend className={styles.legend}>Tipo de Corte *</legend>
        <div className={styles.grid}>
          {haircutServices.map((svc) => (
            <label
              key={svc.id}
              className={[
                styles.card,
                selectedHaircutId === svc.id ? styles.selected : '',
              ].join(' ')}
            >
              <input
                type="radio"
                name="haircut"
                value={svc.id}
                checked={selectedHaircutId === svc.id}
                onChange={() => handleHaircutChange(svc.id)}
                className={styles.radio}
              />
              <span className={styles.cardName}>{svc.name}</span>
              <span className={styles.cardPrice}>{formatCurrency(svc.price)}</span>
            </label>
          ))}
        </div>
      </fieldset>

      {/* Serviços Extras */}
      <fieldset className={styles.fieldset}>
        <legend className={styles.legend}>Serviços Extras</legend>
        <div className={styles.grid}>
          {extraServices.map((svc) => {
            const isSelected = selectedExtraIds.includes(svc.id)
            const isDisabled =
              mutuallyExclusive.includes(svc.name) &&
              selectedExtraIds.some((id) => {
                const name = services.find((s) => s.id === id)?.name
                return mutuallyExclusive.includes(name) && name !== svc.name
              })

            return (
              <label
                key={svc.id}
                className={[
                  styles.card,
                  isSelected ? styles.selected : '',
                  isDisabled ? styles.disabled : '',
                ].join(' ')}
              >
                <input
                  type="checkbox"
                  name="extras"
                  value={svc.id}
                  checked={isSelected}
                  onChange={(e) => handleExtraChange(svc.id, e.target.checked)}
                  disabled={isDisabled}
                  className={styles.checkbox}
                />
                <span className={styles.cardName}>{svc.name}</span>
                <span className={styles.cardPrice}>{formatCurrency(svc.price)}</span>
              </label>
            )
          })}
        </div>
      </fieldset>
    </div>
  )
}