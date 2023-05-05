import { Badge, Card, Flex, Subtitle } from '@tremor/react'
import { useMaintenanceRequest } from '../../store/maintenanceRequest'
import Spinner from '../Spinner'
import MaintenanceRequestTable from './MaintenanceRequestTable'

export default function MaintenanceRequestContainer() {
  const [loading, maintenanceRequests] = useMaintenanceRequest((state) => [
    state.loading,
    state.maintenanceRequests,
  ])

  return (
    <Card>
      {loading ? (
        <section className='flex justify-center'>
          <Spinner />
        </section>
      ) : (
        <>
          <Flex className='gap-2 mb-6' justifyContent='start'>
            <Subtitle>Solicitudes pendientes</Subtitle>
            <Badge color='gray'>{maintenanceRequests.length}</Badge>
          </Flex>
          <MaintenanceRequestTable />
        </>
      )}
    </Card>
  )
}
