import Checkbox from './Checkbox'
import styles from '../styles/Input.module.css'

export default function CheckboxList({
  id,
  label,
  values = [],
  options,
  onChange,
  disabled,
}) {
  return (
    <div className={styles.group}>
      <label>{label}</label>
      <div className={styles['checkbox-list']}>
        {options.map(({ label, value }) => (
          <Checkbox
            key={value}
            id={value}
            name={id}
            label={label}
            value={value}
            onChange={onChange}
            values={values}
            disabled={disabled}
          />
        ))}
      </div>
    </div>
  )
}
