import { Flex } from '@tremor/react'
import { Label, TextInput } from 'flowbite-react'

export default function Input({
  id,
  name,
  label,
  placeholder,
  value,
  onChange,
  type = 'text',
  required = false,
  error,
  touched,
  disabled,
  onBlurCapture,
  onFocusCapture,
  ...props
}) {
  return (
    <Flex flexDirection='col' alignItems=''>
      <Label
        htmlFor={id}
        value={label}
        color={touched && error ? 'failure' : undefined}
      />
      <TextInput
        id={id}
        name={name ?? id}
        type={type}
        placeholder={placeholder}
        autoComplete='off'
        value={value}
        onChange={onChange}
        color={touched && error ? 'failure' : undefined}
        helperText={touched ? error : undefined}
        required={required}
        disabled={disabled}
        onBlurCapture={onBlurCapture}
        onFocusCapture={onFocusCapture}
        {...props}
      />
    </Flex>
  )
}
