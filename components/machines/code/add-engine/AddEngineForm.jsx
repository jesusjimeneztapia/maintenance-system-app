import React from 'react'
import { useForm } from '../../../../context/providers/FormContext'
import Input from '../../../Input'
import EditEngineForm from '../edit-engine/EditEngineForm'

export default function AddEngineForm() {
  const { errors, touched, upperCaseHandleChange, values } = useForm()

  return (
    <>
      <Input
        id='code'
        label='Código'
        placeholder='Código del motor'
        value={values.code}
        onChange={upperCaseHandleChange()}
        error={touched.code ? errors.code : undefined}
      />
      <EditEngineForm />
    </>
  )
}
