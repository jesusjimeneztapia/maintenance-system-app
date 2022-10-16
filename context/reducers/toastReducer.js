import { toastActions } from '../actions/toastActions'

export const toastInitialState = {
  children: null,
  color: null,
  show: false,
  close: true,
  autoClose: true,
  position: 'center',
}

export const toastReducer = (state, { action, payload }) => {
  const func = toastActions[action]
  return func ? func(state, payload) : state
}
