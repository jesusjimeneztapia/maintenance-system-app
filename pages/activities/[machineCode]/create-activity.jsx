import Head from 'next/head'
import { useRouter } from 'next/router'
import CreateActivityForm from '../../../components/activities/machine/create-activity/CreateActivityForm'
import Form from '../../../components/Form'
import { createDocumentTitle } from '../../../libs/documentTitle'
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
    <>
      <Head>
        <title>
          {createDocumentTitle('Crear actividad', `Máquina ${machineCode}`)}
        </title>
      </Head>
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
    </>
  )
}
