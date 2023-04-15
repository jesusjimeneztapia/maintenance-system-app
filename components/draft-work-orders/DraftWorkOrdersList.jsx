import { Badge, Card, Flex, Subtitle, Text } from '@tremor/react'
import { useSchedule } from '../../context/providers/ScheduleContext'
import DraftWorkOrderCard from './DraftWorkOrderCard'

function getWeekNumber({ year, month, day }) {
  const date = new Date(year, month, day)
  const dayNumber = (date.getDay() + 6) % 7

  const aux = new Date(date.valueOf())
  aux.setDate(aux.getDate() - dayNumber + 3)
  const firstTuesday = aux.valueOf()

  aux.setMonth(0, 1)

  if (aux.getDay() !== 4) {
    aux.setMonth(0, 1 + ((4 - aux.getDay() + 7) % 7))
  }

  return 1 + Math.ceil((firstTuesday - aux) / 604800000)
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
