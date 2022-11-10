import Page from '../../../components/page'
import { getAPIURL } from '../../../libs/origin'
import axios from 'redaxios'
import EditMachineForm from '../../../components/machines/code/EditMachineForm'
import { updateMachineDto } from '../../../schemas/machine'
import Form from '../../../components/Form'

export default function EditMachine({ code, machine, ...rest }) {
  const mutateValues = (values) => {
    const { technicalDocumentation, image, ...rest } = values
    const body = rest
    if (technicalDocumentation) {
      body.technicalDocumentation = JSON.stringify(technicalDocumentation)
    }
    const formData = new FormData()
    const keys = Object.keys(body)
    keys.forEach((key) => {
      formData.set(key, body[key])
    })
    if (image.size) {
      formData.set('image', image)
    }
    return formData
  }

  return (
    <Page title={`Máquina ${code} | TECNOPOR S.A.`}>
      {machine && (
        <Form
          title={`Máquina ${code}`}
          dtoValidation={updateMachineDto}
          initialValues={machine}
          onSubmit={{
            method: 'PUT',
            url: '/api/machines/update',
            message: 'Guardar',
            preSubmit: {
              title: 'Editar máquina',
              question: '¿Seguro que quiere guardar los cambios?',
              mutateValues,
            },
            duringSubmit: { message: 'La máquina se está actualizando...' },
            successSubmit: {
              message: 'La máquina se actualizó exitósamente',
            },
            reset: false,
          }}
        >
          <EditMachineForm />
        </Form>
      )}
    </Page>
  )
}

export async function getServerSideProps(context) {
  const {
    query: { code },
  } = context

  let machine = null
  let message = null

  const api = getAPIURL(context)
  try {
    const { data } = await axios.get(`${api}/machines/${code}`)
    machine = data
  } catch (error) {
    const { data } = error
    message = data.message
  }

  return {
    props: {
      code,
      machine,
      message,
    },
  }
}
