import { create } from 'zustand'

export const useHistorical = create((set) => ({
  machines: {},
  selectedMachine: '',

  setMachines: (machines) => {
    set({ machines })
  },
  setSelectedMachine: (selectedMachine) => {
    set({ selectedMachine })
  },
}))
