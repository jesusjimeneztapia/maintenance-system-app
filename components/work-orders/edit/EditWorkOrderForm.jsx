import { useForm } from '../../../context/providers/FormContext'
import { getDateValue } from '../../../libs/date'
import { WORK_ORDER_STATE_VALUES_MAP } from '../../../schemas/workOrder'
import Input from '../../Input'
import Select from '../../Select'

function getMinDate(isoString) {
  const date = isoString ? new Date(isoString) : new Date()
  return date
    .toLocaleString('af-ZA', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    })
    .replace(/\//g, '-')
}

function createStateMap(previous, current, next) {
  const map = {}
  if (previous) {
    map[previous] = WORK_ORDER_STATE_VALUES_MAP[previous]
  }
  map[current] = WORK_ORDER_STATE_VALUES_MAP[current]
  if (next) {
    map[next] = WORK_ORDER_STATE_VALUES_MAP[next]
  }
  return map
}

export default function EditWorkOrderForm() {
  const {
    errors,
    handleChange,
    initialValues,
    upperCaseHandleChange,
    touched,
    values,
  } = useForm()

  return (
    <>
      <Select
        id='state'
        label='Estado'
        value={values.state}
        placeholder='Seleccione el estado'
        optionsMap={createStateMap(
          initialValues.previousState,
          initialValues.state,
          initialValues.nextState
        )}
        onChange={handleChange}
        error={touched.state ? errors.state : undefined}
      />
      {initialValues.activityType === 'CORRECTIVO' && (
        <Input
          id='failureCause'
          label='Causa de falla'
          placeholder='Escriba la causa de falla'
          onChange={upperCaseHandleChange()}
          value={values.failureCause ?? ''}
          error={touched.failureCause ? errors.failureCause : undefined}
        />
      )}
      <Input
        id='startDate'
        label='Fecha inicio'
        placeholder='Seleccione la fecha inicio'
        type='date'
        min={getMinDate()}
        onChange={handleChange}
        value={getDateValue(values.startDate)}
        error={touched.startDate ? errors.startDate : undefined}
      />
      <Input
        id='endDate'
        label='Fecha final'
        placeholder='Seleccione la fecha final'
        type='date'
        min={values.startDate ?? ''}
        onChange={handleChange}
        value={getDateValue(values.endDate)}
        error={touched.endDate ? errors.endDate : undefined}
        disabled={!values.startDate}
      />
    </>
  )
}
