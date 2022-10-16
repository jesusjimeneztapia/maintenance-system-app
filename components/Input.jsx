import styles from '../styles/Input.module.css'

export default function Input({
  id,
  label,
  placeholder,
  value,
  onChange,
  type = 'text',
  required = false,
  error,
  disabled,
}) {
  return (
    <div className={`${styles.group} ${error && styles.error}`}>
      <label htmlFor={id}>{label}</label>
      <input
        type={type}
        id={id}
        name={id}
        className={styles.input}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required={required}
        autoComplete='off'
        disabled={disabled}
      />
      {error && <small>{error}</small>}
    </div>
  )
}
