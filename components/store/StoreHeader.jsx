import { Flex, Title } from '@tremor/react'
import Link from 'next/link'

export default function StoreHeader() {
  return (
    <Flex
      className='mb-5 gap-2 max-sm:flex-col max-sm:items-end'
      alignItems='center'
    >
      <Title className='w-full'>Repuestos</Title>
      <Link href='/stores/add-store'>
        <a
          className={`
              whitespace-nowrap rounded-md border shadow-sm font-medium px-4 py-2 text-sm bg-transparent
              focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-rose-300
              border-rose-500 text-red-500 hover:bg-rose-100
            `}
        >
          Añadir repuesto
        </a>
      </Link>
    </Flex>
  )
}
