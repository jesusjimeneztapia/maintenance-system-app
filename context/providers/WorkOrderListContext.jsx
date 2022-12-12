import { createContext, useContext, useEffect, useReducer } from 'react'
import {
  workOrderListReducer,
  WORK_ORDER_LIST_INITIAL_STATE,
} from '../reducers/workOrderListReducer'

const WorkOrderListContext = createContext({
  ...WORK_ORDER_LIST_INITIAL_STATE,
  searchHandleChange(e) {},
  selectWorkOrder(workOrderId) {},
  deselectWorkOrder() {},
  updateWorkOrder(updatedWorkOrder) {},
})

export function useWorkOrderList() {
  const context = useContext(WorkOrderListContext)
  return context
}

export default function WorkOrderListProvider({ children, workOrders }) {
  const [state, dispatch] = useReducer(
    workOrderListReducer,
    WORK_ORDER_LIST_INITIAL_STATE
  )

  useEffect(() => {
    dispatch({ action: 'setWorkOrders', payload: workOrders })
  }, [workOrders])

  const searchHandleChange = ({ target: { value } }) => {
    dispatch({ action: 'setFilterByActivityName', payload: value })
  }

  const selectWorkOrder = (workOrderId) => {
    dispatch({ action: 'setSelectedWorkOrder', payload: workOrderId })
  }

  const deselectWorkOrder = () => {
    dispatch({ action: 'deleteSelectedWorkOrder' })
  }

  const updateWorkOrder = (updatedWorkOrder) => {
    dispatch({
      action: 'updateWorkOrder',
      payload: updatedWorkOrder,
    })
  }

  return (
    <WorkOrderListContext.Provider
      value={{
        ...state,
        searchHandleChange,
        selectWorkOrder,
        deselectWorkOrder,
        updateWorkOrder,
      }}
    >
      {children}
    </WorkOrderListContext.Provider>
  )
}
