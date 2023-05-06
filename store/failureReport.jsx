import { create } from 'zustand'
import { getMachines } from '../services/machineServices'

export const useFailureReport = create((set, get) => ({
  failureReports: [],
  loading: true,
  showModal: false,
  formLoading: false,
  machines: null,

  setFailureReports: (failureReports) => {
    set({ failureReports })
  },
  setLoading: (loading) => {
    set({ loading })
  },
  setShowModal: async (showModal) => {
    set({ showModal })
    if (showModal) {
      set({ formLoading: true })
      const machines = await getMachines()
      return set({
        machines: Object.fromEntries(
          machines.map(({ code, name }) => [code, name])
        ),
        formLoading: false,
      })
    }
    set({ machines: null })
  },
  addFailureReport: (failureReport) => {
    const { failureReports, setShowModal } = get()
    set({ failureReports: [failureReport, ...failureReports] })
    setShowModal(false)
  },
  removeFailureReport: (id) => {
    const { failureReports } = get()
    set({ failureReports: failureReports.filter((fr) => fr.id !== id) })
  },
}))
