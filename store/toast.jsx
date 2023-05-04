import { create } from 'zustand'

const toastInitialState = {
  children: null,
  color: null,
  show: false,
  close: true,
  autoClose: true,
  position: 'center',
}

export const useToast = create((set, get) => ({
  toast: toastInitialState,

  request: async (callback, config) => {
    const { show } = get()
    try {
      const response = await callback()
      if (config) {
        show(config)
      }
      return response
    } catch (error) {
      const {
        data: { message },
        status,
      } = error
      show({
        autoClose: false,
        close: true,
        color: status >= 500 ? 'failure' : 'warning',
        position: 'center',
        children: message,
      })
    }
  },
  reset: () => {
    set({ toast: toastInitialState })
  },
  show: (payload) => {
    set({ toast: { ...payload, show: true } })
  },
}))
