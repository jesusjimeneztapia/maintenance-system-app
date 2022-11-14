import Form from '../../Form'

function createMachineFormProps({
  code,
  machineCode,
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
      message: code ? 'Guardar' : 'Agregar',
      preSubmit: {
        title: `${
          code ? 'Editar motor' : `Agregar motor a la máquina ${machineCode}`
        }`,
        question: `¿Seguro que quiere ${
          code ? 'guardar los cambios' : `agregar el motor`
        }?`,
      },
      duringSubmit: {
        message: `El motor se está ${code ? 'actualizando' : 'agregando'}...`,
      },
      successSubmit: {
        message: `El motor se ${code ? 'actualizó' : 'agregó'} exitósamente`,
      },
      reset: !code,
    },
  }
}

export default function EngineForm({
  title,
  code,
  machineCode,
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
        machineCode,
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
