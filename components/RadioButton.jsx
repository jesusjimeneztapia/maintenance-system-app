import styles from '../styles/Input.module.css'

export default function RadioButton({
  id,
  name,
  label,
  value,
  onChange,
  currentValue,
  required = false,
  disabled,
}) {
  return (
    <div className={styles['radio-button']}>
      <input
        type='radio'
        id={id}
        value={value}
        onChange={onChange}
        required={required}
        checked={value === currentValue}
        disabled={disabled}
      />
      <label htmlFor={id}>{label}</label>
    </div>
  )
}
