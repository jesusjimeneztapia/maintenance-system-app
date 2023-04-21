import { Badge, Card, Flex, Subtitle, Text } from '@tremor/react'
import ScheduleTable from './ScheduleTable'

export default function OnSchedule({
  workOrdersOnSchedule,
  firstWeekDay,
  deleteWorkOrderById,
  updateWorkOrder,
  weeks,
  strict,
}) {
  return (
    <Card>
      <Flex className='mb-6 gap-2' justifyContent='start' alignItems='center'>
        <Subtitle className='text-slate-900'>Semana {weeks}</Subtitle>
        <Badge className='w-10' color='slate'>
          {workOrdersOnSchedule.length}
        </Badge>
      </Flex>
      {workOrdersOnSchedule.length ? (
        <ScheduleTable
          deleteWorkOrderById={deleteWorkOrderById}
          firstWeekDay={firstWeekDay}
          updateWorkOrder={updateWorkOrder}
          workOrdersOnSchedule={workOrdersOnSchedule}
          strict={strict}
        />
      ) : (
        <Text className='text-center'>
          No existen órdenes de trabajo en la planificación
        </Text>
      )}
    </Card>
  )
}
