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
          <ul
            style={{
              marginLeft: '1.25rem',
              padding: '0 0.875rem',
              display: 'flex',
              flexDirection: 'column',
              gap: '0.375rem',
            }}
          >
            <li>
              Alto nivel de ruido. Aconsejable el uso de protectores acusticos
            </li>
            <li>
              Excesivo ruido. Absolutamente obligatorio el uso de protectores
              acusticos
            </li>
            <li>
              Golpes en la cabeza(Salientes a la altura de la cabeza).
              Obligatorio el uso de casco.
            </li>
            <li>
              Algunas zonas calientes. Tomar precauciones para no tocar zonas
              marcadas como calientes
            </li>
            <li>
              Partes moviles. Precaucion para no tocar partes en movimiento.
              Controlar buen estado de protecciones.
            </li>
            <li>
              Riesgos electricos. No tocar cables ni manipular los equipos bajo
              tension
            </li>
            <li>Productos quimicos abrasivos. Evitar contacto con la piel</li>
            <li>Trabajo en altura. Uso obligatorio del arnes de seguridad</li>
          </ul>
        }
        optionsMap={WORK_ORDER_PROTECTION_EQUIPMENT_VALUES}
        onChange={handleChange}
      />
    </>
  )
}
