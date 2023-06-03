import Head from 'next/head'
import { createDocumentTitle } from '../../libs/documentTitle'
import { HTTP_METHODS } from '../../services'
import { MACHINE_URL_REGULAR } from '../../services/machineServices'
import { requestInternalApi } from '../../services/requestApi'
import HistoricalHeader from '../../components/historical/HistoricalHeader'
import useLoadHistorical from '../../hooks/useLoadHistorical'
import Historical from '../../components/historical/Historical'

export default function HistoricalPage({ machines, message }) {
  const { component, title } = useLoadHistorical({ machines, message })
  return (
    <>
      <Head>
        <title>{createDocumentTitle(title)}</title>
      </Head>
      {component ? (
        <>{component}</>
      ) : (
        <>
          <HistoricalHeader />
          <Historical />
        </>
      )}
    </>
  )
}

export async function getServerSideProps(context) {
  const { data: allMachines, message } = await requestInternalApi(context, {
    method: HTTP_METHODS.GET,
    url: MACHINE_URL_REGULAR,
  })

  return {
    props: {
      machines: message
        ? []
        : allMachines.reduce((acc, value) => {
            const { code, name } = value
            return { ...acc, [code]: name }
          }, {}),
      message,
    },
  }
}
