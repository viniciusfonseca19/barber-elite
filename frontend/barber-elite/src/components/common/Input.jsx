import styles from './Input.module.css'

export default function Input({
  label,
  error,
  id,
  hint,
  ...rest
}) {
  const inputId = id || label?.toLowerCase().replace(/\s/g, '-')

  return (
    <div className={styles.wrapper}>
      {label && (
        <label htmlFor={inputId} className={styles.label}>
          {label}
        </label>
      )}
      <input
        id={inputId}
        className={[styles.input, error ? styles.hasError : ''].join(' ')}
        {...rest}
      />
      {hint && !error && <span className={styles.hint}>{hint}</span>}
      {error && <span className={styles.error} role="alert">{error}</span>}
    </div>
  )
}