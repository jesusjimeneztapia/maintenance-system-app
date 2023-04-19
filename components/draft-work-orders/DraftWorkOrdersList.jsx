import { Badge, Card, Flex, Subtitle, Text } from '@tremor/react'
import { useSchedule } from '../../context/providers/ScheduleContext'
import DraftWorkOrderCard from './DraftWorkOrderCard'

function getWeekNumber(date) {
  const [year, month, day] = date.split('-')
  date = new Date(year, month - 1, day)
  const firstDay = new Date(date.getFullYear(), 0, 1)
  const weeks = Math.ceil(
    ((date.getTime() - firstDay.getTime()) / 86400000 + firstDay.getDay() + 1) /
      7
  )
  return weeks > 52 ? 1 : weeks
}

export default function DraftWorkOrdersList() {
  const { date, draftWorkOrders, deleteDraftWorkOrderByCode } = useSchedule()
  const handleDeleteDraftWorkOrder = (draftWorkOrderCode) => () => {
    deleteDraftWorkOrderByCode(draftWorkOrderCode)
  }

  return (
    <Card>
      <Flex className='mb-6 gap-2' justifyContent='start' alignItems='center'>
        <Subtitle>Semana {getWeekNumber(date)}</Subtitle>
        <Badge className='w-10' color='slate'>
          {draftWorkOrders.length}
        </Badge>
      </Flex>
      <Flex className='flex-wrap gap-5' justifyContent='center'>
        {draftWorkOrders.length < 1 ? (
          <Text className='text-center w-full'>
            No existen órdenes de trabajo en borrador.
          </Text>
        ) : (
          draftWorkOrders.map(({ code, ...rest }) => (
            <DraftWorkOrderCard
              key={code}
              handleDelete={handleDeleteDraftWorkOrder(code)}
              code={code}
              {...rest}
            />
          ))
        )}
      </Flex>
    </Card>
  )
}
