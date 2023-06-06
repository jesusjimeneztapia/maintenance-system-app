import { useForm } from '../../context/providers/FormContext'
import Select from '../Select'
import Input from '../Input'
import EditStoreForm from './EditStoreForm'
import { useAddStore } from '../../store/addStore'
import { useState } from 'react'

export default function AddStoreForm() {
  const {
    errors,
    touched,
    values,
    handleChange,
    setValues,
    upperCaseHandleChange,
  } = useForm()
  const { machines = {}, units = {} } = useAddStore((state) => state.fields)
  const [selectedUnit, setSelectedUnit] = useState('')
  const [unitText, setUnitText] = useState()

  const handleUnitSelect = (e) => {
    handleChange(e)
    const {
      target: { value },
    } = e
    setSelectedUnit(value)
    setUnitText(units[value])
  }
  const handleUnitText = ({ target: { name, value } }) => {
    const uppercase = value.toUpperCase()
    setValues((values) => ({ ...values, [name]: uppercase }))
    setUnitText(uppercase)
    if (Object.keys(units).includes(uppercase)) {
      return setSelectedUnit(uppercase)
    }
    setSelectedUnit('')
  }

  return (
    <>
      <Select
        id='machineCode'
        label='Máquina'
        value={values.machineCode}
        placeholder={
          Object.keys(machines).length > 0
            ? 'Seleccione una máquina'
            : 'No existen máquinas disponibles'
        }
        optionsMap={machines}
        onChange={handleChange}
        error={errors.machineCode}
        touched={touched.machineCode}
        disabled={Object.keys(machines).length === 0}
      />
      <Input
        id='name'
        label='Nombre'
        placeholder='REPUESTO 1'
        value={values.name ?? ''}
        onChange={upperCaseHandleChange()}
        error={errors.name}
        touched={touched.name}
        disabled={values.machineCode == null}
      />
      <Select
        id='unit'
        label='Unidad'
        value={selectedUnit}
        placeholder={
          Object.keys(units).length > 0
            ? 'Seleccione una unidad'
            : 'No existen unidades disponibles'
        }
        optionsMap={units}
        onChange={handleUnitSelect}
        disabled={values.machineCode == null || Object.keys(units).length === 0}
      />
      <Input
        name='unit'
        placeholder='Escriba la unidad'
        value={unitText ?? ''}
        onChange={handleUnitText}
        error={errors.unit}
        touched={touched.unit}
        disabled={values.machineCode == null}
      />
      <EditStoreForm disabled={values.machineCode == null} />
    </>
  )
}
