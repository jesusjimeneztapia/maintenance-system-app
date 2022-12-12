import { FaEllipsisH } from 'react-icons/fa'
import { useWorkOrderList } from '../../context/providers/WorkOrderListContext'
import { WORK_ORDER_STATE_VALUES_MAP } from '../../schemas/workOrder'
import styles from '../../styles/work-orders/BoardColumn.module.css'
import WorkOrderCard from './WorkOrderCard'

export default function BoardColumn({ state, workOrders }) {
  const { selectWorkOrder } = useWorkOrderList()
  return (
    <section className={styles.column}>
      <header className={styles.header}>
        <h4 className={styles.title}>{WORK_ORDER_STATE_VALUES_MAP[state]}</h4>
        <FaEllipsisH className={styles.options} />
      </header>
      <div className={styles.content}>
        {workOrders.length === 0 ? (
          <p className={styles.message}>
            No existen órdenes de trabajo en esta columna
          </p>
        ) : (
          <>
            {workOrders.map(({ id, activity, machine, createdAt }) => (
              <WorkOrderCard
                key={id}
                activity={activity}
                machine={machine}
                createdAt={createdAt}
                editHandleChange={() => selectWorkOrder(id)}
              />
            ))}
          </>
        )}
      </div>
    </section>
  )
}
