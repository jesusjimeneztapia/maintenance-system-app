import { create } from 'zustand'

export const useMaintenanceRequest = create((set) => ({
  maintenanceRequests: [],
  loading: true,

  setMaintenanceRequests: (maintenanceRequests) => {
    set({ maintenanceRequests })
  },
  setLoading: (loading) => {
    set({ loading })
  },
}))
