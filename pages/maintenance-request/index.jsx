import {
  Badge,
  Button,
  Card,
  Flex,
  Subtitle,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeaderCell,
  TableRow,
  Title,
} from '@tremor/react'
import Head from 'next/head'
import ClipboardDocumentCheck from '../../components/icons/ClipboardDocumentCheck'
import { dateLocaleString } from '../../libs/date'

const MAINTENANCE_REQUEST = [
  {
    id: 1,
    description:
      'Se necesita solicitud de mantenimiento de la máquina ABLANDOR porque tiene problemas con con su motor...',
    createdAt: '2023-05-05',
    machine: { name: 'ABLANDADOR' },
  },
  {
    id: 2,
    description: 'La máquina ACUMULADOR DE VAPOR requiere mantenimiento',
    createdAt: '2023-05-03',
    machine: { name: 'ACUMULADOR DE VAPOR' },
  },
  {
    id: 3,
    description:
      'La máquina BISELADORA #1 - 50 CM requiere mantenimiento urgente porque uno de sus motores necesita aceite...',
    createdAt: '2023-04-28',
    machine: { name: 'BISELADORA #1 - 50 CM' },
  },
  {
    id: 4,
    description: 'Se requiere mantenimiento',
    createdAt: '2023-04-28',
    machine: { name: 'BISELADORA #2 - 42 CM' },
  },
  {
    id: 5,
    description: 'Se requiere mantenimiento',
    createdAt: '2023-04-26',
    machine: { name: 'BISELADORA #2 - 42 CM' },
  },
  {
    id: 6,
    description: 'Se requiere mantenimiento',
    createdAt: '2023-04-14',
    machine: { name: 'BISELADORA #2 - 42 CM' },
  },
  {
    id: 7,
    description: 'Se requiere mantenimiento',
    createdAt: '2023-04-10',
    machine: { name: 'BISELADORA #2 - 42 CM' },
  },
  {
    id: 8,
    description: 'Se requiere mantenimiento',
    createdAt: '2023-04-10',
    machine: { name: 'BISELADORA #2 - 42 CM' },
  },
  {
    id: 9,
    description: 'Se requiere mantenimiento',
    createdAt: '2023-04-08',
    machine: { name: 'BISELADORA #2 - 42 CM' },
  },
  {
    id: 10,
    description: 'Se requiere mantenimiento',
    createdAt: '2023-04-06',
    machine: { name: 'BISELADORA #2 - 42 CM' },
  },
  {
    id: 11,
    description: 'Se requiere mantenimiento',
    createdAt: '2023-04-04',
    machine: { name: 'BISELADORA #2 - 42 CM' },
  },
]

export default function MaintenanceRequestPage() {
  return (
    <>
      <Head>
        <title>Solicitudes de mantenimiento | TECNOPOR S.A.</title>
      </Head>
      <Flex className='gap-2 mb-5 max-sm:flex-col max-sm:items-end'>
        <Title className='max-sm:w-full'>Solicitudes de mantenimiento</Title>
        <Button color='rose'>Crear solicitud</Button>
      </Flex>
      <Card>
        <Flex className='gap-2 mb-6' justifyContent='start'>
          <Subtitle>Solicitudes pendientes</Subtitle>
          <Badge color='gray'>{MAINTENANCE_REQUEST.length}</Badge>
        </Flex>
        <Table>
          <TableHead>
            <TableRow>
              <TableHeaderCell>Máquina</TableHeaderCell>
              <TableHeaderCell>Descripción</TableHeaderCell>
              <TableHeaderCell className='text-center'>Creado</TableHeaderCell>
              <TableHeaderCell className='text-center'>
                Acciones
              </TableHeaderCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {MAINTENANCE_REQUEST.map(
              ({ id, machine, description, createdAt }, index) => (
                <TableRow
                  key={id}
                  className={index % 2 === 0 && 'bg-gray-200/60'}
                >
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
      </Card>
    </>
  )
}
