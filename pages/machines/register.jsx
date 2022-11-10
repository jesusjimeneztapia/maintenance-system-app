import Page from '../../components/page'
import RegisterMachineForm from '../../components/machines/register/RegisterMachineForm'
import { createMachineDto } from '../../schemas/machine'
import Form from '../../components/Form'

const dataInitialValue = {
  name: '',
  maker: '',
  model: '',
  function: '',
  code: '',
  location: '',
  specificData: '',
  criticality: '',
  technicalDocumentation: [],
  image: undefined,
}

export default function RegisterMachine() {
  const mutateValues = (values) => {
    const { technicalDocumentation, ...rest } = values
    const body = {
      ...rest,
      technicalDocumentation: JSON.stringify(technicalDocumentation),
    }
    const formData = new FormData()
    const keys = Object.keys(body)
    keys.forEach((key) => {
      formData.set(key, body[key])
    })
    return formData
  }

  return (
    <Page title='Registro de máquinas | TECNOPOR S.A.'>
      <Form
        title='Registro de Máquina'
        dtoValidation={createMachineDto}
        initialValues={dataInitialValue}
        onSubmit={{
          method: 'POST',
          url: '/api/machines/add',
          message: 'Registrar',
          preSubmit: {
            title: 'Registro de la máquina',
            question: '¿Seguro que quiere registrar la máquina?',
            mutateValues,
          },
          duringSubmit: { message: 'La máquina se está registrando...' },
          successSubmit: { message: 'La máquina se registró exitósamente' },
        }}
      >
        <RegisterMachineForm />
      </Form>
    </Page>
  )
}
