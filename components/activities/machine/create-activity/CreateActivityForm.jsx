import { useForm } from '../../../../context/providers/FormContext'
import Input from '../../../Input'
import EditActivityForm from '../edit-activity/EditActivityForm'

export default function CreateActivityForm() {
  const { errors, initialValues, touched, upperCaseHandleChange, values } =
    useForm()

  return (
    <>
      <Input
        id='code'
        label='Código'
        placeholder={`${initialValues.code}001`}
        value={values.code}
        onChange={upperCaseHandleChange()}
        error={errors.code}
        touched={touched.code}
      />
      <EditActivityForm />
    </>
  )
}
