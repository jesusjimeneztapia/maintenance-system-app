import Head from 'next/head'
import { requestInternalApi } from '../../services/requestApi'
import { HTTP_METHODS } from '../../services'
import { MACHINE_URL_REGULAR } from '../../services/machineServices'
import Machines from '../../components/machines/Machines'

export default function MachinesPage({ allMachines, message }) {
  return (
    <>
      <Head>
        <title>Máquinas</title>
      </Head>
      <Machines allMachines={allMachines} message={message} />
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
