import Link from 'next/link'
import { Flex, Title } from '@tremor/react'
import FilterScheduleForm from './FilterScheduleForm'

export default function ScheduleHeader({
  title,
  defaultDate,
  handleChangeDate,
  handleSubmit,
  showDraft,
}) {
  return (
    <Flex className='mb-5 gap-3' flexDirection='col' alignItems='end'>
      <Flex className='max-sm:flex-col max-sm:items-start max-sm:gap-3'>
        <Title>{title}</Title>
        <FilterScheduleForm
          defaultDate={defaultDate}
          onChange={({ target: { value } }) => handleChangeDate(value)}
          onSubmit={handleSubmit}
        />
      </Flex>
      <Flex className='gap-3 flex-wrap' justifyContent='end'>
        <Link href='/work-orders/create-work-order'>
          <a className='inline-flex items-center justify-center px-5 py-2 text-sm font-medium text-slate-500 rounded-lg bg-slate-100 hover:text-slate-900 hover:bg-slate-200'>
            <span className='w-full'>Crear órden de trabajo</span>
          </a>
        </Link>
        {showDraft && (
          <Link href='/schedule/draft'>
            <a className='inline-flex items-center justify-center px-5 py-2 text-sm font-medium text-blue-500 rounded-lg bg-blue-100 hover:text-blue-900 hover:bg-blue-200'>
              <span className='w-full'>Ver borradores</span>
            </a>
          </Link>
        )}
      </Flex>
    </Flex>
  )
}
