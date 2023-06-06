import { create } from 'zustand'

export const useAddStore = create((set) => ({
  fields: {},

  setFields: (fields) => {
    set({ fields })
  },
}))
