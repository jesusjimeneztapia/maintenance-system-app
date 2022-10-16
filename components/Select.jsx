import styles from '../styles/Input.module.css'

export default function Select({
  children,
  id,
  label,
  onChange,
  error,
  required = false,
  value = '',
  disabled,
}) {
  return (
    <div className={`${styles.group} ${error && styles.error}`}>
      <label htmlFor={id}>{label}</label>
      <select
        id={id}
        name={id}
        className={styles.input}
        value={value}
        onChange={onChange}
        required={required}
        disabled={disabled}
      >
        {children}
      </select>
      {error && <small>{error}</small>}
    </div>
  )
}
