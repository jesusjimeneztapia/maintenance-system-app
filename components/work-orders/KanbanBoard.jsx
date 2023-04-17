import { Flex } from '@tremor/react'
import { useWorkOrderList } from '../../context/providers/WorkOrderListContext'
import BoardColumn from './BoardColumn'
import EditWorkOrderModal from './EditWorkOrderModal'

export default function KanbanBoard() {
  const { filteredWorkOrdersByState } = useWorkOrderList()

  return (
    <>
      <EditWorkOrderModal />
      <Flex className='overflow-x-auto'>
        <Flex className='gap-5 w-max' alignItems='start'>
          {Object.entries(filteredWorkOrdersByState).map(
            ([state, workOrders]) => (
              <BoardColumn key={state} state={state} workOrders={workOrders} />
            )
          )}
        </Flex>
      </Flex>
    </>
  )
}
