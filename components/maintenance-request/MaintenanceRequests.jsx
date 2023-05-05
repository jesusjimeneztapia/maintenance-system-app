import { useEffect } from 'react'
import { useMaintenanceRequest } from '../../store/maintenanceRequest'
import useBeforeRenderPage from '../../hooks/useBeforeRenderPage'
import { Button, Flex, Title } from '@tremor/react'
import MaintenanceRequestContainer from './MaintenanceRequestContainer'

function useLoadMaintenanceRequests({ allMaintenanceRequests, message }) {
  const { component, title } = useBeforeRenderPage({
    message,
    title: 'Solicitudes de mantenimiento',
  })

  const [setMaintenanceRequests, setLoading, setShowModal] =
    useMaintenanceRequest((state) => [
      state.setMaintenanceRequests,
      state.setLoading,
      state.setShowModal,
    ])

  useEffect(() => {
    if (allMaintenanceRequests != null) {
      setMaintenanceRequests(allMaintenanceRequests)
    }
    setLoading(false)
  }, [allMaintenanceRequests, setMaintenanceRequests, setLoading])

  const handleOpenModal = () => {
    setShowModal(true)
  }

  return {
    component,
    title,
    handleOpenModal,
  }
}

export default function MaintenanceRequests({
  allMaintenanceRequests,
  message,
}) {
  const { component, title, handleOpenModal } = useLoadMaintenanceRequests({
    allMaintenanceRequests,
    message,
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
        <Title className='max-sm:w-full'>Solicitudes de mantenimiento</Title>
        <Button color='rose' onClick={handleOpenModal}>
          Crear solicitud
        </Button>
      </Flex>
      <MaintenanceRequestContainer />
    </>
  )
}
