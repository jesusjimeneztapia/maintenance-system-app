import { useForm } from '../../../context/providers/FormContext'
import { ACTIVITY_TYPE_VALUES_MAP } from '../../../schemas/activity'
import { AREA_VALUES_MAP } from '../../../schemas/machine'
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
  const { errors, initialValues, setValues, touched, values } = useForm()

  const machineCodeHandleChange = ({ target: { value } }) => {
    const selectedMachine = machines.find(({ code }) => code === value)
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
    const selectedEngine = values.engines.find(({ code }) => code === value)
    if (selectedEngine) {
      const { code: engineCode, function: engineFunction } = selectedEngine
      setValues((values) => ({ ...values, engineCode, engineFunction }))
    }
  }

  const activityCodeHandleChange = ({ target: { value } }) => {
    const selectedActivity = values.activities.find(
      ({ code }) => code === value
    )
    if (selectedActivity) {
      const { code, name, activityType } = selectedActivity
      setValues(({ activity, ...values }) => ({
        ...values,
        activity: { ...activity, code, name, activityType },
      }))
    }
  }

  const activityNameHandleChange = ({ target: { value } }) => {
    setValues(({ activity, ...values }) => ({
      ...values,
      activity: {
        ...activity,
        code: undefined,
        name: value.toUpperCase(),
        activityType: 'CORRECTIVE_MAINTENANCE',
      },
    }))
  }

  return (
    <>
      <Select
        id='machineCode'
        label='Código de máquina'
        value={values.machineCode}
        placeholder={
          machines.length > 0
            ? 'Elija una máquina'
            : 'No existen máquinas disponibles'
        }
        optionsMap={createMap(machines, 'code', 'code')}
        onChange={machineCodeHandleChange}
        error={touched.machineCode ? errors.machineCode : undefined}
        disabled={machines.length === 0}
      />
      <Input
        id='machineName'
        label='Nombre de máquina'
        placeholder='Primero elija una máquina'
        value={values.machineName}
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
        id='engineCode'
        label='Código de motor'
        value={values.engineCode}
        placeholder={
          values.engines.length > 0
            ? 'Elija un motor'
            : 'No existen motores disponibles'
        }
        optionsMap={createMap(values.engines, 'code', 'code')}
        onChange={engineCodeHandleChange}
        error={touched.engineCode ? errors.engineCode : undefined}
        disabled={values.engines.length === 0}
      />
      <Input
        id='engineFuntion'
        label='Función de motor'
        placeholder='Primero elija un motor'
        value={values.engineFunction}
        disabled
      />
      <Select
        id='activityCode'
        label='Código de actividad'
        value={values.activity.code ?? ''}
        placeholder={
          values.activities.length > 0
            ? 'Elija una actividad'
            : 'No existen actividades disponibles'
        }
        optionsMap={createMap(values.activities, 'code', 'code')}
        onChange={activityCodeHandleChange}
        disabled={values.activities.length === 0}
      />
      <Input
        id='activityTyope'
        label='Tipo de actividad'
        placeholder='Primero elija una actividad'
        value={
          ACTIVITY_TYPE_VALUES_MAP[values.activity.activityType] ??
          values.activity.activityType ??
          ''
        }
        disabled
      />
      <Input
        id='activityName'
        label='Nombre de actividad'
        placeholder='Elija una actividad o introduzca el nombre de actividad'
        value={values.activity.name ?? ''}
        onChange={activityNameHandleChange}
        error={touched.activity?.name ? errors.activity?.at(0) : undefined}
        disabled={machines.length === 0 || !values.engineCode}
      />
    </>
  )
}
