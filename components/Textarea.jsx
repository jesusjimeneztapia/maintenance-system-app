import styles from '../styles/Input.module.css'

export default function Textarea({
  id,
  label,
  placeholder,
  value,
  onChange,
  rows = 4,
  error,
  required = false,
  disabled,
}) {
  return (
    <div className={`${styles.group} ${error && styles.error}`}>
      <label htmlFor={id}>{label}</label>
      <textarea
        id={id}
        name={id}
        rows={rows}
        className={`${styles.input} ${styles.textarea}`}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required={required}
        disabled={disabled}
      />
      {error && <small>{error}</small>}
    </div>
  )
}
