import { useState } from 'react'
import { dateLocaleString } from '../../libs/date'
import { WORK_ORDER_PRIORITY_VALUES_MAP } from '../../schemas/workOrder'
import Select from '../Select'
import { useToast } from '../../context/providers/ToastContext'
import axios from 'redaxios'
import { DRAFT_WORK_ORDER_URL_INTERNAL } from '../../services/draftWorkOrderService'
import { Button, Card, Flex, Subtitle, Text } from '@tremor/react'
import { Badge } from 'flowbite-react'

export default function DraftWorkOrderCard({
  code,
  activity,
  machine,
  plannedDay,
  priority,
  handleDelete,
}) {
  const { showToast, reset, request } = useToast()
  const [data, setData] = useState({ priority })

  const handleChange = ({ target: { name, value } }) => {
    setData((data) => ({ ...data, [name]: value }))
  }

  const remove = async () => {
    const response = await request(
      async () => {
        return await axios.delete(
          `${DRAFT_WORK_ORDER_URL_INTERNAL}/${code}/delete`
        )
      },
      {
        color: 'success',
        autoClose: true,
        close: true,
        children: 'La órden de trabajo se eliminó exitósamente',
      }
    )

    if (response) {
      handleDelete()
    }
  }

  const handleRemove = () => {
    showToast({
      color: 'dark',
      autoClose: false,
      close: false,
      position: 'right',
      children: (
        <Flex className='gap-1' flexDirection='col' alignItems=''>
          <Subtitle className='text-inherit'>
            Eliminar órden de trabajo
          </Subtitle>
          <Text className='text-inherit'>
            ¿Seguro que quiere eliminar la órden de trabajo en borrador?
          </Text>
          <Flex className='gap-4 pt-1' justifyContent='end'>
            <Button color='amber' onClick={remove}>
              Si
            </Button>
            <Button onClick={reset} color='red'>
              No
            </Button>
          </Flex>
        </Flex>
      ),
    })
  }

  const submit = async () => {
    const response = await request(
      async () => {
        return await axios.put(`${DRAFT_WORK_ORDER_URL_INTERNAL}/${code}`, data)
      },
      {
        color: 'info',
        position: 'center',
        autoClose: true,
        close: true,
        children: 'La órden de trabajo se está creando...',
      }
    )

    if (response) {
      showToast({
        color: 'success',
        position: 'center',
        autoClose: true,
        close: true,
        children: 'La órden de trabajo se creó exitósamente',
      })
      handleDelete()
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    showToast({
      color: 'dark',
      position: 'right',
      autoClose: false,
      close: false,
      children: (
        <Flex className='gap-1' flexDirection='col' alignItems=''>
          <Subtitle className='text-inherit'>Crear órden de trabajo</Subtitle>
          <Text className='text-inherit'>
            ¿Seguro que quiere crear la órden de trabajo?
          </Text>
          <Flex className='gap-4 pt-1' justifyContent='end'>
            <Button color='amber' onClick={submit}>
              Si
            </Button>
            <Button onClick={reset} color='red'>
              No
            </Button>
          </Flex>
        </Flex>
      ),
    })
  }

  return (
    <Card className='max-w-xs w-full'>
      <Flex className='mb-3 gap-1' flexDirection='col' alignItems='start'>
        <Text className='text-slate-400'>{machine?.name}</Text>
        <Text className='text-slate-900 font-medium'>{activity?.name}</Text>
      </Flex>
      <form className='flex flex-col gap-3 mb-3' onSubmit={handleSubmit}>
        <Select
          id={`priority-${code}`}
          name='priority'
          label='Prioridad'
          value={data.priority}
          optionsMap={WORK_ORDER_PRIORITY_VALUES_MAP}
          onChange={handleChange}
        />
        <Flex className='gap-2' justifyContent='start'>
          <Button type='submit' color='amber'>
            Crear
          </Button>
          <Button onClick={handleRemove} type='button' color='red'>
            Eliminar
          </Button>
        </Flex>
      </form>
      <Badge className='w-fit ml-auto' color='gray'>
        {dateLocaleString(plannedDay, true)}
      </Badge>
    </Card>
  )
}
