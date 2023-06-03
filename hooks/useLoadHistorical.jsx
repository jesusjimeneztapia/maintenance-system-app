import { useEffect } from 'react'
import { useHistorical } from '../store/historical'
import useBeforeRenderPage from './useBeforeRenderPage'

export default function useLoadHistorical({ machines, message }) {
  const { component, title } = useBeforeRenderPage({
    message,
    title: 'Históricos',
  })
  const setMachines = useHistorical((state) => state.setMachines)

  useEffect(() => {
    setMachines(machines)
  }, [machines, setMachines])

  return { component, title }
}
