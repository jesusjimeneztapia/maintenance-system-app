import { Flex, Title } from '@tremor/react'
import Select from '../Select'
import { useHistorical } from '../../store/historical'

export default function HistoricalHeader() {
  const machines = useHistorical((state) => state.machines)
  const [selectedMachine, setSelectedMachine] = useHistorical((state) => [
    state.selectedMachine,
    state.setSelectedMachine,
  ])

  const handleChange = ({ target: { value } }) => {
    setSelectedMachine(value)
  }

  return (
    <Flex
      className='mb-5 gap-2 max-sm:flex-col max-sm:items-end'
      alignItems='center'
    >
      <Title className='w-full'>Históricos</Title>
      <form className='flex w-fit gap-2 justify-end'>
        <Select
          id='machine'
          name='machine'
          placeholder='Seleccione una máquina'
          optionsMap={machines}
          value={selectedMachine}
          onChange={handleChange}
        />
      </form>
    </Flex>
  )
}
