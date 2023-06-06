import { useForm } from '../../context/providers/FormContext'
import Input from '../Input'

export default function EditStoreForm({ disabled = false }) {
  const { errors, touched, values, handleChange } = useForm()
  return (
    <>
      <Input
        id='amount'
        label='Cantidad'
        placeholder='0'
        type='number'
        value={values.amount ?? ''}
        onChange={handleChange}
        error={errors.amount}
        touched={touched.amount}
        disabled={disabled}
      />
      <Input
        id='minimumAmount'
        label='Cantidad mínima'
        placeholder='1'
        type='number'
        value={values.minimumAmount ?? ''}
        onChange={handleChange}
        error={errors.minimumAmount}
        touched={touched.minimumAmount}
        disabled={disabled}
      />
    </>
  )
}
