import { useForm } from '../../../../context/providers/FormContext'
import Input from '../../../Input'
import EditActivityForm from '../edit-activity/EditActivityForm'

export default function CreateActivityForm() {
  const { errors, touched, upperCaseHandleChange, values } = useForm()

  return (
    <>
      <Input
        id='code'
        label='Código'
        placeholder='Código de la actividad'
        value={values.code}
        onChange={upperCaseHandleChange()}
        error={touched.code ? errors.code : undefined}
      />
      <EditActivityForm />
    </>
  )
}
