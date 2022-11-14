import Form from '../Form'

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
      message: code ? 'Guardar' : 'Crear',
      preSubmit: {
        title: `${
          code
            ? 'Editar actividad'
            : `Crear actividad para la máquina ${machineCode}`
        }`,
        question: `¿Seguro que quiere ${
          code ? 'guardar los cambios' : `crear la actividad`
        }?`,
      },
      duringSubmit: {
        message: `La actividad se está ${code ? 'actualizando' : 'creando'}...`,
      },
      successSubmit: {
        message: `La actividad se ${code ? 'actualizó' : 'creó'} exitósamente`,
      },
      reset: !code,
    },
  }
}

export default function ActivityForm({
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
