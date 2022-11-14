import { useForm } from '../../../../context/providers/FormContext'
import {
  ACTIVITY_TYPE_VALUES_MAP,
  FREQUENCY_VALUES_MAP,
} from '../../../../schemas/activity'
import Input from '../../../Input'
import RadioButtonList from '../../../RadioButtonList'
import Select from '../../../Select'

export default function EditActivityForm() {
  const {
    errors,
    handleChange,
    setValues,
    touched,
    upperCaseHandleChange,
    values,
  } = useForm()

  const handleChangeFrequency = ({ target: { value } }) => {
    setValues((values) => ({ ...values, frequency: parseInt(value) }))
  }

  return (
    <>
      <Input
        id='name'
        label='Nombre'
        placeholder='Nombre de la actividad'
        value={values.name}
        onChange={upperCaseHandleChange()}
        error={touched.name ? errors.name : undefined}
      />
      <RadioButtonList
        id='frequency'
        label='Frecuencia'
        value={values.frequency}
        optionsMap={FREQUENCY_VALUES_MAP}
        onChange={handleChangeFrequency}
        error={touched.frequency ? errors.frequency : undefined}
        anotherField={{
          type: 'number',
          placeholder: 'Frecuencia de actividad en horas',
          value: values.frequency,
          onChange: handleChange,
        }}
      />
      <Select
        id='activityType'
        label='Tipo'
        value={values.activityType}
        placeholder='Tipo de actividad'
        optionsMap={ACTIVITY_TYPE_VALUES_MAP}
        onChange={handleChange}
        error={touched.activityType ? errors.activityType : undefined}
      />
    </>
  )
}
