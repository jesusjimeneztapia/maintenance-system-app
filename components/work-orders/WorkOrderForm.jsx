import Form from '../Form'
import WorkOrderInformation from './edit/WorkOrderInformation'

function createWorkOrderFormProps({
  id,
  title,
  dtoValidation,
  initialValues,
  method,
  url,
  update,
}) {
  return {
    title,
    dtoValidation,
    initialValues,
    onSubmit: {
      method,
      url,
      message: id ? 'Guardar' : 'Crear',
      preSubmit: {
        title: `${id ? 'Editar' : 'Crear'} orden de trabajo`,
        question: `¿Seguro que quiere ${
          id ? 'guardar los cambios' : 'crear la orden de trabajo'
        }?`,
      },
      duringSubmit: {
        message: `La orden de trabajo se está ${
          id ? 'actualizando' : 'creando'
        }...`,
      },
      postSubmit: {
        update,
      },
      successSubmit: {
        message: `La orden de trabajo se ${
          id ? 'actualizó' : 'creó'
        } exitósamente`,
      },
      reset: !id,
    },
  }
}

export default function WorkOrderForm({
  title,
  id,
  dtoValidation,
  initialValues,
  method,
  url,
  update,
  children,
}) {
  return (
    <Form
      {...createWorkOrderFormProps({
        id,
        title,
        dtoValidation,
        initialValues,
        method,
        url,
        update,
      })}
      information={id ? <WorkOrderInformation {...initialValues} /> : null}
    >
      {children}
    </Form>
  )
}
