import { useEffect, useState } from 'react'

import styles from '../styles/Input.module.css'
import Input from './Input'
import RadioButton from './RadioButton'

export default function RadioButtonList({
  id,
  label,
  value: currentValue,
  optionsMap,
  onChange,
  disabled,
  error,
  anotherField,
}) {
  const [anotherValue, setAnotherValue] = useState(
    anotherField ? anotherField.value ?? '' : ''
  )
  const [anotherFocus, setAnotherFocus] = useState(false)

  useEffect(() => {
    if (anotherField) {
      setAnotherValue((anotherValue) => {
        if (optionsMap[currentValue]) {
          if (anotherFocus && anotherValue !== '') {
            return currentValue
          }
          return ''
        }
        return currentValue
      })
    }
  }, [currentValue, anotherField, anotherFocus, optionsMap])

  return (
    <div className={`${styles.group} ${error && styles.error}`}>
      <label>{label}</label>
      <div className={styles['radio-button-list']}>
        {Object.entries(optionsMap).map(([value, label]) => (
          <RadioButton
            key={value}
            id={value}
            name={id}
            label={label}
            value={value}
            onChange={onChange}
            currentValue={currentValue}
            disabled={disabled}
          />
        ))}
        {anotherField && (
          <Input
            id={id}
            type={anotherField.type ?? 'text'}
            placeholder={anotherField.placeholder}
            value={anotherValue}
            onChange={anotherField.onChange ?? onChange}
            onBlurCapture={() => setAnotherFocus(false)}
            onFocusCapture={() => setAnotherFocus(true)}
          />
        )}
        {error && <small>{error}</small>}
      </div>
    </div>
  )
}
