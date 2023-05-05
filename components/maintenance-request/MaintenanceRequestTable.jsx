import {
  Button,
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

export default function MaintenanceRequestTable() {
  const maintenanceRequests = useMaintenanceRequest(
    (state) => state.maintenanceRequests
  )

  if (maintenanceRequests.length < 1) {
    return (
      <Text className='text-center'>No existen solicitudes pendientes</Text>
    )
  }

  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableHeaderCell>Máquina</TableHeaderCell>
          <TableHeaderCell>Descripción</TableHeaderCell>
          <TableHeaderCell className='text-center'>Creado</TableHeaderCell>
          <TableHeaderCell className='text-center'>Acciones</TableHeaderCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {maintenanceRequests.map(
          ({ id, machine, description, createdAt }, index) => (
            <TableRow key={id} className={index % 2 === 0 && 'bg-gray-200/60'}>
              <TableCell>{machine.name}</TableCell>
              <TableCell className='whitespace-normal min-w-[320px]'>
                {description}
              </TableCell>
              <TableCell className='text-center'>
                {dateLocaleString(createdAt, true)}
              </TableCell>
              <TableCell className='text-center'>
                <Button color='amber'>
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
