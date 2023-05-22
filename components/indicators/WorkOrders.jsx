import {
  Card,
  Subtitle,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeaderCell,
  TableRow,
  Text,
} from '@tremor/react'
import { useIndicators } from '../../store/indicators'
import { WORK_ORDER_ACTIVITY_TYPE_VALUES_MAP } from '../../schemas/workOrder'

export default function WorkOrders() {
  const workOrders = useIndicators((state) => state.indicators.workOrders)
  const doneWorkOrders = workOrders.filter(({ done }) => done)
  const totalHours = doneWorkOrders.reduce((acc, value) => {
    const { totalHours } = value
    return acc + totalHours
  }, 0)

  const workOrderOrderByActivityType = doneWorkOrders.reduce((acc, value) => {
    const { activityType, totalHours } = value
    const { count, hours } = acc[activityType] || { count: 0, hours: 0 }
    if (totalHours != null) {
      acc[activityType] = { count: count + 1, hours: hours + totalHours }
    }
    return acc
  }, {})

  return (
    <Card>
      <Subtitle className='text-slate-900 mb-3'>Órdenes de trabajo</Subtitle>
      {doneWorkOrders.length > 0 ? (
        <Table>
          <TableHead>
            <TableRow>
              <TableHeaderCell className='pl-0 py-2'>Tipo</TableHeaderCell>
              <TableHeaderCell className='text-right py-2'>
                Horas de trabajo
              </TableHeaderCell>
              <TableHeaderCell className='text-right pr-0 py-2'>
                Número de órdenes
              </TableHeaderCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {Object.entries(workOrderOrderByActivityType).map(
              ([key, { hours, count }]) => (
                <TableRow key={key}>
                  <TableCell className='pl-0 py-2'>
                    {WORK_ORDER_ACTIVITY_TYPE_VALUES_MAP[key]}
                  </TableCell>
                  <TableCell className='text-right py-2'>{hours}</TableCell>
                  <TableCell className='text-right pr-0 py-2'>
                    {count}
                  </TableCell>
                </TableRow>
              )
            )}
            <TableRow>
              <TableCell className='font-medium pl-0 py-2'>Total</TableCell>
              <TableCell className='font-medium text-right py-2'>
                {totalHours}
              </TableCell>
              <TableCell className='font-medium text-right pr-0 py-2'>
                {doneWorkOrders.length}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      ) : (
        <Text className='text-center'>Aún no existen órdenes ejecutadas</Text>
      )}
    </Card>
  )
}
