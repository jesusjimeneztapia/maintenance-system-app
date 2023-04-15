import MachineList from './MachineList'
import { useMachineList } from '../../context/providers/MachineListContext'
import { Bold, Card, Flex, Text } from '@tremor/react'
import SearchIcon from '../icons/SearchIcon'
import { TextInput } from 'flowbite-react'

export default function MachineContainer({ page }) {
  const { filterByName, filteredMachines, searchHandleChange } =
    useMachineList()

  return (
    <Card>
      <Flex className='gap-6' flexDirection='col' alignItems=''>
        <TextInput
          className='w-60'
          rightIcon={SearchIcon}
          placeholder='Buscar máquina por nombre'
          value={filterByName}
          onChange={searchHandleChange}
        />

        {filteredMachines.length > 0 ? (
          <MachineList machines={filteredMachines} page={page} />
        ) : (
          <Text className='text-center'>
            No existe la máquina <Bold>{filterByName}</Bold>
          </Text>
        )}
      </Flex>
    </Card>
  )
}
