export const WORK_ORDER_LIST_ACTIONS = {
  setFilterByActivityName(state, payload) {
    const { workOrders } = state
    let filteredWorkOrders = workOrders
    const filterByActivityName = payload.toUpperCase()
    if (filterByActivityName) {
      const pattern = `^${filterByActivityName}`
      const regExp = new RegExp(pattern)
      filteredWorkOrders = workOrders.filter(({ activity: { name } }) =>
        regExp.test(name)
      )
    }
    return { ...state, filterByActivityName, filteredWorkOrders }
  },
  setWorkOrders(state, payload) {
    const filteredByState = {
      PLANNED: [],
      VALIDATED: [],
      DOING: [],
      DONE: [],
    }
    payload.forEach(({ state, ...workOrder }) => {
      filteredByState[state] = [
        ...filteredByState[state],
        { ...workOrder, state },
      ]
    })
    return {
      ...state,
      filterByActivityName: '',
      workOrders: payload,
      filteredByState,
    }
  },
  setSelectedWorkOrder(state, payload) {
    const { workOrders } = state
    const selectedWorkOrder = workOrders.find(({ code }) => code === payload)
    if (selectedWorkOrder) {
      return {
        ...state,
        selectedWorkOrder,
      }
    }
  },
  deleteSelectedWorkOrder(state) {
    return {
      ...state,
      selectedWorkOrder: null,
    }
  },
  updateWorkOrder(state, payload) {
    const { code: workOrderId } = payload
    const workOrders = [...state.workOrders]
    const foundIndex = workOrders.findIndex(({ code }) => code === workOrderId)
    if (foundIndex >= 0) {
      const foundWorkOrder = workOrders[foundIndex]
      workOrders[foundIndex] = payload
      const { state: currentState } = foundWorkOrder
      const { state: updatedState } = payload
      const filteredByState = { ...state.filteredByState }
      const currentColumn = filteredByState[currentState]
      const foundUpdateIndex = currentColumn.findIndex(
        (workOrder) => workOrderId === workOrder.code
      )
      if (currentState !== updatedState) {
        const updateColumn = filteredByState[updatedState]
        if (foundUpdateIndex >= 0) {
          const moveToColumn = [...updateColumn, payload]
          const filteredByState = {
            ...state.filteredByState,
            [currentState]: [
              ...currentColumn.filter((_, i) => i !== foundUpdateIndex),
            ],
            [updatedState]: [
              ...moveToColumn.sort(
                ({ createdAt: c1 }, { createdAt: c2 }) =>
                  new Date(c1) - new Date(c2)
              ),
            ],
          }

          return {
            ...state,
            workOrders,
            filteredByState,
            selectedWorkOrder: payload,
          }
        }
      } else {
        currentColumn[foundUpdateIndex] = payload
        return {
          ...state,
          workOrders,
          filteredByState: {
            ...filteredByState,
            [currentState]: currentColumn,
          },
          selectedWorkOrder: payload,
        }
      }
      return { ...state, workOrders, selectedWorkOrder: payload }
    }
    return state
  },
}
