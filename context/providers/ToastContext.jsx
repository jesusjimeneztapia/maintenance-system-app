import { createContext, useContext, useEffect, useReducer } from 'react'
import { toastInitialState, toastReducer } from '../reducers/toastReducer'

const ToastContext = createContext({
  ...toastInitialState,
  reset() {},
  showToast({ color, children, close, autoClose, position }) {},
  async request(callback, { color, message, close, autoClose, children }) {},
})

export function useToast() {
  const { show, reset, autoClose, ...rest } = useContext(ToastContext)

  useEffect(() => {
    if (show && autoClose) {
      const timer = setTimeout(() => reset(), 5000)
      return () => clearTimeout(timer)
    }
  }, [show, autoClose, reset])

  return { show, reset, ...rest }
}

export default function ToastProvider({ children }) {
  const [state, dispatch] = useReducer(toastReducer, toastInitialState)

  const reset = () => {
    dispatch({ action: 'reset' })
  }

  const showToast = (values) => {
    dispatch({ action: 'show', payload: values })
  }

  const request = async (callback, config) => {
    try {
      const response = await callback()
      if (config) {
        showToast(config)
      }
      return response
    } catch (error) {
      const {
        data: { message },
        status,
      } = error
      showToast({
        autoClose: false,
        close: true,
        color: status >= 500 ? 'danger' : 'warning',
        position: 'center',
        children: message,
      })
    }
  }

  return (
    <ToastContext.Provider value={{ ...state, reset, showToast, request }}>
      {children}
    </ToastContext.Provider>
  )
}
