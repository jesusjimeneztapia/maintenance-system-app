import { scheduleActions } from '../actions/scheduleActions'

export const scheduleInitialState = {
  date: '',
  draftWorkOrders: [],
}

export const scheduleReducer = (state, { action, payload }) => {
  const func = scheduleActions[action]
  return func ? func(state, payload) : state
}
