import { Checkbox, Label } from 'flowbite-react'
import { Flex } from '@tremor/react'

export default function CheckboxList({
  id,
  name,
  label,
  values = [],
  moreInfo,
  optionsMap,
  onChange,
  disabled,
}) {
  return (
    <Flex className='gap-1' flexDirection='col' alignItems=''>
      <Label value={label} />
      {moreInfo}
      {Object.entries(optionsMap).map(([value, text]) => (
        <Flex key={value} className='gap-2' justifyContent=''>
          <Checkbox
            id={value}
            name={name ?? id}
            value={value}
            onChange={onChange}
            checked={values.some((element) => `${element}` === value)}
            disabled={disabled}
          />
          <Label htmlFor={value} value={text} />
        </Flex>
      ))}
    </Flex>
  )
}
