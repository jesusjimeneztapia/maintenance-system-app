import { Modal } from 'flowbite-react'
import { useMaintenanceRequest } from '../../store/maintenanceRequest'
import { Title } from '@tremor/react'
import MaintenanceRequestForm from './MaintenanceRequestForm'

export default function CreateMaintenanceRequestModal() {
  const [showModal, setShowModal] = useMaintenanceRequest((state) => [
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
      show={true}
      onClose={handleClose}
      position='top-center'
      size='3xl'
      dismissible
    >
      <Modal.Header>Nueva solicitud de mantenimiento</Modal.Header>
      <Modal.Body>
        <Title className='mb-5'>Crear solicitud</Title>
        <MaintenanceRequestForm />
      </Modal.Body>
    </Modal>
  )
}
