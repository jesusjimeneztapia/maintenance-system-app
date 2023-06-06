import Form from '../Form'

function createStoreFormProps({
  id,
  title,
  dtoValidation,
  initialValues,
  method,
  url,
  postSubmit,
}) {
  return {
    title,
    dtoValidation,
    initialValues,
    onSubmit: {
      method,
      url,
      message: id ? 'Guardar' : 'Añadir',
      preSubmit: {
        title: `${id ? 'Editar' : 'Añadir'} repuesto`,
        question: `¿Seguro que quiere ${
          id ? 'guardar los cambios' : 'añadir el repuesto'
        }?`,
      },
      duringSubmit: {
        message: `El repuesto se está ${id ? 'actualizando' : 'añadiendo'}...`,
      },
      successSubmit: {
        message: `El repuesto se ${id ? 'actualizó' : 'añadió'} exitósamente`,
      },
      postSubmit,
      reset: !id,
    },
  }
}

export default function StoreForm({
  children,
  id,
  title,
  dtoValidation,
  initialValues,
  method,
  url,
  postSubmit,
  full = false,
}) {
  return (
    <Form
      {...createStoreFormProps({
        id,
        title,
        dtoValidation,
        initialValues,
        method,
        url,
        postSubmit,
      })}
      full={full}
    >
      {children}
    </Form>
  )
}
