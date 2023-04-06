import { filterDraftWorkOrderDto } from '../../schemas/draftWorkOrder'
import Input from '../Input'
import axios from 'redaxios'
import { useToast } from '../../context/providers/ToastContext'
import Button from '../Button'
import { useSchedule } from '../../context/providers/ScheduleContext'

function getWeekNumber({ year, month, day }) {
  const date = new Date(year, month, day)
  const dayNumber = (date.getDay() + 6) % 7

  const aux = new Date(date.valueOf())
  aux.setDate(aux.getDate() - dayNumber + 3)
  const firstTuesday = aux.valueOf()

  aux.setMonth(0, 1)

  if (aux.getDay() !== 4) {
    aux.setMonth(0, 1 + ((4 - aux.getDay() + 7) % 7))
  }

  return 1 + Math.ceil((firstTuesday - aux) / 604800000)
}

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
    <form
      onSubmit={onSubmit}
      style={{ display: 'flex', alignItems: 'flex-end', gap: '12px' }}
    >
      <Input
        id='date'
        label={`Semana ${getWeekNumber(date)}`}
        type='date'
        onChange={handleChange}
        value={transformDateForInput(date)}
        required
      />

      <Button type='submit'>Filtrar</Button>
    </form>
  )
}
