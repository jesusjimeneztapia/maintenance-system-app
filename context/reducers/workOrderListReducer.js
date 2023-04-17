import { WORK_ORDER_LIST_ACTIONS } from '../actions/workOrderListActions'

export const WORK_ORDER_LIST_INITIAL_STATE = {
  filteredWorkOrdersByState: {},
  selectedWorkOrder: null,
  workOrders: [],
}

export function workOrderListReducer(state, { action, payload }) {
  const fn = WORK_ORDER_LIST_ACTIONS[action]
  return fn ? fn(state, payload) : state
}
