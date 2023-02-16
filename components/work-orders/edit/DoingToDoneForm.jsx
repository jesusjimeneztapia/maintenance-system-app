import { useEffect } from 'react'
import { useForm } from '../../../context/providers/FormContext'
import { getDateValue } from '../../../libs/date'
import { WORK_ORDER_SECURITY_MEASURE_END_VALUES } from '../../../schemas/workOrder'
import CheckboxList from '../../CheckboxList'
import Input from '../../Input'
import Textarea from '../../Textarea'

// function getMinDate(isoString) {
//   const date = isoString ? new Date(isoString) : new Date()
//   return date
//     .toLocaleString('af-ZA', {
//       year: 'numeric',
//       month: '2-digit',
//       day: '2-digit',
//     })
//     .replace(/\//g, '-')
// }

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

  return (
    <>
      <Textarea
        id='activityDescription'
        label='Descripción de la actividad'
        placeholder='Descripción de la actividad...'
        onChange={upperCaseHandleChange()}
        value={values.activityDescription ?? ''}
        error={
          touched.activityDescription ? errors.activityDescription : undefined
        }
        required
      />
      <label style={{ fontSize: '14px', fontWeight: '500' }}>Repuestos</label>
      <div
        style={{
          display: 'grid',
          gap: '1.25rem',
          gridTemplateColumns: '6fr 1fr',
        }}
      >
        <Input
          id='storeDescription'
          label='Descripción'
          placeholder='Descripción de los repuestos'
          onChange={upperCaseHandleChange()}
          value={values.storeDescription ?? ''}
          error={touched.storeDescription ? errors.storeDescription : undefined}
          required
        />
        <Input
          id='storeUnit'
          label='Unidad'
          placeholder='Unidad de los repuestos'
          onChange={handleChange}
          type='number'
          value={values.storeUnit ?? ''}
          error={touched.storeUnit ? errors.storeUnit : undefined}
          required
        />
      </div>
      {values.activityType === 'CORRECTIVE' && (
        <Textarea
          id='failureCause'
          label='Causa de falla'
          placeholder='Causa de falla...'
          onChange={upperCaseHandleChange()}
          value={values.failureCause}
          error={touched.failureCause ? errors.failureCause : undefined}
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

      {/* <Input
        id='startHour'
        label='Hora inicio'
        placeholder='Seleccione la hora de inicio'
        type='time'
        min={values.startHour ?? ''}
        onChange={handleChange}
        error={touched.startHour ? errors.startHour : undefined}
        // required
      />
      <Input
        id='endHour'
        label='Hora final'
        placeholder='Seleccione la hora de finalización'
        type='time'
        min={values.endHour ?? ''}
        onChange={handleChange}
        error={touched.endHour ? errors.endHour : undefined}
        // required
      /> */}
      <Input
        id='totalHours'
        label='Horas totales'
        placeholder='Indique las horas totales'
        type='number'
        onChange={handleChange}
        value={values.totalHours ?? ''}
        error={touched.totalHours ? errors.totalHours : undefined}
      />
      <CheckboxList
        id='securityMeasureEnds'
        label='Medidas de seguridad fin del trabajo'
        values={values.securityMeasureEnds}
        optionsMap={WORK_ORDER_SECURITY_MEASURE_END_VALUES}
        onChange={handleChange}
      />
    </>
  )
}
