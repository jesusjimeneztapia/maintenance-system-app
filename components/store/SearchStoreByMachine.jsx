import { TextInput } from '@tremor/react'
import SearchIcon from '../icons/SearchIcon'
import { useStores } from '../../store/stores'

function useSearchStoreByMachine() {
  const [selectedMachine, setSelectedMachine] = useStores((state) => [
    state.selectedMachine,
    state.setSelectedMachine,
  ])

  const handleChange = ({ target: { value } }) => {
    setSelectedMachine(value.toUpperCase())
  }

  return { selectedMachine, handleChange }
}

export default function SearchStoreByMachine() {
  const { selectedMachine, handleChange } = useSearchStoreByMachine()

  return (
    <header>
      <TextInput
        className='w-fit ring-amber-500/50'
        icon={SearchIcon}
        placeholder='Buscar máquina por nombre'
        value={selectedMachine}
        onChange={handleChange}
      />
    </header>
  )
}
