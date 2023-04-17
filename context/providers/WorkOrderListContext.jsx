import { createContext, useContext, useMemo, useState } from 'react'
import { WORK_ORDER_LIST_INITIAL_STATE } from '../reducers/workOrderListReducer'

const WorkOrderListContext = createContext({
  ...WORK_ORDER_LIST_INITIAL_STATE,
  deleteWorkOrderById(workOrderId) {},
  deselectWorkOrder() {},
  selectWorkOrder(workOrder) {},
  updateWorkOrder(updatedWorkOrder) {},
})

export function useWorkOrderList() {
  const context = useContext(WorkOrderListContext)
  return context
}

const STATE_VALUES = {
  Planificada: 'PLANNED',
  Validada: 'VALIDATED',
  'En ejecución': 'DOING',
  Finalizada: 'DONE',
}

function useWorkOrderListProvider({ allWorkOrders = [] }) {
  const [workOrders, setWorkOrders] = useState(allWorkOrders)
  const [selectedWorkOrder, setSelectedWorkOrder] = useState(null)

  const filteredWorkOrdersByState = useMemo(() => {
    let filteredWorkOrders = {}
    Object.entries(STATE_VALUES).forEach(([key, value]) => {
      filteredWorkOrders = {
        ...filteredWorkOrders,
        [key]: workOrders.filter((workOrder) => workOrder.state === value),
      }
    })

    return filteredWorkOrders
  }, [workOrders])

  const deleteWorkOrderById = (workOrderId) => {
    setWorkOrders((workOrders) =>
      workOrders.filter(({ code }) => code !== workOrderId)
    )
  }

  const deselectWorkOrder = () => {
    setSelectedWorkOrder(null)
  }

  const selectWorkOrder = (workOrder) => {
    if (typeof workOrder === 'number') {
      const foundWorkOrder = workOrders.find(({ code }) => code === workOrder)
      return setSelectedWorkOrder(foundWorkOrder)
    }
    setSelectedWorkOrder((selectedWorkOrder) => {
      return selectedWorkOrder != null ? workOrder : null
    })
  }

  const updateWorkOrder = (updatedWorkOrder) => {
    const { code } = updatedWorkOrder
    const index = workOrders.findIndex((workOrder) => workOrder.code === code)
    if (index >= 0) {
      setWorkOrders((workOrders) => {
        workOrders[index] = updatedWorkOrder
        return [...workOrders]
      })
    }
  }

  return {
    filteredWorkOrdersByState,
    selectedWorkOrder,
    workOrders,
    deleteWorkOrderById,
    deselectWorkOrder,
    selectWorkOrder,
    updateWorkOrder,
  }
}

export default function WorkOrderListProvider({ children, allWorkOrders }) {
  const {
    deleteWorkOrderById,
    deselectWorkOrder,
    filteredWorkOrdersByState,
    selectWorkOrder,
    selectedWorkOrder,
    updateWorkOrder,
    workOrders,
  } = useWorkOrderListProvider({ allWorkOrders })

  return (
    <WorkOrderListContext.Provider
      value={{
        deleteWorkOrderById,
        deselectWorkOrder,
        filteredWorkOrdersByState,
        selectWorkOrder,
        selectedWorkOrder,
        updateWorkOrder,
        workOrders,
      }}
    >
      {children}
    </WorkOrderListContext.Provider>
  )
}
