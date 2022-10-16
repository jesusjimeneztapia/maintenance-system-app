import { machineListActions } from '../actions/machineListActions'

export const machineListInitialState = {
  filterByName: '',
  machines: [],
  filteredMachines: [],
}

export const machineListReducer = (state, { action, payload }) => {
  const func = machineListActions[action]
  return func ? func(state, payload) : state
}
