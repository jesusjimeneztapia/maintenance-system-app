import { Badge, Card, Flex, Subtitle, Text } from '@tremor/react'
import CardOnHold from './CardOnHold'

export default function ScheduleOnHold({
  workOrdersOnHold,
  updateWorkOrder,
  strict,
}) {
  if (strict) {
    return null
  }

  return (
    <Card className='mt-6'>
      <Flex className='mb-6 gap-2' justifyContent='start' alignItems='center'>
        <Subtitle className='text-slate-900'>
          Órdenes de trabajo pendientes
        </Subtitle>
        <Badge className='w-10' color='slate'>
          {workOrdersOnHold.length}
        </Badge>
      </Flex>
      <Flex className='flex-wrap gap-4' justifyContent='center' alignItems=''>
        {workOrdersOnHold.length > 0 ? (
          workOrdersOnHold.map(
            ({ code, activityName, machine, priority, createdAt }) => (
              <CardOnHold
                key={code}
                activityName={activityName}
                machine={machine}
                priority={priority}
                createdAt={createdAt}
                reschedule={async () =>
                  updateWorkOrder({
                    id: code,
                    workOrderOnScheduleDto: { onSchedule: true },
                  })
                }
              />
            )
          )
        ) : (
          <Text>No existen órdenes de trabajo pendientes</Text>
        )}
      </Flex>
    </Card>
  )
}
