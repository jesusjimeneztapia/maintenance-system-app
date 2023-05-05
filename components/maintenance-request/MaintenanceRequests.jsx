import { useEffect } from 'react'
import { useMaintenanceRequest } from '../../store/maintenanceRequest'
import useBeforeRenderPage from '../../hooks/useBeforeRenderPage'
import { Button, Flex, Title } from '@tremor/react'
import MaintenanceRequestContainer from './MaintenanceRequestContainer'
import Head from 'next/head'

function useLoadMaintenanceRequests({ allMaintenanceRequests, message }) {
  const { component, title } = useBeforeRenderPage({
    message,
    title: 'Solicitudes de mantenimiento',
  })

  const [setMaintenanceRequests, setLoading] = useMaintenanceRequest(
    (state) => [state.setMaintenanceRequests, state.setLoading]
  )

  useEffect(() => {
    if (allMaintenanceRequests != null) {
      setMaintenanceRequests(allMaintenanceRequests)
    }
    setLoading(false)
  }, [allMaintenanceRequests, setMaintenanceRequests, setLoading])

  return {
    component,
    title,
  }
}

export default function MaintenanceRequests({
  allMaintenanceRequests,
  message,
}) {
  const { component, title } = useLoadMaintenanceRequests({
    allMaintenanceRequests,
    message,
  })

  if (component) {
    return (
      <>
        <Head>
          <title>{title} | TECNOPOR S.A.</title>
        </Head>
        <Title className='mb-5'>{title}</Title>
        {component}
      </>
    )
  }

  return (
    <>
      <Head>
        <title>{title} | TECNOPOR S.A.</title>
      </Head>
      <Flex className='gap-2 mb-5 max-sm:flex-col max-sm:items-end'>
        <Title className='max-sm:w-full'>Solicitudes de mantenimiento</Title>
        <Button color='rose'>Crear solicitud</Button>
      </Flex>
      <MaintenanceRequestContainer />
    </>
  )
}
