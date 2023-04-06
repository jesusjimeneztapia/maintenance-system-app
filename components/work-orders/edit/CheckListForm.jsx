import Input from '../../Input'
import RadioButtonList from '../../RadioButtonList'
import Textarea from '../../Textarea'

function CheckList({ id, field, type, options, placeholder, onChange, value }) {
  if (type === 'radio') {
    return (
      <RadioButtonList
        id={id}
        label={field}
        optionsMap={options.reduce((a, v) => ({ ...a, [v]: v }), {})}
        onChange={onChange}
        value={value}
      />
    )
  }
  if (type === 'info') {
    return (
      <div>
        <p style={{ fontSize: '14px', fontWeight: '500' }}>{field}</p>
        <p style={{ fontSize: '14px' }}>{placeholder}</p>
      </div>
    )
  }
  if (type === 'text' || type === 'number') {
    return (
      <Input
        id={id}
        label={field}
        onChange={onChange}
        placeholde={placeholder}
        type={type}
        value={value}
      />
    )
  }
  return (
    <Textarea
      id={id}
      label={field}
      onChange={onChange}
      placeholder={placeholder}
      value={value}
    />
  )
}

export default function CheckListForm({ checkList, setValues, values }) {
  const handleChange =
    ({ id, field }) =>
    ({ target: { value } }) => {
      setValues((values) => {
        let checkListVerified = values.checkListVerified ?? []
        const index = checkListVerified.findIndex((el) => el.id === id)
        if (index < 0) {
          checkListVerified = [...checkListVerified, { id, field, value }]
        } else {
          checkListVerified[index] = { id, field, value }
        }

        return { ...values, checkListVerified }
      })
    }
  return (
    <>
      {checkList.map(({ id, ...rest }) => (
        <CheckList
          key={id}
          id={id}
          {...rest}
          onChange={handleChange({ id, ...rest })}
          value={
            values.checkListVerified?.find((checkList) => checkList.id === id)
              ?.value || ''
          }
        />
      ))}
    </>
  )
}
