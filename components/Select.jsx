import { Flex } from '@tremor/react'
import { Label, Select } from 'flowbite-react'

export default function CustomSelect({
  id,
  name,
  label,
  onChange,
  error,
  touched,
  required = false,
  value = '',
  placeholder,
  optionsMap,
  disabled,
}) {
  return (
    <Flex flexDirection='col' alignItems=''>
      <Label
        htmlFor={id}
        value={label}
        color={touched && error ? 'failure' : undefined}
      />
      <Select
        id={id}
        name={name ?? id}
        value={value}
        onChange={onChange}
        color={touched && error ? 'failure' : undefined}
        helperText={touched ? error : undefined}
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
      </Select>
    </Flex>
  )
}
