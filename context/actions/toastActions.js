import { toastInitialState } from '../reducers/toastReducer'

export const toastActions = {
  reset() {
    return toastInitialState
  },
  show(state, payload) {
    return { ...state, payload, show: true }
  },
}

export default toastActions
