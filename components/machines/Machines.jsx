import { useEffect } from 'react'
import useBeforeRenderPage from '../../hooks/useBeforeRenderPage'
import { useMachineList } from '../../store/machines'
import { Flex, Title } from '@tremor/react'
import AppLink from '../AppLink'
import Spinner from '../Spinner'
import MachineContainer from './MachineContainer'
import MachineListEmpty from './MachineListEmpty'

function useLoadMachines({ allMachines, message, page }) {
  const { component, title } = useBeforeRenderPage({
    message,
    title: page === 'machines' ? 'Máquinas' : 'Actividades',
  })

  const [machines, setMachines] = useMachineList((state) => [
    state.machines,
    state.setMachines,
  ])
  const [loading, setLoading] = useMachineList((state) => [
    state.loading,
    state.setLoading,
  ])
  const setPage = useMachineList((state) => state.setPage)

  useEffect(() => {
    setPage(page)
  }, [page, setPage])

  useEffect(() => {
    if (allMachines != null) {
      setMachines(allMachines)
    }
    setLoading(false)
  }, [allMachines, setLoading, setMachines])

  return { component, loading, machines, title }
}

export default function Machines({ allMachines, message, page = 'machines' }) {
  const { component, loading, machines, title } = useLoadMachines({
    allMachines,
    message,
    page,
  })

  if (component) {
    return (
      <>
        <Title className='mb-5'>{title}</Title>
        {component}
      </>
    )
  }

  return (
    <>
      <Flex className='gap-2 mb-5 max-sm:flex-col max-sm:items-end'>
        <Title className='max-sm:w-full'>{title}</Title>
        {machines.length > 0 && page === 'machines' && (
          <AppLink href='/machines/register' color='rose'>
            Registrar máquina
          </AppLink>
        )}
      </Flex>
      {loading ? (
        <section className='flex justify-center'>
          <Spinner />
        </section>
      ) : (
        <>{machines.length > 0 ? <MachineContainer /> : <MachineListEmpty />}</>
      )}
    </>
  )
}
