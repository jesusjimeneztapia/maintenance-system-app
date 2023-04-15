import { Flex } from '@tremor/react'
import { Label, Textarea } from 'flowbite-react'

export default function CustomTextarea({
  id,
  name,
  label,
  placeholder,
  value,
  onChange,
  rows = 4,
  error,
  touched,
  required = false,
  disabled,
}) {
  return (
    <Flex flexDirection='col' alignItems=''>
      <Label
        htmlFor={id}
        value={label}
        color={touched && error ? 'failure' : undefined}
      />
      <Textarea
        className='resize-none'
        id={id}
        name={name ?? id}
        rows={rows}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        color={touched && error ? 'failure' : undefined}
        helperText={touched ? error : undefined}
        required={required}
        disabled={disabled}
      />
    </Flex>
  )
}
