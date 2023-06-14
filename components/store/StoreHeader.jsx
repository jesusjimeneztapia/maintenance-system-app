import { Flex, Title } from '@tremor/react'
import AppLink from '../AppLink'

export default function StoreHeader() {
  return (
    <Flex
      className='mb-5 gap-2 max-sm:flex-col max-sm:items-end'
      alignItems='center'
    >
      <Title className='w-full'>Repuestos</Title>
      <AppLink href='/stores/add-store'>Añadir repuesto</AppLink>
    </Flex>
  )
}
