import Link from 'next/link'
import FilterDraftWorkOrderForm from './FilterDraftWorkOrderForm'
import { Flex, Title } from '@tremor/react'

export default function DraftWorkOrderHeader({ title }) {
  return (
    <Flex className='mb-5 gap-3' flexDirection='col' alignItems='end'>
      <Flex className='max-sm:flex-col max-sm:items-start max-sm:gap-3'>
        <Title>{title}</Title>
        <FilterDraftWorkOrderForm />
      </Flex>
      <Link href='/work-orders/create-work-order'>
        <a className='inline-flex items-center justify-center px-5 py-2 text-sm font-medium text-slate-500 rounded-lg bg-slate-100 hover:text-slate-900 hover:bg-slate-200'>
          <span className='w-full'>Crear órden de trabajo</span>
        </a>
      </Link>
    </Flex>
  )
}
