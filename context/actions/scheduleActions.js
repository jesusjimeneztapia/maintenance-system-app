export const scheduleActions = {
  setDate(state, payload) {
    return { ...state, date: payload }
  },
  setDraftWorkOrders(state, payload) {
    return { ...state, draftWorkOrders: payload }
  },
  deleteDraftWorkOrderByCode(state, payload) {
    const { draftWorkOrders } = state
    return {
      ...state,
      draftWorkOrders: [
        ...draftWorkOrders.filter(({ code }) => code !== payload),
      ],
    }
  },
}
