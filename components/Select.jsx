import styles from '../styles/Input.module.css'

export default function Select({
  id,
  label,
  onChange,
  error,
  required = false,
  value = '',
  placeholder,
  optionsMap,
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
        {placeholder && (
          <option value='' disabled>
            {placeholder}
          </option>
        )}
        {Object.entries(optionsMap).map(([value, name]) => (
          <option key={value} value={value}>
            {name}
          </option>
        ))}
      </select>
      {error && <small>{error}</small>}
    </div>
  )
}
