import { useServices } from '../../hooks/useServices'
import { formatCurrency } from '../../utils/formatters'
import styles from './ServiceSelector.module.css'

// Nomes conhecidos de cortes e extras
const haircuts = ['Degradê', 'Social']
const extras = ['Barba', 'Cavanhaque', 'Sobrancelha']
const mutuallyExclusive = ['Barba', 'Cavanhaque']

export default function ServiceSelector({ selectedIds = [], onChange }) {
  const { services, loading, error } = useServices()

  if (loading) return <div className={styles.loading}>Carregando serviços...</div>
  if (error) return <div className={styles.loading}>⚠️ Erro: {error}</div>
  if (!services || services.length === 0) return <div className={styles.loading}>❌ Nenhum serviço disponível</div>

  // Se a API retorna um objeto com propriedades 'haircuts' e 'extras', usa-as
  let haircutServices = []
  let extraServices = []

  if (Array.isArray(services)) {
    // Se é um array, filtra pelos nomes conhecidos
    haircutServices = services.filter((s) => haircuts.includes(s.name))
    extraServices = services.filter((s) => extras.includes(s.name))
  } else if (typeof services === 'object') {
    // Se é um objeto com propriedades
    if (services.haircuts && Array.isArray(services.haircuts)) {
      haircutServices = services.haircuts
    }
    if (services.extras && Array.isArray(services.extras)) {
      extraServices = services.extras
    }
  }

  if (haircutServices.length === 0 && extraServices.length === 0) {
    return (
      <div className={styles.loading}>
        ⚠️ Nenhum serviço foi categorizado corretamente.
        <br />
        <small>Verifica se os nomes na API correspondem a: {haircuts.join(', ')}, {extras.join(', ')}</small>
      </div>
    )
  }

  function handleHaircutChange(serviceId) {
    onChange([serviceId, ...selectedIds.filter((id) => !haircutServices.some((s) => s.id === id))])
  }

  function handleExtraChange(serviceId, isChecked) {
    const serviceName = services.find?.((s) => s.id === serviceId)?.name ||
                        haircutServices.find?.((s) => s.id === serviceId)?.name ||
                        extraServices.find?.((s) => s.id === serviceId)?.name
    let newIds = selectedIds.filter((id) => id !== serviceId)

    if (isChecked) {
      if (serviceName && mutuallyExclusive.includes(serviceName)) {
        const otherExclusive = mutuallyExclusive.find((name) => name !== serviceName)
        const otherServiceId = [
          ...haircutServices,
          ...extraServices,
          ...(Array.isArray(services) ? services : [])
        ].find((s) => s.name === otherExclusive)?.id
        if (otherServiceId) {
          newIds = newIds.filter((id) => id !== otherServiceId)
        }
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
      {haircutServices.length > 0 && (
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
      )}

      {/* Serviços Extras */}
      {extraServices.length > 0 && (
        <fieldset className={styles.fieldset}>
          <legend className={styles.legend}>Serviços Extras</legend>
          <div className={styles.grid}>
            {extraServices.map((svc) => {
              const isSelected = selectedExtraIds.includes(svc.id)
              const isDisabled =
                svc.name && mutuallyExclusive.includes(svc.name) &&
                selectedExtraIds.some((id) => {
                  const name = extraServices.find((s) => s.id === id)?.name
                  return name && mutuallyExclusive.includes(name) && name !== svc.name
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
      )}
    </div>
  )
}