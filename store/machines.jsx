import { create } from 'zustand'

export const useMachineList = create((set) => ({
  machines: [],
  filterByName: '',
  page: null,
  loading: true,

  setFilterByName: (name) => {
    set({ filterByName: name })
  },
  setMachines: (machines) => {
    set({ machines })
  },
  setLoading: (loading) => {
    set({ loading })
  },
  setPage: (page) => {
    set({ page })
  },
}))
