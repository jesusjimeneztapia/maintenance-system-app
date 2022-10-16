export const machineListActions = {
  setFilterByName(state, payload) {
    const { machines } = state
    let filteredMachines = machines
    const filterByName = payload.toUpperCase()
    if (filterByName) {
      const pattern = `^${filterByName}`
      const regExp = new RegExp(pattern)
      filteredMachines = machines.filter(({ name }) => regExp.test(name))
    }
    return { ...state, filterByName, filteredMachines }
  },
  setMachines(state, payload) {
    return {
      ...state,
      filterByName: '',
      machines: payload,
      filteredMachines: payload,
    }
  },
}
