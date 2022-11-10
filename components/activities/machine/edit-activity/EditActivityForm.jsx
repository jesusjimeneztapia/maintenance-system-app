import { useForm } from '../../../../context/providers/FormContext'
import { activityType } from '../../../../schemas/activity'
import Input from '../../../Input'
import Select from '../../../Select'

const weekly = 24 * 7
const monthly = 24 * 30
const bimonthly = monthly * 2
const quarterly = monthly * 3
const fourMonth = monthly * 4
const biannual = monthly * 6
const annual = monthly * 12
const twoAnnual = annual * 2
const fourAnnual = annual * 4

const frequencyValues = [
  {
    name: 'SEMANAL',
    frequency: weekly,
  },
  {
    name: 'MENSUAL',
    frequency: monthly,
  },
  {
    name: 'BIMESTRAL',
    frequency: bimonthly,
  },
  {
    name: 'TRIMESTRAL',
    frequency: quarterly,
  },
  {
    name: 'CUATRIMESTRE',
    frequency: fourMonth,
  },
  {
    name: 'SEMESTRAL',
    frequency: biannual,
  },
  { name: 'ANUAL', frequency: annual },
  { name: '2 AÑOS', frequency: twoAnnual },
  { name: '4 AÑOS', frequency: fourAnnual },
]

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
      <Select
        id='frequency'
        label='Frecuencia'
        value={values.frequency}
        onChange={handleChangeFrequency}
        error={touched.frequency ? errors.frequency : undefined}
      >
        <option value={0} disabled>
          Frecuencia de la actividad
        </option>
        {frequencyValues.map(({ name, frequency }) => {
          return (
            <option key={frequency} value={frequency}>
              {name}
            </option>
          )
        })}
      </Select>
      <Select
        id='activityType'
        label='Tipo'
        value={values.activityType}
        onChange={handleChange}
        error={touched.activityType ? errors.activityType : undefined}
      >
        <option value='' disabled>
          Tipo de actividad
        </option>
        {Object.entries(activityType).map(([value, name]) => (
          <option key={value} value={value}>
            {name}
          </option>
        ))}
      </Select>
    </>
  )
}
