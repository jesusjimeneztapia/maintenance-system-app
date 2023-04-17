import WorkOrderCard from './WorkOrderCard'
import { Badge, Flex, Subtitle, Text } from '@tremor/react'
import DotsHorizontalIcon from '../icons/DotsHorizontalIcon'

export default function BoardColumn({ state, workOrders }) {
  return (
    <div className='w-80 p-2 bg-slate-200 border border-slate-300 rounded-lg shadow'>
      <Flex className='px-2 pb-3'>
        <Flex className='gap-2' justifyContent='start' alignItems='center'>
          <Subtitle className='text-slate-900 font-medium'>{state}</Subtitle>
          <Badge className='w-10' color='slate'>
            {workOrders.length}
          </Badge>
        </Flex>
        <button>
          <DotsHorizontalIcon className='w-5 h-5' />
        </button>
      </Flex>

      <Flex
        className='max-h-[calc(100vh-14.25rem)] max-sm:max-h-[calc(100vh-14.875rem)] gap-2 overflow-y-auto'
        flexDirection='col'
      >
        {workOrders.length === 0 ? (
          <Text className='text-center px-2'>
            No existen órdenes de trabajo en esta columna
          </Text>
        ) : (
          <>
            {workOrders.map(
              ({
                code,
                activityName,
                priority,
                createdAt,
                machine: { name: machineName },
              }) => (
                <WorkOrderCard
                  key={code}
                  code={code}
                  activityName={activityName}
                  priority={priority}
                  createdAt={createdAt}
                  machineName={machineName}
                />
              )
            )}
          </>
        )}
      </Flex>
    </div>
  )
}
