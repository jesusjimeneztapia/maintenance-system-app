import { dateLocaleString } from '../../libs/date'
import { Button, Flex, Text } from '@tremor/react'
import { Badge } from 'flowbite-react'
import ArrowUpIcon from '../icons/ArrowUpIcon'
import ArrowRightIcon from '../icons/ArrowRightIcon'
import ArrowDownIcon from '../icons/ArrowDownIcon'
import InfoIcon from '../icons/InfoIcon'

const PRIORITY = {
  URGENT: ({ className }) => (
    <Badge className={className} color='failure' icon={ArrowUpIcon}>
      Urgente
    </Badge>
  ),
  IMPORTANT: ({ className }) => (
    <Badge className={className} color='warning' icon={ArrowRightIcon}>
      Importante
    </Badge>
  ),
  NORMAL: ({ className }) => (
    <Badge className={className} color='success' icon={ArrowDownIcon}>
      Normal
    </Badge>
  ),
}

export function Priority({ priority, className }) {
  return <>{PRIORITY[priority]({ className })}</>
}

export default function WorkOrderCard({
  activity,
  priority,
  createdAt,
  editHandleChange,
  machineName,
}) {
  return (
    <>
      <article className='flex flex-col gap-4 w-full p-2 bg-white rounded shadow'>
        <Flex className='gap-2' alignItems='start'>
          <Text className='text-slate-900 font-medium flex flex-col gap-1'>
            {activity.name}
            <span className='text-slate-400 font-normal'>{machineName}</span>
          </Text>
          <Button
            icon={() => <InfoIcon className='w-5 h-5' />}
            variant='light'
            onClick={editHandleChange}
          />
        </Flex>
        <Flex className='gap-2' justifyContent='start'>
          <Priority priority={priority} />
          <Text>{dateLocaleString(createdAt)}</Text>
        </Flex>
      </article>
    </>
  )
}
