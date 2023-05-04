import { Flex, Subtitle, Text } from '@tremor/react'
import OneServerSolidIcon from '../icons/OneServerSolidIcon'
import AppLink from '../AppLink'

export default function MachineListEmpty() {
  return (
    <Flex className='gap-3' flexDirection='col'>
      <OneServerSolidIcon className='w-32 text-slate-500/30' />
      <Subtitle>No existen máquinas registradas</Subtitle>
      <Text>Registra tu primera máquina</Text>
      <AppLink href='/machines/register' color='rose'>
        Registrar máquina
      </AppLink>
    </Flex>
  )
}
