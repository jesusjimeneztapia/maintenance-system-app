import styles from '../styles/Input.module.css'

export default function Checkbox({
  id,
  name,
  label,
  value,
  onChange,
  values = [],
  required = false,
  disabled,
}) {
  return (
    <div className={styles.checkbox}>
      <input
        type='checkbox'
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        checked={values.includes(value)}
        disabled={disabled}
      />
      <label htmlFor={id}>{label}</label>
    </div>
  )
}
