import { Button, Flex, Title } from '@tremor/react'
import useBeforeRenderPage from '../../hooks/useBeforeRenderPage'
import { useFailureReport } from '../../store/failureReport'
import { useEffect } from 'react'
import FailureReportContainer from './FailureReportContainer'

function useLoadFailureReport({ allFailureReports, message }) {
  const { component, title } = useBeforeRenderPage({
    message,
    title: 'Reportes de falla',
  })

  const [setLoading, setFailureReports, setShowModal] = useFailureReport(
    (state) => [state.setLoading, state.setFailureReports, state.setShowModal]
  )

  useEffect(() => {
    setLoading(true)
    if (allFailureReports != null) {
      setFailureReports(allFailureReports)
    }
    setLoading(false)
  }, [allFailureReports, setLoading, setFailureReports])

  const handleOpenModal = () => {
    setShowModal(true)
  }

  return {
    component,
    title,
    handleOpenModal,
  }
}

export default function FailureReports({ allFailureReports, message }) {
  const { component, title, handleOpenModal } = useLoadFailureReport({
    allFailureReports,
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
        <Title className='max-sm:w-full'>{title}</Title>
        <Button color='rose' onClick={handleOpenModal}>
          Crear reporte
        </Button>
      </Flex>
      <FailureReportContainer />
    </>
  )
}
