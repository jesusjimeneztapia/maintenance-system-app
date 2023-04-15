import { filterDraftWorkOrderDto } from '../../schemas/draftWorkOrder'
import Input from '../Input'
import axios from 'redaxios'
import { useToast } from '../../context/providers/ToastContext'
import { useSchedule } from '../../context/providers/ScheduleContext'
import { Button } from '@tremor/react'

function transformDateForInput({ year, month, day }) {
  const date = new Date(year, month, day)
    .toLocaleDateString('es-ES', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    })
    .split('/')
    .reverse()
    .join('-')
  return date
}

function useFilterDraftWorkOrderForm() {
  const { date, setDate, setDraftWorkOrders } = useSchedule()
  const { request } = useToast()

  const handleChange = ({ target: { value } }) => {
    const [year, month, day] = value.split('-')
    if (!!year && !!month && !!day) {
      setDate({
        year: Number(year),
        month: Number(month) - 1,
        day: Number(day),
      })
    }
  }

  const onSubmit = async (e) => {
    e.preventDefault()
    const response = await request(async () => {
      let body
      try {
        body = await filterDraftWorkOrderDto.parseAsync(date)
      } catch (error) {
        // eslint-disable-next-line
        throw {
          data: {
            message: 'Por favor verifique que los campos sean correctos',
          },
          status: 400,
        }
      }
      const { data } = await axios.get('/api/work-orders/draft', {
        params: { ...body },
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
        value={transformDateForInput(date)}
        required
      />

      <Button type='submit' color='amber'>
        Filtrar
      </Button>
    </form>
  )
}
