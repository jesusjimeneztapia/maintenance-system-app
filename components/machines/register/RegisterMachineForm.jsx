import Input from '../../Input'
import { useForm } from '../../../context/providers/FormContext'
import EditMachineForm from '../code/EditMachineForm'

export default function RegisterMachineForm() {
  const { errors, touched, upperCaseHandleChange, values } = useForm()

  return (
    <>
      <Input
        id='code'
        label='Código'
        placeholder='Código de la máquina'
        value={values.code}
        onChange={upperCaseHandleChange()}
        error={touched.code ? errors.code : undefined}
      />
      <EditMachineForm />
    </>
  )
}
