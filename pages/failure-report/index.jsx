import Head from 'next/head'
import FailureReports from '../../components/failure-report/FailureReports'
import { requestInternalApi } from '../../services/requestApi'
import { HTTP_METHODS } from '../../services'
import { FAILURE_REQUEST_URL_REGULAR } from '../../services/failureReportServices'
import CreateFailureReportModal from '../../components/failure-report/CreateFailureReportModal'

export default function FailureReportPage({ allFailureReports, message }) {
  return (
    <>
      <Head>
        <title>Reportes de falla | TECNOPOR S.A.</title>
      </Head>
      <FailureReports allFailureReports={allFailureReports} message={message} />
      <CreateFailureReportModal />
    </>
  )
}

export async function getServerSideProps(context) {
  const { data: allFailureReports, message } = await requestInternalApi(
    context,
    { method: HTTP_METHODS.GET, url: FAILURE_REQUEST_URL_REGULAR }
  )
  return { props: { allFailureReports, message } }
}
