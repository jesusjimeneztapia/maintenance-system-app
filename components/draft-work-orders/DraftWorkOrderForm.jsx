import Form from '../Form'

function createDraftWorkOrderFormProps({
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
      message: code ? 'Guardar' : 'Filtrar',
      preSubmit: {
        title: code
          ? 'Editar'
          : 'Filtrar órdenes de trabajo en borrador por fecha',
      },
    },
    duringSubmit: {
      message: code ? 'Orden de trabajo se está creando...' : undefined,
    },
    successSubmit: {
      message: code ? 'La orden de trabajo se creó exitósamente' : undefined,
    },
    reset: !code,
  }
}

export default function DraftWorkOrderForm({
  code,
  dtoValidation,
  initialValues,
  method,
  title,
  url,
  children,
}) {
  return (
    <Form
      {...createDraftWorkOrderFormProps({
        code,
        dtoValidation,
        initialValues,
        method,
        title,
        url,
      })}
    >
      {children}
    </Form>
  )
}
