import {
  CREATE_MAINTENANCE_REQUEST_INITIAL_VALUES,
  createMaintenanceRequestDto,
} from '../../schemas/maintenanceRequest'
import { MAINTENANCE_REQUEST_URL_INTERNAL } from '../../services/maintenanceRequestService'
import { useMaintenanceRequest } from '../../store/maintenanceRequest'
import Form from '../Form'
import CreateMaintenanceRequestForm from './CreateMaintenanceRequestForm'

export default function MaintenanceRequestForm() {
  const addMaintenanceRequest = useMaintenanceRequest(
    (state) => state.addMaintenanceRequest
  )

  const handleUpdate = (maintenanceRequest) => {
    addMaintenanceRequest(maintenanceRequest)
  }

  return (
    <Form
      dtoValidation={createMaintenanceRequestDto}
      initialValues={CREATE_MAINTENANCE_REQUEST_INITIAL_VALUES}
      onSubmit={{
        method: 'POST',
        url: MAINTENANCE_REQUEST_URL_INTERNAL,
        message: 'Crear',
        preSubmit: {
          title: 'Crear solicitud',
          question: '¿Seguro que quiere crear la solicitud?',
        },
        duringSubmit: {
          message: 'La solicitud de mantenimiento se está creando...',
        },
        successSubmit: {
          message: 'La solicitud de mantenimiento se creó exitósamente',
        },
        postSubmit: { update: handleUpdate },
        reset: true,
      }}
      full
    >
      <CreateMaintenanceRequestForm />
    </Form>
  )
}
