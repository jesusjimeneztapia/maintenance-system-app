import EditActivityForm from '../../../components/activities/machine/edit-activity/EditActivityForm'
import Form from '../../../components/Form'
import Page from '../../../components/page'
import { getAPIURL } from '../../../libs/origin'
import { updateActivityDto } from '../../../schemas/activity'
import axios from 'redaxios'

export default function EditActivity({ code, machineCode, ...props }) {
  return (
    <Page title={`Actividad ${code} | TECNOPOR S.A.`}>
      <Form
        title={`Actividad ${code}`}
        dtoValidation={updateActivityDto}
        initialValues={{ ...props, machineCode }}
        onSubmit={{
          method: 'PUT',
          url: `/api/activities/${code}/edit`,
          message: 'Guardar',
          preSubmit: {
            title: 'Editar actividad',
            question: '¿Seguro que quiere guardar los cambios?',
          },
          duringSubmit: { message: 'La actividad se está actualizando...' },
          successSubmit: { message: 'La actividad se actualizó exitósamente' },
          reset: false,
        }}
      >
        <EditActivityForm />
      </Form>
    </Page>
  )
}

export async function getServerSideProps(context) {
  const {
    query: { code, machineCode },
  } = context

  const api = getAPIURL(context)

  let data

  try {
    const response = await axios.get(`${api}/activities/${code}`, {
      params: { machineCode },
    })
    data = response.data
  } catch (error) {
    data = error.data
  }

  return { props: { code, machineCode, ...data } }
}
