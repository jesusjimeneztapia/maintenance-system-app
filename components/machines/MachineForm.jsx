import Form from '../Form'

function mutateValues(values) {
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

function createMachineFormProps({
  code,
  title,
  dtoValidation,
  initialValues,
  method,
  url,
}) {
  return {
    title,
    dtoValidation,
    initialValues,
    onSubmit: {
      method,
      url,
      message: code ? 'Guardar' : 'Registrar',
      preSubmit: {
        title: `${code ? 'Editar' : 'Registro de la'} máquina`,
        question: `¿Seguro que quiere ${
          code ? 'guardar los cambios' : 'registrar la máquina'
        }?`,
        mutateValues,
      },
      duringSubmit: {
        message: `La máquina se está ${
          code ? 'actualizando' : 'registrando'
        }...`,
      },
      successSubmit: {
        message: `La máquina se ${
          code ? 'actualizó' : 'registró'
        } exitósamente`,
      },
      reset: !code,
    },
  }
}

export default function MachineForm({
  title,
  code,
  dtoValidation,
  initialValues,
  method,
  url,
  children,
}) {
  return (
    <Form
      {...createMachineFormProps({
        code,
        title,
        dtoValidation,
        initialValues,
        method,
        url,
      })}
    >
      {children}
    </Form>
  )
}
