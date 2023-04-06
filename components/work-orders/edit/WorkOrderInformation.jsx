import styles from '../../../styles/work-orders/WorkOrderInformation.module.css'
import { dateLocaleString } from '../../../libs/date'
import {
  WORK_ORDER_ACTIVITY_TYPE_VALUES_MAP,
  WORK_ORDER_PRIORITY_VALUES_MAP,
  WORK_ORDER_PROTECTION_EQUIPMENT_VALUES,
  WORK_ORDER_SECURITY_MEASURE_END_VALUES,
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
  securityMeasureEnds,
  observations,
  checkListVerified,
}) {
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
      {securityMeasureStarts?.length > 0 && (
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
      {protectionEquipments.length > 0 && (
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
      {securityMeasureEnds?.length > 0 && (
        <li>
          <span>Medidas de seguridad fin del trabajo</span>
          <ul>
            {securityMeasureEnds.map((security) => (
              <li
                style={{
                  marginLeft: '24px',
                }}
                key={security}
              >
                {WORK_ORDER_SECURITY_MEASURE_END_VALUES[security]}
              </li>
            ))}
          </ul>
        </li>
      )}
      {observations && (
        <li>
          <span>Observaciones: </span>
          {observations}
        </li>
      )}
      {checkListVerified?.length > 0 && (
        <li>
          <span>Check List</span>
          <ul>
            {checkListVerified.map(({ id, field, value }) => (
              <li
                style={{
                  marginLeft: '24px',
                }}
                key={id}
              >
                <span>{field}: </span>
                {value}
              </li>
            ))}
          </ul>
        </li>
      )}
      <li>
        <span>Creado: </span>
        {dateLocaleString(createdAt, true)}
      </li>
      <footer className={styles.footer}></footer>
    </ul>
  )
}
