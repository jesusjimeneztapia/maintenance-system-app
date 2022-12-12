import { useToast } from '../../../context/providers/ToastContext'
import { ACTIVITY_TYPE_VALUES_MAP } from '../../../schemas/activity'
import { WORK_ORDER_STATE_VALUES_MAP } from '../../../schemas/workOrder'
import styles from '../../../styles/work-orders/WorkOrderInformation.module.css'
import Button from '../../Button'
import axios from 'redaxios'
import { HTTP_METHODS } from '../../../services'
import { updateWorkOrderUrlInternal } from '../../../services/workOrderService'
import { useWorkOrderList } from '../../../context/providers/WorkOrderListContext'
import { dateLocaleString } from '../../../libs/date'

export default function WorkOrderInformation({
  id,
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
  activity: { name: activityName, activityType },
  engine: { function: engineFunction },
  machine: { code: machineCode, area: machineArea, name: machineName },
}) {
  const { updateWorkOrder } = useWorkOrderList()
  const { request, showToast } = useToast()

  const changeState =
    (moveTo = 'next') =>
    async () => {
      showToast({
        autoClose: false,
        close: true,
        color: 'secondary',
        position: 'center',
        children: 'Pasando al siguiente estado...',
      })
      const response = await request(
        async () => {
          const { data } = await axios({
            method: HTTP_METHODS.PATCH,
            url: updateWorkOrderUrlInternal(id),
            data: { state: moveTo === 'next' ? nextState : previousState },
          })
          return data
        },
        {
          autoClose: true,
          close: true,
          color: 'success',
          children: `Se pasó al ${
            moveTo === 'next' ? 'siguiente' : 'anterior'
          } estado exitósamente`,
        }
      )

      if (response) {
        updateWorkOrder(response)
      }
    }
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
      <li>
        <span>Código de motor: </span>
        {engineCode}
      </li>
      <li>
        <span>Función de motor: </span>
        {engineFunction}
      </li>
      <li>
        <span>Código de actividad: </span>
        {activityCode}
      </li>
      <li>
        <span>Tipo de actividad: </span>
        {ACTIVITY_TYPE_VALUES_MAP[activityType]}
      </li>
      <li>
        <span>Nombre de actividad: </span>
        {activityName}
      </li>
      <li>
        <span>Estado: </span>
        {WORK_ORDER_STATE_VALUES_MAP[state]}
      </li>
      {startDate && (
        <li>
          <span>Fecha inicio: </span>
          {dateLocaleString(startDate, true)}
        </li>
      )}
      {endDate && (
        <li>
          <span>Fecha fin: </span>
          {dateLocaleString(endDate, true)}
        </li>
      )}
      {failureCause && (
        <li>
          <span>Causa de falla: </span>
          {failureCause}
        </li>
      )}
      <li>
        <span>Creado: </span>
        {dateLocaleString(createdAt, true)}
      </li>
      <footer className={styles.footer}>
        {previousState && (
          <Button variant='secondary' onClick={changeState('previous')}>
            <p style={{ textAlign: 'center', width: '100%' }}>
              Anterior estado
            </p>
          </Button>
        )}
        {nextState && (
          <Button onClick={changeState()}>
            <p style={{ textAlign: 'center', width: '100%' }}>
              Siguiente estado
            </p>
          </Button>
        )}
      </footer>
    </ul>
  )
}
