import { createContext, useContext, useReducer } from 'react'
import {
  machineListInitialState,
  machineListReducer,
} from '../reducers/machineListReducer'

const MachineListContext = createContext({
  ...machineListInitialState,
  searchHandleChange(e) {},
})

export function useMachineList() {
  const context = useContext(MachineListContext)
  return context
}

export default function MachineListProvider({ children, machines }) {
  const [state, dispatch] = useReducer(machineListReducer, {
    ...machineListInitialState,
    machines,
    filteredMachines: machines,
  })

  const searchHandleChange = ({ target: { value } }) => {
    dispatch({ action: 'setFilterByName', payload: value })
  }

  return (
    <MachineListContext.Provider value={{ ...state, searchHandleChange }}>
      {children}
    </MachineListContext.Provider>
  )
}
