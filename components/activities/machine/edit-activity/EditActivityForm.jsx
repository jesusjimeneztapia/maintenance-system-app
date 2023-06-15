import { useForm } from '../../../../context/providers/FormContext'
import Input from '../../../Input'
import RadioButtonList from '../../../RadioButtonList'
import Select from '../../../Select'

export default function EditActivityForm({ fields }) {
  const {
    errors,
    initialValues,
    setValues,
    touched,
    upperCaseHandleChange,
    values,
  } = useForm()

  const handleChangeFrequency = ({ target: { value } }) => {
    setValues((values) => ({
      ...values,
      frequency: value === '' ? undefined : +value,
    }))
  }

  const handleChangeActivityType = ({ target: { value } }) => {
    setValues((values) => ({ ...values, activityTypeId: +value }))
  }

  return (
    <>
      <Input
        id='name'
        label='Nombre'
        placeholder={
          initialValues.name ||
          'LIMPIEZA DE TABLERO ELECTRICO, INSPECCION DE ELEMENTOS DE FUERZA Y MANDO'
        }
        value={values.name ?? ''}
        onChange={upperCaseHandleChange()}
        error={errors.name}
        touched={touched.name}
      />
      <RadioButtonList
        id='frequency'
        label='Frecuencia'
        value={values.frequency ?? ''}
        optionsMap={fields?.frequencies ?? {}}
        onChange={handleChangeFrequency}
        error={errors.frequency}
        touched={touched.frequency}
        anotherField={{
          type: 'number',
          placeholder: 'Frecuencia de actividad en horas',
          value: values.frequency,
          onChange: handleChangeFrequency,
        }}
      />
      <Select
        id='activityTypeId'
        label='Tipo'
        value={values.activityTypeId ?? ''}
        placeholder='Tipo de actividad'
        optionsMap={fields?.activityTypes ?? {}}
        onChange={handleChangeActivityType}
        error={errors.activityTypeId}
        touched={touched.activityTypeId}
      />
      <Input
        id='pem'
        label='PEM'
        placeholder={initialValues.name || 'PEM 001'}
        value={values.pem ?? ''}
        onChange={upperCaseHandleChange()}
        error={errors.pem}
        touched={touched.pem}
      />
    </>
  )
}
