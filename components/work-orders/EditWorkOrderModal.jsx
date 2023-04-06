import { useWorkOrderList } from '../../context/providers/WorkOrderListContext'
import { CgClose } from 'react-icons/cg'
import styles from '../../styles/work-orders/EditWorkOrderModal.module.css'
import WorkOrderForm from './WorkOrderForm'
import {
  getUpdateWorkOrderConfig,
  updateWorkOrderUrlInternal,
} from '../../services/workOrderService'
import { Priority } from './WorkOrderCard'
import Button from '../Button'
import { useToast } from '../../context/providers/ToastContext'
import axios from 'redaxios'
import ValidatedToDoingForm from './edit/ValidatedToDoingForm'
import DoingToDoneForm from './edit/DoingToDoneForm'
import WorkOrderInformation from './edit/WorkOrderInformation'
import { isInspection } from '../../libs/workOrder'

export default function EditWorkOrderModal() {
  const { request, showToast } = useToast()
  const { selectedWorkOrder, deselectWorkOrder, updateWorkOrder } =
    useWorkOrderList()

  if (!selectedWorkOrder) {
    return <></>
  }
  const toDoing = isInspection(selectedWorkOrder)

  const passToValidated = async () => {
    showToast({
      autoClose: false,
      close: true,
      color: 'secondary',
      position: 'center',
      children: `La orden de trabajo ${selectedWorkOrder.code} se está actualizando...`,
    })
    const response = await request(
      async () => {
        const { data } = await axios.put(
          updateWorkOrderUrlInternal(selectedWorkOrder.code),
          {
            state: toDoing ? 'DOING' : 'VALIDATED',
            securityMeasureStarts: [],
            protectionEquipments: [],
            startDate: new Date(),
            allow: toDoing,
          }
        )
        return data
      },
      {
        autoClose: true,
        close: true,
        color: 'success',
        children: `La orden de trabajo ${selectedWorkOrder.code} se actualizó con éxito`,
      }
    )
    if (response) {
      updateWorkOrder(response)
    }
  }

  const handleMutateValuesToDoing = (values) => {
    return { ...values, startDate: new Date() }
  }

  return (
    <div className={styles.modal}>
      <span onClick={deselectWorkOrder} />
      <div className={styles.container}>
        <header className={styles.header}>
          <section>
            <p>Información de la orden de trabajo #{selectedWorkOrder.code}</p>
            <Priority criticality={selectedWorkOrder.priority} />
          </section>
          <CgClose className={styles.close} onClick={deselectWorkOrder} />
        </header>
        {selectedWorkOrder.state === 'PLANNED' ? (
          <>
            <WorkOrderInformation {...selectedWorkOrder} />
            <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
              <Button onClick={passToValidated}>
                Pasar a {toDoing ? 'ejecución' : 'validada'}
              </Button>
            </div>
          </>
        ) : selectedWorkOrder.state === 'VALIDATED' ? (
          <WorkOrderForm
            {...getUpdateWorkOrderConfig(selectedWorkOrder.code)}
            id={selectedWorkOrder.code}
            initialValues={{
              ...selectedWorkOrder,
              failureCause: selectedWorkOrder.failureCause ?? undefined,
              startDate: selectedWorkOrder.startDate ?? undefined,
              endDate: selectedWorkOrder.endDate ?? undefined,
            }}
            update={updateWorkOrder}
            mutateValues={handleMutateValuesToDoing}
            preSubmitQuestion='¿Seguro que quiere guardar los cambios? A partir de este momento se tomará en cuenta el tiempo de ejecución de la orden de trabajo.'
          >
            <ValidatedToDoingForm />
          </WorkOrderForm>
        ) : selectedWorkOrder.state === 'DOING' ? (
          <WorkOrderForm
            {...getUpdateWorkOrderConfig(selectedWorkOrder.code)}
            id={selectedWorkOrder.code}
            initialValues={{
              ...selectedWorkOrder,
              failureCause: selectedWorkOrder.failureCause ?? undefined,
              startDate: selectedWorkOrder.startDate ?? undefined,
              endDate: selectedWorkOrder.endDate ?? undefined,
            }}
            update={updateWorkOrder}
            preSubmitQuestion='¿Seguro que quiere guardar los cambios? Se cerrará esta orden de trabajo.'
          >
            <DoingToDoneForm />
          </WorkOrderForm>
        ) : (
          <WorkOrderInformation {...selectedWorkOrder} />
        )}
      </div>
    </div>
  )
}
