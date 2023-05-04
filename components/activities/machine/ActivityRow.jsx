import axios from 'redaxios'
import { getFrequencyName } from '../../../schemas/activity'
import { deleteActivityByCodeUrlInternal } from '../../../services/activityServices'
import {
  Button,
  Flex,
  Subtitle,
  TableCell,
  TableRow,
  Text,
} from '@tremor/react'
import Link from 'next/link'
import EditIcon from '../../icons/EditIcon'
import TrashSolidIcon from '../../icons/TrashSolidIcon'
import { useToast } from '../../../store/toast'

export default function ActivityRow({
  code,
  name,
  frequency,
  machineCode,
  activityType,
  deleteActivity,
}) {
  const [show, request, reset] = useToast((state) => [
    state.show,
    state.request,
    state.reset,
  ])

  const autoDelete = async () => {
    const response = await request(
      async () => {
        await axios.delete(deleteActivityByCodeUrlInternal(code), {
          params: { machineCode },
        })
        return true
      },
      {
        autoClose: true,
        close: true,
        color: 'success',
        position: 'center',
        children: 'La actividad se eliminó exitósamente',
      }
    )
    if (response) {
      deleteActivity({ code, activityType })
    }
  }

  const handleDelete = () => {
    show({
      autoClose: false,
      close: false,
      color: 'dark',
      position: 'right',
      children: (
        <Flex className='gap-1' flexDirection='col' alignItems=''>
          <Subtitle className='text-inherit'>
            Eliminar actividad {code}
          </Subtitle>
          <Text className='text-inherit'>
            ¿Seguro que quiere eliminar la actividad?
          </Text>
          <Flex className='gap-4 pt-1' justifyContent='end'>
            <Button onClick={autoDelete} color='amber'>
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
    <TableRow>
      <TableCell>{code}</TableCell>
      <TableCell>{name}</TableCell>
      <TableCell className='text-center'>
        {getFrequencyName(frequency)}
      </TableCell>
      <TableCell>
        <Flex className='gap-4' justifyContent='center' alignItems='center'>
          <Link
            href={{
              pathname: '/activities/[machineCode]/edit-activity',
              query: { machineCode, code },
            }}
          >
            <a className='flex items-center gap-1 font-medium text-slate-500 hover:text-slate-700'>
              <EditIcon className='w-5 h-5' />
              Editar
            </a>
          </Link>
          <Button
            icon={() => <TrashSolidIcon className='w-4 h-4 text-inherit' />}
            color='red'
            onClick={handleDelete}
          />
        </Flex>
      </TableCell>
    </TableRow>
  )
}
