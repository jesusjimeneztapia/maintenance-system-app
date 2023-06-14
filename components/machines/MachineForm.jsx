import Form from '../Form'

const createMutateValues = (code) => (values) => {
  const { technicalDocumentation, image, ...rest } = values
  const body =
    code != null
      ? rest
      : Object.fromEntries(
          Object.entries(rest).filter(
            ([, value]) => value != null && value !== ''
          )
        )
  if (technicalDocumentation) {
    body.technicalDocumentation = JSON.stringify(technicalDocumentation)
  }
  const formData = new FormData()
  const keys = Object.keys(body)
  keys.forEach((key) => {
    let value = body[key]
    if (value == null || value === '') {
      value = null
    }
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
    invalidMessage: {
      title: `Fallo al ${code ? 'editar' : 'registrar'} la máquina`,
      message: 'Por favor verifique los campos.',
    },
    onSubmit: {
      method,
      url,
      message: code ? 'Guardar' : 'Registrar',
      preSubmit: {
        title: `${code ? 'Edición' : 'Registro'} de la máquina`,
        question: `¿Seguro que quiere ${
          code ? 'guardar los cambios' : 'registrar la máquina'
        }?`,
        mutateValues: createMutateValues(code),
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
