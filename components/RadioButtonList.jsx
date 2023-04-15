import { useEffect, useState } from 'react'
import { Flex } from '@tremor/react'
import { Label, Radio, TextInput } from 'flowbite-react'

export default function RadioButtonList({
  id,
  name,
  label,
  value: currentValue,
  optionsMap,
  onChange,
  disabled,
  error,
  touched,
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
    <>
      <Flex flexDirection='col' alignItems=''>
        <Label value={label} color={touched && error ? 'failure' : undefined} />
        {Object.entries(optionsMap).map(([value, text]) => (
          <Flex key={value} className='gap-2' justifyContent=''>
            <Radio
              id={`${id}-${value}`}
              name={name ?? id}
              value={value}
              onChange={onChange}
              checked={`${currentValue}` === value}
              disabled={disabled}
            />
            <Label htmlFor={`${id}-${value}`} value={text} />
          </Flex>
        ))}
        {anotherField && (
          <TextInput
            className='pt-3'
            id={id}
            name={name ?? id}
            autoComplete='off'
            color={touched && error ? 'failure' : undefined}
            helperText={touched ? error : undefined}
            disabled={disabled}
            type={anotherField.type ?? 'text'}
            placeholder={anotherField.placeholder}
            value={anotherValue}
            onChange={anotherField.onChange ?? onChange}
            onBlurCapture={() => setAnotherFocus(false)}
            onFocusCapture={() => setAnotherFocus(true)}
          />
        )}
      </Flex>
    </>
  )
}
