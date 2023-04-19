import Input from '../Input'
import axios from 'redaxios'
import { useToast } from '../../context/providers/ToastContext'
import { useSchedule } from '../../context/providers/ScheduleContext'
import { Button } from '@tremor/react'

function useFilterDraftWorkOrderForm() {
  const { date, setDate, setDraftWorkOrders } = useSchedule()
  const { request } = useToast()

  const handleChange = ({ target: { value } }) => {
    setDate(value)
  }

  const onSubmit = async (e) => {
    e.preventDefault()
    const response = await request(async () => {
      const [year, month, day] = date.split('-')
      const { data } = await axios.get('/api/work-orders/draft', {
        params: { date: new Date(+year, month - 1, +day) },
      })
      return data
    })

    if (response) {
      setDraftWorkOrders(response)
    }
  }

  return { date, handleChange, onSubmit }
}

export default function FilterDraftWorkOrderForm() {
  const { date, handleChange, onSubmit } = useFilterDraftWorkOrderForm()

  return (
    <form className='flex gap-3 max-sm:self-end' onSubmit={onSubmit}>
      <Input
        id='date'
        type='date'
        onChange={handleChange}
        value={date}
        required
      />

      <Button type='submit' color='amber'>
        Filtrar
      </Button>
    </form>
  )
}
