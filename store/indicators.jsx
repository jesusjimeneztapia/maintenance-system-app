import { create } from 'zustand'
import { getIndicators } from '../services/indicatorServices'

export const useIndicators = create((set, get) => ({
  indicators: {},
  date: '2023-04-27',
  setIndicators: (indicators) => set({ indicators }),
  fetchIndicators: async () => {
    const { date } = get()
    const now = new Date()
    const [, month] = date.split('-')
    const strict = now.getMonth() !== month - 1
    const indicators = await getIndicators({ date, strict })
    set({ indicators })
  },
  setDate: (date) => set({ date }),
}))
