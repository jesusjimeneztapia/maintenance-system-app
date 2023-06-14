import Input from '../../Input'
import { useForm } from '../../../context/providers/FormContext'
import EditMachineForm from '../code/EditMachineForm'

export default function RegisterMachineForm({ fields }) {
  const { errors, initialValues, touched, upperCaseHandleChange, values } =
    useForm()

  return (
    <>
      <Input
        id='code'
        label='Código'
        placeholder={initialValues.code || 'CB-01-PRX-01'}
        value={values.code ?? ''}
        onChange={upperCaseHandleChange()}
        error={errors.code}
        touched={touched.code}
      />
      <EditMachineForm fields={fields} />
    </>
  )
}
