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
  onBlurCapture,
  onFocusCapture,
  ...props
}) {
  return (
    <div className={`${styles.group} ${error && styles.error}`}>
      {label && <label htmlFor={id}>{label}</label>}
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
        onBlurCapture={onBlurCapture}
        onFocusCapture={onFocusCapture}
        {...props}
      />
      {error && <small>{error}</small>}
    </div>
  )
}
