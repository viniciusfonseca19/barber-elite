import { useServices } from '../../hooks/useServices'
import { formatCurrency } from '../../utils/formatters'
import styles from './ServiceSelector.module.css'

export default function ServiceSelector({ selectedId, onChange }) {
  const { services, loading } = useServices()

  if (loading) return <div className={styles.loading}>Carregando serviços...</div>

  return (
    <fieldset className={styles.fieldset}>
      <legend className={styles.legend}>Serviço</legend>
      <div className={styles.grid}>
        {services.map((svc) => (
          <label
            key={svc.id}
            className={[
              styles.card,
              selectedId === svc.id ? styles.selected : '',
            ].join(' ')}
          >
            <input
              type="radio"
              name="service"
              value={svc.id}
              checked={selectedId === svc.id}
              onChange={() => onChange(svc.id)}
              className={styles.radio}
            />
            <span className={styles.cardName}>{svc.name}</span>
            <span className={styles.cardPrice}>{formatCurrency(svc.price)}</span>
          </label>
        ))}
      </div>
    </fieldset>
  )
}