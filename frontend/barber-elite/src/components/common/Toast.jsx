import { useToastContext } from '../../context/ToastContext'
import styles from './Toast.module.css'

const icons = {
  success: '✓',
  error: '✕',
  warning: '⚠',
  info: 'ℹ',
}

export default function Toast() {
  const { toasts, removeToast } = useToastContext()

  return (
    <div className={styles.container} aria-live="polite" aria-atomic="false">
      {toasts.map((t) => (
        <div
          key={t.id}
          className={[styles.toast, styles[t.type]].join(' ')}
          role="alert"
        >
          <span className={styles.icon} aria-hidden="true">{icons[t.type]}</span>
          <span className={styles.message}>{t.message}</span>
          <button
            className={styles.close}
            onClick={() => removeToast(t.id)}
            aria-label="Fechar notificação"
          >
            ✕
          </button>
        </div>
      ))}
    </div>
  )
}