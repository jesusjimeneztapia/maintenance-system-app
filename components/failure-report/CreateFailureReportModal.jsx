import { Modal } from 'flowbite-react'
import { useFailureReport } from '../../store/failureReport'
import { Title } from '@tremor/react'
import FailureReportForm from './FailureReportForm'

export default function CreateFailureReportModal() {
  const [showModal, setShowModal] = useFailureReport((state) => [
    state.showModal,
    state.setShowModal,
  ])

  if (!showModal) {
    return <></>
  }

  const handleClose = () => {
    setShowModal(false)
  }

  return (
    <Modal
      className='h-screen'
      show={true}
      onClose={handleClose}
      position='top-center'
      size='3xl'
      dismissible
    >
      <Modal.Header>Nuevo reporte de falla</Modal.Header>
      <Modal.Body className='max-sm:px-4 max-sm:pt-2'>
        <Title className='mb-5'>Crear reporte</Title>
        <div className='p-1 gap-4 max-h-[calc(100vh-13rem)] max-sm:max-h-[calc(100vh-12rem)] overflow-y-auto'>
          <FailureReportForm />
        </div>
      </Modal.Body>
    </Modal>
  )
}
