import { useRouter } from 'next/router'
import CreateActivityForm from '../../../components/activities/machine/create-activity/CreateActivityForm'
import Form from '../../../components/Form'
import Page from '../../../components/page'
import {
  activityInitialValues,
  createActivityDto,
} from '../../../schemas/activity'

function createStartCode(machineCode) {
  return machineCode.split('-')[2]
}

export default function CreateActivity() {
  const {
    query: { machineCode },
  } = useRouter()

  return (
    <Page title={`Crear actividad ~ Máquina ${machineCode} | TECNOPOR S.A.`}>
      <Form
        title={`Crear actividad para la máquina ${machineCode}`}
        dtoValidation={createActivityDto}
        initialValues={{
          ...activityInitialValues,
          code: createStartCode(machineCode),
          machineCode,
        }}
        onSubmit={{
          method: 'POST',
          url: `/api/activities/create`,
          message: 'Crear',
          preSubmit: {
            title: `Crear actividad para la máquina ${machineCode}`,
            question: `¿Seguro que quiere crear la actividad?`,
          },
          duringSubmit: { message: 'La actividad se está creando...' },
          successSubmit: { message: 'La actividad se creó exitósamente' },
          reset: true,
        }}
      >
        <CreateActivityForm />
      </Form>
    </Page>
  )
}
