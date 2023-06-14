import React from 'react'
import { useForm } from '../../../../context/providers/FormContext'
import Input from '../../../Input'
import EditEngineForm from '../edit-engine/EditEngineForm'

export default function AddEngineForm({ fields }) {
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
      <EditEngineForm fields={fields} />
    </>
  )
}
