import { Card, List, ListItem, Subtitle } from '@tremor/react'
import { useIndicators } from '../../store/indicators'

export default function Compliance() {
  const workOrders = useIndicators((state) => state.indicators.workOrders)
  const doneWorkOrders = workOrders.filter(({ done }) => done)
  const totalHours = doneWorkOrders.reduce((acc, value) => {
    const { totalHours } = value
    return acc + totalHours
  }, 0)

  return (
    <Card>
      <Subtitle className='text-slate-900 mb-3'>Cumplimiento</Subtitle>
      <List>
        <ListItem>
          <span>Indicador de mantenimiento</span>
          <span>
            {Math.round((doneWorkOrders.length / workOrders.length) * 100)}%
          </span>
        </ListItem>
        <ListItem>
          <span>Órdenes de trabajo ejecutadas</span>
          <span>{doneWorkOrders.length}</span>
        </ListItem>
        <ListItem>
          <span>Órdenes de trabajo planificadas</span>
          <span>{workOrders.length}</span>
        </ListItem>
        <ListItem>
          <span>Horas trabajadas</span>
          <span>{totalHours}</span>
        </ListItem>
      </List>
    </Card>
  )
}
