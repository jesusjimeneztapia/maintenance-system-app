import {
  Button,
  Flex,
  Subtitle,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeaderCell,
  TableRow,
  Text,
} from '@tremor/react'
import ClipboardDocumentCheck from '../icons/ClipboardDocumentCheck'
import { dateLocaleString } from '../../libs/date'
import { useMaintenanceRequest } from '../../store/maintenanceRequest'
import { useToast } from '../../store/toast'
import { verifyMaintenanceRequest } from '../../services/maintenanceRequestService'

export default function MaintenanceRequestTable() {
  const maintenanceRequests = useMaintenanceRequest(
    (state) => state.maintenanceRequests
  )
  const removeMaintenanceRequest = useMaintenanceRequest(
    (state) => state.removeMaintenanceRequest
  )
  const [request, reset, show] = useToast((state) => [
    state.request,
    state.reset,
    state.show,
  ])

  if (maintenanceRequests.length < 1) {
    return (
      <Text className='text-center'>No existen solicitudes pendientes</Text>
    )
  }

  const verify = async (id) => {
    show({
      autoClose: false,
      close: true,
      color: 'info',
      position: 'center',
      children: `La solicitud ${id} está siendo verificada...`,
    })
    const response = await request(async () => verifyMaintenanceRequest(id), {
      autoClose: true,
      close: true,
      color: 'success',
      children: `La solicitud de mantenimiento ${id} fue verificada exitósamente`,
    })
    if (response) {
      const { id } = response
      removeMaintenanceRequest(id)
    }
  }

  const handleRemove = (id) => () => {
    show({
      autoClose: false,
      close: false,
      color: 'dark',
      position: 'right',
      children: (
        <Flex className='gap-1' flexDirection='col' alignItems=''>
          <Subtitle className='text-inherit'>
            Verificación de la solicitud de manteniento
            <span className='font-medium'>{` ${id}`}</span>
          </Subtitle>
          <Text className='text-inherit'>
            ¿Está seguro de hacer la verificación? Se eliminará de la lista de
            solicitudes pendientes.
          </Text>
          <Flex className='gap-4 pt-1' justifyContent='end'>
            <Button onClick={() => verify(id)} color='amber'>
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
    <Table>
      <TableHead>
        <TableRow>
          <TableHeaderCell className='text-center'>Id</TableHeaderCell>
          <TableHeaderCell>Máquina</TableHeaderCell>
          <TableHeaderCell>Descripción</TableHeaderCell>
          <TableHeaderCell className='text-center'>Creado</TableHeaderCell>
          <TableHeaderCell className='text-center'>Verificar</TableHeaderCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {maintenanceRequests.map(
          ({ id, machine, description, createdAt }, index) => (
            <TableRow key={id} className={index % 2 === 0 && 'bg-gray-200/60'}>
              <TableCell className='text-center'>{id}</TableCell>
              <TableCell>{machine.name}</TableCell>
              <TableCell className='whitespace-normal max-md:min-w-[320px] max-lg:min-w-[512px] max-xl:min-w-[576px] max-2xl:min-w-[672px]'>
                {description}
              </TableCell>
              <TableCell className='text-center'>
                {dateLocaleString(createdAt, true)}
              </TableCell>
              <TableCell className='text-center'>
                <Button color='amber' onClick={handleRemove(id)}>
                  <ClipboardDocumentCheck className='w-5 h-5' />
                </Button>
              </TableCell>
            </TableRow>
          )
        )}
      </TableBody>
    </Table>
  )
}
