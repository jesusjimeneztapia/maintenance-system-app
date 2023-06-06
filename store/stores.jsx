import { create } from 'zustand'

export const useStores = create((set, get) => ({
  stores: [],
  selectedMachine: '',
  selectedStore: null,

  setStores: (stores) => {
    set({ stores })
  },
  setSelectedMachine: (selectedMachine) => {
    set({ selectedMachine })
  },
  deleteStoreById: ({ machineCode, storeId }) => {
    const { stores } = get()
    const machineIndex = stores.findIndex(({ code }) => code === machineCode)
    if (machineIndex >= 0) {
      const machine = stores[machineIndex]
      machine.stores = machine.stores.filter(({ id }) => id !== storeId)
      stores[machineIndex] = machine
      set({ stores: [...stores.filter(({ stores }) => stores.length > 0)] })
    }
  },
  setSelectedStore: (selectedStore) => {
    set({ selectedStore })
  },
  updateStore: ({ machineCode, updatedStore }) => {
    const { stores } = get()
    const machineIndex = stores.findIndex(({ code }) => code === machineCode)
    if (machineIndex >= 0) {
      const machine = stores[machineIndex]
      const machineStores = machine.stores
      const storeIndex = machineStores.findIndex(
        ({ id }) => id === updatedStore.id
      )
      if (storeIndex >= 0) {
        machineStores[storeIndex] = updatedStore
        machine.stores = machineStores.sort(
          (
            { amount: a1, minimumAmount: m1, name: n1 },
            { amount: a2, minimumAmount: m2, name: n2 }
          ) => {
            const result = +(a2 < m2) - +(a1 < m1)
            if (result === 0) {
              return n1.localeCompare(n2)
            }
            return result
          }
        )
        stores[machineIndex] = machine
        set({ stores: [...stores] })
      }
    }
  },
}))
