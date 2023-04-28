import { Card, List, ListItem, Subtitle } from '@tremor/react'
import { useIndicators } from '../../store/indicators'

export default function Compliance() {
  const { totalHours, groups } = useIndicators((state) => state.indicators)
  const workOrdersDone = groups
    ?.flatMap(({ workOrders }) => workOrders)
    .filter(({ state }) => state === 'DONE').length
  const workOrdersPlanned = groups?.flatMap(
    ({ workOrders }) => workOrders
  ).length

  return (
    <Card>
      <Subtitle className='text-slate-900 mb-3'>Cumplimiento</Subtitle>
      <List>
        <ListItem>
          <span>Indicador de mantenimiento</span>
          <span>{Math.round((workOrdersDone / workOrdersPlanned) * 100)}%</span>
        </ListItem>
        <ListItem>
          <span>Órdenes de trabajo ejecutadas</span>
          <span>{workOrdersDone}</span>
        </ListItem>
        <ListItem>
          <span>Órdenes de trabajo planificadas</span>
          <span>{workOrdersPlanned}</span>
        </ListItem>
        <ListItem>
          <span>Horas trabajadas</span>
          <span>{totalHours}</span>
        </ListItem>
      </List>
    </Card>
  )
}
