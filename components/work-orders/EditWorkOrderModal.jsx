import { useWorkOrderList } from '../../context/providers/WorkOrderListContext'
import { CgClose } from 'react-icons/cg'
import styles from '../../styles/work-orders/EditWorkOrderModal.module.css'
import WorkOrderForm from './WorkOrderForm'
import EditWorkOrderForm from './edit/EditWorkOrderForm'
import { getUpdateWorkOrderConfig } from '../../services/workOrderService'
import Criticality from '../machines/Criticality'

export default function EditWorkOrderModal() {
  const { selectedWorkOrder, deselectWorkOrder, updateWorkOrder } =
    useWorkOrderList()

  if (!selectedWorkOrder) {
    return <></>
  }

  return (
    <div className={styles.modal}>
      <span onClick={deselectWorkOrder} />
      <div className={styles.container}>
        <header className={styles.header}>
          <section>
            <p>Información de la orden de trabajo #{selectedWorkOrder.id}</p>
            <Criticality criticality={selectedWorkOrder.machine.criticality} />
          </section>
          <CgClose className={styles.close} onClick={deselectWorkOrder} />
        </header>
        <WorkOrderForm
          {...getUpdateWorkOrderConfig(selectedWorkOrder.id)}
          id={selectedWorkOrder.id}
          initialValues={{
            ...selectedWorkOrder,
            failureCause: selectedWorkOrder.failureCause ?? undefined,
            startDate: selectedWorkOrder.startDate ?? undefined,
            endDate: selectedWorkOrder.endDate ?? undefined,
          }}
          update={updateWorkOrder}
        >
          <EditWorkOrderForm />
        </WorkOrderForm>
      </div>
    </div>
  )
}
