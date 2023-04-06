import { createContext, useContext, useReducer } from 'react'
import {
  scheduleInitialState,
  scheduleReducer,
} from '../reducers/scheduleReducer'

const ScheduleContext = createContext({
  ...scheduleInitialState,
  setDate(date) {},
  setDraftWorkOrders(draftWorkOrders) {},
  deleteDraftWorkOrderByCode(draftWorkOrderCode) {},
})

export function useSchedule() {
  const context = useContext(ScheduleContext)
  return context
}

export default function ScheduleProvider({
  children,
  year,
  month,
  day,
  draftWorkOrders,
}) {
  const [state, dispatch] = useReducer(scheduleReducer, {
    ...scheduleInitialState,
    date: { year, month, day },
    draftWorkOrders,
  })

  const setDate = (date) => {
    dispatch({
      action: 'setDate',
      payload: date,
    })
  }

  const setDraftWorkOrders = (draftWorkOrders) => {
    dispatch({ action: 'setDraftWorkOrders', payload: draftWorkOrders })
  }

  const deleteDraftWorkOrderByCode = (draftWorkOrderCode) => {
    dispatch({
      action: 'deleteDraftWorkOrderByCode',
      payload: draftWorkOrderCode,
    })
  }

  return (
    <ScheduleContext.Provider
      value={{
        ...state,
        setDate,
        setDraftWorkOrders,
        deleteDraftWorkOrderByCode,
      }}
    >
      {children}
    </ScheduleContext.Provider>
  )
}
