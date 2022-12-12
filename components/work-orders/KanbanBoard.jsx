import { useWorkOrderList } from '../../context/providers/WorkOrderListContext'
import styles from '../../styles/work-orders/KanbanBoard.module.css'
import BoardColumn from './BoardColumn'
import EditWorkOrderModal from './EditWorkOrderModal'

export default function KanbanBoard() {
  const { filteredByState } = useWorkOrderList()

  return (
    <>
      <EditWorkOrderModal />
      <div className={styles.container}>
        <div className={styles.board}>
          {Object.entries(filteredByState).map(([state, workOrders]) => (
            <BoardColumn key={state} state={state} workOrders={workOrders} />
          ))}
        </div>
      </div>
    </>
  )
}
