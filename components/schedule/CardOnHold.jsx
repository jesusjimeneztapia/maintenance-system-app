import { Button, Card, Flex, Text } from '@tremor/react'
import { dateLocaleString } from '../../libs/date'
import { Priority } from '../work-orders/WorkOrderCard'

export default function CardOnHold({
  activityName,
  machine,
  priority,
  createdAt,
  reschedule,
}) {
  return (
    <Card className='max-w-xs'>
      <Flex
        className='gap-4 h-full'
        flexDirection='col'
        justifyContent='between'
      >
        <Flex>
          <Text className='text-slate-900 font-medium flex flex-col gap-1'>
            {activityName}
            <span className='text-slate-400 font-normal'>{machine?.name}</span>
          </Text>
        </Flex>
        <Flex className='gap-4' flexDirection='col' alignItems=''>
          <Flex className='gap-2' justifyContent='start'>
            <Priority priority={priority} />
            <Text>{dateLocaleString(createdAt, true)}</Text>
          </Flex>
          <Button color='amber' onClick={reschedule}>
            Reprogramar
          </Button>
        </Flex>
      </Flex>
    </Card>
  )
}
