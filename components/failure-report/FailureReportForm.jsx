import {
  CREATE_FAILURE_REPORT_INITIAL_VALUES,
  createFailureReportDto,
} from '../../schemas/failureReport'
import { FAILURE_REQUEST_URL_INTERNAL } from '../../services/failureReportServices'
import { useFailureReport } from '../../store/failureReport'
import Form from '../Form'
import CreateFailureReportForm from './CreateFailureReportForm'

function mutateValues(values) {
  const { image, ...body } = values
  const formData = new FormData()
  Object.entries(body).forEach(([key, value]) => {
    formData.set(key, value)
  })
  if (image?.size != null) {
    formData.set('image', image)
  }
  return formData
}

export default function FailureReportForm() {
  const addFailureReport = useFailureReport((state) => state.addFailureReport)

  const handleUpdate = (failureReport) => {
    addFailureReport(failureReport)
  }

  return (
    <Form
      dtoValidation={createFailureReportDto}
      initialValues={CREATE_FAILURE_REPORT_INITIAL_VALUES}
      onSubmit={{
        method: 'POST',
        url: FAILURE_REQUEST_URL_INTERNAL,
        message: 'Crear',
        preSubmit: {
          title: 'Crear reporte',
          question: '¿Seguro que quiere crear el reporte?',
          mutateValues,
        },
        duringSubmit: {
          message: 'El reporte de falla se está creando...',
        },
        successSubmit: {
          message: 'El reporte de falla se creó exitósamente',
        },
        postSubmit: { update: handleUpdate },
        reset: true,
      }}
      full
    >
      <CreateFailureReportForm />
    </Form>
  )
}
