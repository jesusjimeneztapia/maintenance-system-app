import { useEffect } from 'react'
import { useForm } from '../../../context/providers/FormContext'
import { getDateValue } from '../../../libs/date'
import { WORK_ORDER_SECURITY_MEASURE_END_VALUES } from '../../../schemas/workOrder'
import CheckboxList from '../../CheckboxList'
import Input from '../../Input'
import Textarea from '../../Textarea'
import CheckListForm from './CheckListForm'
import { Col, Grid, Text } from '@tremor/react'

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

  if (values.machine.checkList) {
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
      <Text className='text-slate-900 font-medium'>Repuestos</Text>
      <Grid className='gap-4' numCols={5}>
        <Col numColSpan={5} numColSpanSm={3}>
          <Input
            id='storeDescription'
            label='Descripción (repuestos)'
            placeholder='Descripción de los repuestos'
            onChange={upperCaseHandleChange()}
            value={values.storeDescription ?? ''}
            error={errors.storeDescription}
            touched={touched.storeDescription}
            required
          />
        </Col>
        <Col numColSpan={5} numColSpanLg={2}>
          <Input
            id='storeUnit'
            label='Unidad (repuestos)'
            placeholder='0'
            onChange={handleChange}
            type='number'
            value={values.storeUnit ?? ''}
            error={errors.storeUnit}
            touched={touched.storeUnit}
            required
          />
        </Col>
      </Grid>

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
      <Input
        id='startDate'
        label='Fecha inicio'
        placeholder='Seleccione la fecha inicio'
        type='date'
        value={getDateValue(values.startDate)}
        disabled
      />
      <Input
        id='endDate'
        label='Fecha final'
        placeholder='Seleccione la fecha final'
        type='date'
        value={getDateValue(values.endDate)}
        disabled
      />
      <Input
        label='Hora inicio'
        type='time'
        value={values.startHour}
        disabled
      />
      <Input label='Hora fin' type='time' value={values.endHour} disabled />

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
