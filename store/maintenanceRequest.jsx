import { create } from 'zustand'
import { getMachines } from '../services/machineServices'

export const useMaintenanceRequest = create((set, get) => ({
  maintenanceRequests: [],
  loading: true,
  showModal: false,
  formLoading: false,
  machines: null,

  setMaintenanceRequests: (maintenanceRequests) => {
    set({ maintenanceRequests })
  },
  setLoading: (loading) => {
    set({ loading })
  },
  setShowModal: async (showModal) => {
    set({ showModal })
    if (showModal) {
      set({ formLoading: true })
      const machines = await getMachines()
      set({
        machines: Object.fromEntries(
          machines.map(({ code, name }) => [code, name])
        ),
      })
      set({ formLoading: false })
    } else {
      set({ machines: null, createDto: {} })
    }
  },
  addMaintenanceRequest: (maintenanceRequest) => {
    const { maintenanceRequests, setShowModal } = get()
    set({ maintenanceRequests: [maintenanceRequest, ...maintenanceRequests] })
    setShowModal(false)
  },
  removeMaintenanceRequest: (id) => {
    const { maintenanceRequests } = get()
    set({
      maintenanceRequests: maintenanceRequests.filter((mr) => mr.id !== id),
    })
  },
}))
