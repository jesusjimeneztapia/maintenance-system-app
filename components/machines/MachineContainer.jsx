import MachineList from './MachineList'
import { Bold, Card, Flex, Text, TextInput } from '@tremor/react'
import SearchIcon from '../icons/SearchIcon'
import { useMachineList } from '../../store/machines'

export default function MachineContainer() {
  const [filterByName, machines, setFilterByName] = useMachineList((state) => [
    state.filterByName,
    state.machines,
    state.setFilterByName,
  ])

  const filteredMachines = machines.filter(({ name }) =>
    name.startsWith(filterByName)
  )

  const handleSearch = ({ target: { value } }) => {
    setFilterByName(value.toUpperCase())
  }

  return (
    <Card>
      <Flex className='gap-6' flexDirection='col' alignItems=''>
        <TextInput
          className='w-fit ring-amber-500/50'
          icon={SearchIcon}
          placeholder='Buscar máquina por nombre'
          value={filterByName}
          onChange={handleSearch}
        />

        {filteredMachines.length > 0 ? (
          <MachineList machines={filteredMachines} />
        ) : (
          <Text className='text-center'>
            No existe la máquina <Bold>{filterByName}</Bold>
          </Text>
        )}
      </Flex>
    </Card>
  )
}
