import Page from '../../../components/page'
import { getAPIURL } from '../../../libs/origin'
import axios from 'redaxios'
import Form from '../../../components/Form'
import { updateEngineDto } from '../../../schemas/engine'
import EditEngineForm from '../../../components/machines/code/edit-engine/EditEngineForm'

export default function editEngine({ code, machineCode, engine }) {
  return (
    <Page title={`Motor ${code} | TECNOPOR S.A.`}>
      <Form
        title={`Motor ${code}`}
        dtoValidation={updateEngineDto}
        initialValues={engine}
        onSubmit={{
          method: 'PUT',
          url: `/api/machines/${machineCode}/edit-engine?engineCode=${code}`,
          message: 'Guardar',
          preSubmit: {
            title: 'Editar motor',
            question: '¿Seguro que quiere guardar los cambios?',
          },
          duringSubmit: { message: 'El motor se está actualizando...' },
          successSubmit: { message: 'El motor se actualizó exitósamente' },
          reset: false,
        }}
      >
        <EditEngineForm />
      </Form>
    </Page>
  )
}

export async function getServerSideProps(context) {
  const {
    query: { code: machineCodeUrl, engineCode },
  } = context

  const api = getAPIURL(context)

  const { data } = await axios.get(
    `${api}/machines/${machineCodeUrl}/get-engine`,
    {
      params: { engineCode },
    }
  )

  const { code, machineCode, ...rest } = data

  return {
    props: { code, machineCode, engine: rest },
  }
}
