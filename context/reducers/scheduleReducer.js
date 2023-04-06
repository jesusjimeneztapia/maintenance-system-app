import { scheduleActions } from '../actions/scheduleActions'

export const scheduleInitialState = {
  date: {
    year: 0,
    month: 0,
    day: 0,
  },
  draftWorkOrders: [],
}

export const scheduleReducer = (state, { action, payload }) => {
  const func = scheduleActions[action]
  return func ? func(state, payload) : state
}
