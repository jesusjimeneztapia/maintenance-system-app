import { useForm } from '../../../context/providers/FormContext'
import { AREA_VALUES_MAP } from '../../../schemas/machine'
import {
  WORK_ORDER_ACTIVITY_TYPE_VALUES_MAP,
  WORK_ORDER_PRIORITY_VALUES_MAP,
} from '../../../schemas/workOrder'
import Input from '../../Input'
import Select from '../../Select'

function createMap(array, key, value) {
  const map = {}
  array.forEach((obj) => {
    const mapKey = obj[key]
    const mapValue = obj[value]
    map[mapKey] = mapValue
  })
  return map
}

export default function CreateWorkOrderForm({ machines }) {
  const { errors, handleChange, initialValues, setValues, touched, values } =
    useForm()

  const machineCodeHandleChange = ({ target: { value } }) => {
    const selectedMachine = machines.find(({ name }) => name === value)
    if (selectedMachine) {
      const {
        code: machineCode,
        name: machineName,
        area: machineArea,
        engines,
        activities,
      } = selectedMachine
      setValues(() => ({
        ...initialValues,
        machineCode,
        machineName,
        machineArea,
        engines,
        activities,
      }))
    }
  }

  const engineCodeHandleChange = ({ target: { value } }) => {
    const selectedEngine = values.engines.find(
      ({ function: fn }) => fn === value
    )
    if (selectedEngine) {
      const { code: engineCode, function: engineFunction } = selectedEngine
      setValues((values) => ({ ...values, engineCode, engineFunction }))
    }
  }

  const activityCodeHandleChange = ({ target: { value } }) => {
    const selectedActivity = values.activities.find(
      ({ name }) => name === value
    )
    if (selectedActivity) {
      const { code: activityCode, name: activityName } = selectedActivity
      setValues(({ activity, ...values }) => ({
        ...values,
        activityCode,
        activityName,
      }))
    }
  }

  const activityNameHandleChange = ({ target: { value } }) => {
    const uppercase = value.toUpperCase()
    const selectedActivity = values.activities.find(
      ({ name }) => name === uppercase
    )
    setValues((values) => ({
      ...values,
      activityCode: selectedActivity ? selectedActivity.code : undefined,
      activityName: selectedActivity ? selectedActivity.name : uppercase,
    }))
  }

  return (
    <>
      <Select
        id='machineName'
        label='Máquina'
        value={values.machineName}
        placeholder={
          machines.length > 0
            ? 'Elija una máquina'
            : 'No existen máquinas disponibles'
        }
        optionsMap={createMap(machines, 'name', 'name')}
        onChange={machineCodeHandleChange}
        error={errors.machineName}
        touched={touched.machineName}
        disabled={machines.length === 0}
      />
      <Input
        id='machineCode'
        label='Código de máquina'
        placeholder='Primero elija una máquina'
        value={values.machineCode}
        disabled
      />
      <Input
        id='machineArea'
        label='Área de máquina'
        placeholder='Primero elija una máquina'
        value={AREA_VALUES_MAP[values.machineArea] ?? values.machineArea}
        disabled
      />
      <Select
        id='engineFunction'
        label='Motor'
        value={values.engineFunction}
        placeholder={
          values.engines.length > 0
            ? 'Elija un motor'
            : 'No existen motores disponibles'
        }
        optionsMap={createMap(values.engines, 'function', 'function')}
        onChange={engineCodeHandleChange}
        error={errors.engineFunction}
        touched={touched.engineFunction}
        disabled={values.engines.length === 0}
      />
      <Input
        id='engineCode'
        label='Código de motor'
        placeholder='Primero elija un motor'
        value={values.engineCode}
        disabled
      />
      <Select
        id='activityName'
        label='Actividad'
        value={
          values.activities
            .map(({ name }) => name)
            .includes(values.activityName)
            ? values.activityName
            : ''
        }
        placeholder={
          values.activities.length > 0
            ? 'Elija una actividad'
            : 'No existen actividades disponibles'
        }
        optionsMap={createMap(values.activities, 'name', 'name')}
        onChange={activityCodeHandleChange}
        disabled={values.activities.length === 0}
      />
      <Input
        id='activityCode'
        label='Código de actividad'
        placeholder='Primero elija una actividad'
        value={values.activityCode ?? ''}
        disabled
      />
      <Input
        id='activityName'
        label='Nombre de actividad'
        placeholder={
          values.machineCode === ''
            ? 'Primero elija una máquina'
            : 'Elija una actividad o introduzca el nombre de actividad'
        }
        value={values.activityName ?? ''}
        onChange={activityNameHandleChange}
        error={errors.activityName}
        touched={touched.activityName}
        disabled={values.machineCode === ''}
      />
      <Select
        id='activityType'
        label='Tipo de actividad'
        value={values.activityType}
        placeholder={
          values.machineCode === ''
            ? 'Primero elija una máquina'
            : 'Seleccione el tipo de actividad de la orden de trabajo'
        }
        optionsMap={WORK_ORDER_ACTIVITY_TYPE_VALUES_MAP}
        onChange={handleChange}
        error={errors.activityType}
        touched={touched.activityType}
        disabled={values.machineCode === ''}
      />
      <Select
        id='priority'
        label='Prioridad'
        value={values.priority}
        placeholder={
          values.machineCode === ''
            ? 'Primero elija una máquina'
            : 'Seleccione la prioridad de la orden de trabajo'
        }
        optionsMap={WORK_ORDER_PRIORITY_VALUES_MAP}
        onChange={handleChange}
        error={errors.priority}
        touched={touched.priority}
        disabled={values.machineCode === ''}
      />
    </>
  )
}
