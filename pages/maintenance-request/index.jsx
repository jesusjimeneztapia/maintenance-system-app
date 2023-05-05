import Head from 'next/head'
import CreateMaintenanceRequestModal from '../../components/maintenance-request/CreateMaintenanceRequestModal'
import MaintenanceRequests from '../../components/maintenance-request/MaintenanceRequests'
import { HTTP_METHODS } from '../../services'
import { MAINTENANCE_REQUEST_URL_REGULAR } from '../../services/maintenanceRequestService'
import { requestInternalApi } from '../../services/requestApi'

export default function MaintenanceRequestPage({
  allMaintenanceRequests,
  message,
}) {
  return (
    <>
      <Head>
        <title>Solicitudes de mantenimiento | TECNOPOR S.A.</title>
      </Head>
      <MaintenanceRequests
        allMaintenanceRequests={allMaintenanceRequests}
        message={message}
      />
      <CreateMaintenanceRequestModal />
    </>
  )
}

export async function getServerSideProps(context) {
  const { data: allMaintenanceRequests, message } = await requestInternalApi(
    context,
    {
      method: HTTP_METHODS.GET,
      url: MAINTENANCE_REQUEST_URL_REGULAR,
    }
  )
  return { props: { allMaintenanceRequests, message } }
}
