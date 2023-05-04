import Head from 'next/head'
import { HTTP_METHODS } from '../../services'
import { requestInternalApi } from '../../services/requestApi'
import { MACHINE_URL_REGULAR } from '../../services/machineServices'
import Machines from '../../components/machines/Machines'

export default function ActivitiesPage({ allMachines, message }) {
  return (
    <>
      <Head>
        <title>Actividades</title>
      </Head>
      <Machines allMachines={allMachines} message={message} page='activities' />
    </>
  )
}

export async function getServerSideProps(context) {
  const { data: allMachines, message } = await requestInternalApi(context, {
    method: HTTP_METHODS.GET,
    url: MACHINE_URL_REGULAR,
  })

  return {
    props: { allMachines, message },
  }
}
