import { formatCurrency, formatDateTime, formatPhone, formatStatus } from '../../utils/formatters'
import Button from '../common/Button'
import styles from './AppointmentCard.module.css'

export default function AppointmentCard({ appointment, onCancel, isAdmin = false }) {
  const { id, client, service, scheduledAt, status } = appointment
  const isCancelled = status === 'CANCELLED'

  return (
    <article className={[styles.card, isCancelled ? styles.cancelled : ''].join(' ')}>
      <div className={styles.header}>
        <div className={styles.dateBlock}>
          <span className={styles.time}>{formatDateTime(scheduledAt)}</span>
        </div>
        <span className={[styles.badge, styles[status.toLowerCase()]].join(' ')}>
          {formatStatus(status)}
        </span>
      </div>

      <div className={styles.body}>
        <div className={styles.info}>
          <div className={styles.infoRow}>
            <span className={styles.label}>Cliente</span>
            <span className={styles.value}>{client.fullName}</span>
          </div>
          <div className={styles.infoRow}>
            <span className={styles.label}>Telefone</span>
            <span className={styles.value}>{formatPhone(client.phone)}</span>
          </div>
          <div className={styles.infoRow}>
            <span className={styles.label}>Serviço</span>
            <span className={styles.value}>{service.name}</span>
          </div>
          <div className={styles.infoRow}>
            <span className={styles.label}>Valor</span>
            <span className={[styles.value, styles.price].join(' ')}>
              {formatCurrency(service.price)}
            </span>
          </div>
        </div>

        {isAdmin && !isCancelled && (
          <div className={styles.actions}>
            <Button
              variant="danger"
              size="sm"
              onClick={() => onCancel(id)}
            >
              Cancelar
            </Button>
          </div>
        )}
      </div>

      {client.isBlocked && (
        <div className={styles.blockedBanner}>
          ⚠ Cliente bloqueado
        </div>
      )}
    </article>
  )
}