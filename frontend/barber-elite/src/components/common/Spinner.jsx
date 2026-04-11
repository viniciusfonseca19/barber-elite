import styles from './Spinner.module.css'

export default function Spinner({ size = 'md', text = 'Carregando...' }) {
  return (
    <div className={styles.wrapper} role="status" aria-label={text}>
      <div className={[styles.ring, styles[size]].join(' ')} />
      {text && <span className={styles.text}>{text}</span>}
    </div>
  )
}