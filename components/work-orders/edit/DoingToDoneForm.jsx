import { useEffect } from 'react'
import { useForm } from '../../../context/providers/FormContext'
import { WORK_ORDER_SECURITY_MEASURE_END_VALUES } from '../../../schemas/workOrder'
import CheckboxList from '../../CheckboxList'
import Input from '../../Input'
import Textarea from '../../Textarea'
import CheckListForm from './CheckListForm'
import SelectStoreForm from './SelectStoreForm'
import { Flex, Text } from '@tremor/react'

function showDate(stringData) {
  const date = new Date(stringData)
  if (date.toString() === 'Invalid Date') {
    return '-'
  }
  return date.toLocaleDateString('es-ES', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}
function showHour(stringData) {
  const date = new Date(stringData)
  if (date.toString() === 'Invalid Date') {
    return '-'
  }
  return date.toLocaleTimeString('es-ES', {
    hour: '2-digit',
    minute: '2-digit',
    hourCycle: 'h12',
  })
}

export default function DoingToDoneForm() {
  const {
    errors,
    handleChange,
    setValues,
    touched,
    upperCaseHandleChange,
    values,
  } = useForm()

  useEffect(() => {
    setValues((values) => {
      const startDate = new Date(values.startDate)
      const endDate = new Date()
      const startHour = startDate.toLocaleTimeString('es-ES', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
      })
      const endHour = endDate.toLocaleTimeString('es-ES', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
      })
      const totalHours = Math.round(Math.abs(startDate - endDate) / 1000 / 3600)
      return {
        ...values,
        state: 'DONE',
        endDate: endDate.toISOString(),
        startHour,
        endHour,
        totalHours,
      }
    })
  }, [setValues])

  if (values.machine.checkList?.length > 0) {
    return (
      <CheckListForm
        checkList={values.machine.checkList}
        setValues={setValues}
        values={values}
      />
    )
  }

  return (
    <>
      <Textarea
        id='activityDescription'
        label='Descripción de la actividad'
        placeholder='Descripción de la actividad...'
        onChange={upperCaseHandleChange()}
        value={values.activityDescription ?? ''}
        error={errors.activityDescription}
        touched={touched.activityDescription}
        required
      />

      <SelectStoreForm />

      {values.activityType === 'CORRECTIVE' && (
        <Textarea
          id='failureCause'
          label='Causa de falla'
          placeholder='Causa de falla...'
          onChange={upperCaseHandleChange()}
          value={values.failureCause}
          error={errors.failureCause}
          touched={touched.failureCause}
          required
        />
      )}
      <Flex className='max-sm:flex-col gap-4'>
        <Flex flexDirection='col' alignItems='start'>
          <Text className='text-slate-900 font-medium'>Fecha inicio</Text>
          <Text className='text-slate-900'>{showDate(values.startDate)}</Text>
        </Flex>
        <Flex flexDirection='col' alignItems='start'>
          <Text className='text-slate-900 font-medium'>Hora inicio</Text>
          <Text className='text-slate-900'>{showHour(values.startDate)}</Text>
        </Flex>
      </Flex>
      <Flex className='max-sm:flex-col gap-4'>
        <Flex flexDirection='col' alignItems='start'>
          <Text className='text-slate-900 font-medium'>Fecha fin</Text>
          <Text className='text-slate-900'>{showDate(values.endDate)}</Text>
        </Flex>
        <Flex flexDirection='col' alignItems='start'>
          <Text className='text-slate-900 font-medium'>Hora fin</Text>
          <Text className='text-slate-900'>{showHour(values.endDate)}</Text>
        </Flex>
      </Flex>

      <Input
        id='totalHours'
        label='Horas totales'
        placeholder='Indique las horas totales'
        type='number'
        onChange={handleChange}
        value={values.totalHours ?? ''}
        error={errors.totalHours}
        touched={touched.totalHours}
      />
      <CheckboxList
        id='securityMeasureEnds'
        label='Medidas de seguridad fin del trabajo'
        values={values.securityMeasureEnds}
        optionsMap={WORK_ORDER_SECURITY_MEASURE_END_VALUES}
        onChange={handleChange}
      />
      <Textarea
        id='observations'
        label='Observaciones'
        placeholder='Observaciones de la orden de trabajo...'
        onChange={upperCaseHandleChange()}
        value={values.observations ?? ''}
        error={errors.observations}
        touched={touched.observations}
        required
      />
    </>
  )
}
