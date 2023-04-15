import { useEffect } from 'react'
import { useForm } from '../../../context/providers/FormContext'
import {
  WORK_ORDER_PROTECTION_EQUIPMENT_VALUES,
  WORK_ORDER_SECURITY_MEASURE_START_VALUES,
} from '../../../schemas/workOrder'
import CheckboxList from '../../CheckboxList'

export default function ValidatedToDoingForm() {
  const { handleChange, setValues, values } = useForm()

  useEffect(() => {
    setValues((values) => ({ ...values, state: 'DOING' }))
  }, [setValues])

  return (
    <>
      <CheckboxList
        id='securityMeasureStarts'
        label='Medidas de seguridad inicio del trabajo'
        values={values.securityMeasureStarts}
        optionsMap={WORK_ORDER_SECURITY_MEASURE_START_VALUES}
        onChange={handleChange}
      />
      <CheckboxList
        id='protectionEquipments'
        label='Riesgos de trabajo (Precausiones a tener en cuenta)'
        values={values.protectionEquipments}
        moreInfo={
          <ul className='list-none'>
            <li className='p-0 max-w-full block text-sm ml-5 relative before:content-["➢"] before:absolute before:-left-5'>
              Alto nivel de ruido. Aconsejable el uso de protectores acusticos
            </li>
            <li className='p-0 max-w-full block text-sm ml-5 relative before:content-["➢"] before:absolute before:-left-5'>
              Excesivo ruido. Absolutamente obligatorio el uso de protectores
              acusticos
            </li>
            <li className='p-0 max-w-full block text-sm ml-5 relative before:content-["➢"] before:absolute before:-left-5'>
              Golpes en la cabeza(Salientes a la altura de la cabeza).
              Obligatorio el uso de casco.
            </li>
            <li className='p-0 max-w-full block text-sm ml-5 relative before:content-["➢"] before:absolute before:-left-5'>
              Algunas zonas calientes. Tomar precauciones para no tocar zonas
              marcadas como calientes
            </li>
            <li className='p-0 max-w-full block text-sm ml-5 relative before:content-["➢"] before:absolute before:-left-5'>
              Partes moviles. Precaucion para no tocar partes en movimiento.
              Controlar buen estado de protecciones.
            </li>
            <li className='p-0 max-w-full block text-sm ml-5 relative before:content-["➢"] before:absolute before:-left-5'>
              Riesgos electricos. No tocar cables ni manipular los equipos bajo
              tension
            </li>
            <li className='p-0 max-w-full block text-sm ml-5 relative before:content-["➢"] before:absolute before:-left-5'>
              Productos quimicos abrasivos. Evitar contacto con la piel
            </li>
            <li className='p-0 max-w-full block text-sm ml-5 relative before:content-["➢"] before:absolute before:-left-5'>
              Trabajo en altura. Uso obligatorio del arnes de seguridad
            </li>
          </ul>
        }
        optionsMap={WORK_ORDER_PROTECTION_EQUIPMENT_VALUES}
        onChange={handleChange}
      />
    </>
  )
}
