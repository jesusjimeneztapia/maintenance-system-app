// import { useToast } from '../../../context/providers/ToastContext'
import styles from '../../../styles/work-orders/WorkOrderInformation.module.css'
// import Button from '../../Button'
// import axios from 'redaxios'
// import { HTTP_METHODS } from '../../../services'
// import { updateWorkOrderUrlInternal } from '../../../services/workOrderService'
// import { useWorkOrderList } from '../../../context/providers/WorkOrderListContext'
import { dateLocaleString } from '../../../libs/date'
import {
  WORK_ORDER_ACTIVITY_TYPE_VALUES_MAP,
  WORK_ORDER_PRIORITY_VALUES_MAP,
  WORK_ORDER_PROTECTION_EQUIPMENT_VALUES,
  WORK_ORDER_SECURITY_MEASURE_START_VALUES,
  WORK_ORDER_STATE_VALUES_MAP,
} from '../../../schemas/workOrder'

export default function WorkOrderInformation({
  code,
  engineCode,
  activityCode,
  failureCause,
  startDate,
  endDate,
  state,
  nextState,
  previousState,
  createdAt,
  updatedAt,
  activityName,
  activityType,
  engineFunction,
  machineCode,
  machineName,
  machineArea,
  priority,
  securityMeasureStarts,
  protectionEquipments,
  activityDescription,
  storeDescription,
  storeUnit,
  totalHours,
}) {
  // const { updateWorkOrder } = useWorkOrderList()
  // const { request, showToast } = useToast()

  // const changeState =
  //   (moveTo = 'next') =>
  //   async () => {
  //     showToast({
  //       autoClose: false,
  //       close: true,
  //       color: 'secondary',
  //       position: 'center',
  //       children: 'Pasando al siguiente estado...',
  //     })
  //     const response = await request(
  //       async () => {
  //         const { data } = await axios({
  //           method: HTTP_METHODS.PATCH,
  //           url: updateWorkOrderUrlInternal(code),
  //           data: { state: moveTo === 'next' ? nextState : previousState },
  //         })
  //         return data
  //       },
  //       {
  //         autoClose: true,
  //         close: true,
  //         color: 'success',
  //         children: `Se pasó al ${
  //           moveTo === 'next' ? 'siguiente' : 'anterior'
  //         } estado exitósamente`,
  //       }
  //     )

  //     if (response) {
  //       updateWorkOrder(response)
  //     }
  //   }
  return (
    <ul className={styles.information}>
      <li>
        <span>Código de máquina: </span>
        {machineCode}
      </li>
      <li>
        <span>Nombre de máquina: </span>
        {machineName}
      </li>
      <li>
        <span>Área de máquina: </span>
        {machineArea}
      </li>
      {engineCode && (
        <li>
          <span>Código de motor: </span>
          {engineCode}
        </li>
      )}
      {engineFunction && (
        <li>
          <span>Función de motor: </span>
          {engineFunction}
        </li>
      )}
      {activityCode && (
        <li>
          <span>Código de actividad: </span>
          {activityCode}
        </li>
      )}
      <li>
        <span>Tipo de actividad: </span>
        {WORK_ORDER_ACTIVITY_TYPE_VALUES_MAP[activityType]}
      </li>
      <li>
        <span>Nombre de actividad: </span>
        {activityName}
      </li>
      <li>
        <span>Estado: </span>
        {WORK_ORDER_STATE_VALUES_MAP[state]}
      </li>
      <li>
        <span>Prioridad: </span>
        {WORK_ORDER_PRIORITY_VALUES_MAP[priority]}
      </li>
      {securityMeasureStarts && (
        <li>
          <span>Medidas de seguridad inicio del trabajo</span>
          <ul>
            {securityMeasureStarts.map((security) => (
              <li
                style={{
                  marginLeft: '24px',
                }}
                key={security}
              >
                {WORK_ORDER_SECURITY_MEASURE_START_VALUES[security]}
              </li>
            ))}
          </ul>
        </li>
      )}
      {protectionEquipments && (
        <li>
          <span>Riesgos de trabajo (Precauciones a tener en cuenta)</span>
          <ul>
            {protectionEquipments.map((protection) => (
              <li
                style={{
                  marginLeft: '24px',
                }}
                key={protection}
              >
                {WORK_ORDER_PROTECTION_EQUIPMENT_VALUES[protection]}
              </li>
            ))}
          </ul>
        </li>
      )}
      {activityDescription && (
        <li>
          <span>Descripción de la actividad: </span>
          {activityDescription}
        </li>
      )}
      {storeDescription && (
        <li>
          <span>Descripción de repuestos: </span>
          {storeDescription}
        </li>
      )}
      {storeUnit && (
        <li>
          <span>Unidad de repuestos: </span>
          {storeUnit}
        </li>
      )}
      {failureCause && (
        <li>
          <span>Causa de falla: </span>
          {failureCause}
        </li>
      )}
      {startDate && (
        <>
          <li>
            <span>Fecha inicio: </span>
            {dateLocaleString(startDate, true)}
          </li>
          <li>
            <span>Hora inicio: </span>
            {new Date(startDate).toLocaleTimeString('es-ES', {
              hour: '2-digit',
              minute: '2-digit',
              second: '2-digit',
              hour12: true,
            })}
          </li>
        </>
      )}
      {endDate && (
        <>
          <li>
            <span>Fecha fin: </span>
            {dateLocaleString(endDate, true)}
          </li>
          <li>
            <span>Hora fin: </span>
            {new Date(endDate).toLocaleTimeString('es-ES', {
              hour: '2-digit',
              minute: '2-digit',
              second: '2-digit',
              hour12: true,
            })}
          </li>
        </>
      )}
      {totalHours && (
        <li>
          <span>Total horas: </span>
          {totalHours} hrs
        </li>
      )}
      <li>
        <span>Creado: </span>
        {dateLocaleString(createdAt, true)}
      </li>
      <footer className={styles.footer}>
        {/* {previousState && (
          <Button variant='secondary' onClick={changeState('previous')}>
            <p style={{ textAlign: 'center', width: '100%' }}>
              Anterior estado
            </p>
          </Button>
        )} */}
        {/* {nextState && (
          <Button onClick={changeState()}>
            <p style={{ textAlign: 'center', width: '100%' }}>
              Siguiente estado
            </p>
          </Button>
        )} */}
      </footer>
    </ul>
  )
}
