import { getUpdateWorkOrderConfig } from '../../../services/workOrderService'
import WorkOrderForm from '../WorkOrderForm'
import DoingToDoneForm from './DoingToDoneForm'
import ValidatedToDoingForm from './ValidatedToDoingForm'

export default function WorkOrderEditForm({
  code,
  state,
  failureCause,
  startDate,
  endDate,
  updateWorkOrder,
  ...props
}) {
  const handleMutateValuesToDoing = (values) => {
    return { ...values, startDate: new Date() }
  }

  const handleMutateValuesToDone = (values) => {
    const { usedStores } = values
    return { ...values, stores: usedStores }
  }

  return (
    <>
      {state === 'VALIDATED' ? (
        <WorkOrderForm
          {...getUpdateWorkOrderConfig(code)}
          id={code}
          title='Pasar a EN EJECUCIÓN'
          initialValues={{
            ...props,
            state,
            code,
            failureCause: failureCause ?? undefined,
            startDate: startDate ?? undefined,
            endDate: endDate ?? undefined,
            securityMeasureStarts: [],
            protectionEquipments: [],
          }}
          update={updateWorkOrder}
          mutateValues={handleMutateValuesToDoing}
          preSubmitQuestion='¿Seguro que quiere guardar los cambios? A partir de este momento se tomará en cuenta el tiempo de ejecución de la orden de trabajo.'
        >
          <ValidatedToDoingForm />
        </WorkOrderForm>
      ) : (
        <WorkOrderForm
          {...getUpdateWorkOrderConfig(code)}
          id={code}
          title='Pasar a FINALIZADA'
          initialValues={{
            ...props,
            state,
            code,
            failureCause: failureCause ?? undefined,
            startDate: startDate ?? undefined,
            endDate: endDate ?? undefined,
            usedStores: [],
            securityMeasureEnds: [],
          }}
          update={updateWorkOrder}
          mutateValues={handleMutateValuesToDone}
          preSubmitQuestion='¿Seguro que quiere guardar los cambios? Se cerrará esta orden de trabajo.'
        >
          <DoingToDoneForm />
        </WorkOrderForm>
      )}
    </>
  )
}
