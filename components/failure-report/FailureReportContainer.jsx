import { Badge, Card, Flex, Subtitle } from '@tremor/react'
import { useFailureReport } from '../../store/failureReport'
import Spinner from '../Spinner'
import FailureReportTable from './FailureReportTable'

export default function FailureReportContainer() {
  const [loading, failureReports] = useFailureReport((state) => [
    state.loading,
    state.failureReports,
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
            <Subtitle>Fallas reportadas</Subtitle>
            <Badge color='gray'>{failureReports.length}</Badge>
          </Flex>
          <FailureReportTable />
        </>
      )}
    </Card>
  )
}
