import {
  Badge,
  Button,
  Card,
  Flex,
  Icon,
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
import { dateLocaleString } from '../../libs/date'
import ClipboardDocumentCheck from '../../components/icons/ClipboardDocumentCheck'
import Image from 'next/image'
import ClipboardDocumentListSolidIcon from '../../components/icons/ClipboardDocumentListSolidIcon'

const FAILURE_REPORTS = [
  {
    id: 11,
    systemFailedState: 'ELECTRIC',
    description: 'EL ABLANDADOR TUVO UNA FALLA...',
    operatorName: 'OPERADOR 1',
    stopHours: 2,
    image: {
      url: 'https://res.cloudinary.com/dqq56hkcl/image/upload/v1683335780/failure-reports/bscbxwacigx9sfosvlqk.jpg',
    },
    createdAt: '2023-05-05',
    machine: { name: 'ABLANDADOR' },
  },
  {
    id: 10,
    systemFailedState: 'MECHANIC',
    description: 'EL ACUMULADOR DE VAPOR FALLO MIENTRAS...',
    operatorName: 'OPERADOR 2',
    stopHours: 1,
    createdAt: '2023-05-03',
    machine: { name: 'ACUMULADOR DE VAPOR' },
  },
  {
    id: 9,
    systemFailedState: 'HYDRAULIC',
    description: 'TIENE MUCHAS FALLAS...',
    operatorName: 'OPERADOR 3',
    stopHours: 4,
    createdAt: '2023-04-28',
    machine: { name: 'BISELADORA #1 - 50 CM' },
  },
  {
    id: 8,
    systemFailedState: 'STEAM',
    description: 'CON FALLLAS',
    operatorName: 'OPERADOR 2',
    stopHours: 3,
    createdAt: '2023-04-28',
    machine: { name: 'BISELADORA #2 - 42 CM' },
  },
  {
    id: 7,
    systemFailedState: 'TIRE',
    description: 'CON FALLLAS',
    operatorName: 'OPERADOR 2',
    stopHours: 4,
    createdAt: '2023-04-26',
    machine: { name: 'BISELADORA #2 - 42 CM' },
  },
  {
    id: 6,
    systemFailedState: 'OTHER',
    description: 'CON FALLLAS',
    operatorName: 'OPERADOR 3',
    stopHours: 3,
    createdAt: '2023-04-14',
    machine: { name: 'BISELADORA #2 - 42 CM' },
  },
  {
    id: 5,
    systemFailedState: 'OTHER',
    description: 'CON FALLLAS',
    operatorName: 'OPERADOR 1',
    stopHours: 3,
    createdAt: '2023-04-10',
    machine: { name: 'BISELADORA #2 - 42 CM' },
  },
  {
    id: 4,
    systemFailedState: 'OTHER',
    description: 'CON FALLLAS',
    operatorName: 'OPERADOR 1',
    stopHours: 3,
    createdAt: '2023-04-10',
    machine: { name: 'BISELADORA #2 - 42 CM' },
  },
  {
    id: 3,
    systemFailedState: 'OTHER',
    description: 'CON FALLLAS',
    operatorName: 'OPERADOR 1',
    stopHours: 3,
    createdAt: '2023-04-08',
    machine: { name: 'BISELADORA #2 - 42 CM' },
  },
  {
    id: 2,
    systemFailedState: 'OTHER',
    description: 'CON FALLLAS',
    operatorName: 'OPERADOR 1',
    stopHours: 3,
    createdAt: '2023-04-06',
    machine: { name: 'BISELADORA #2 - 42 CM' },
  },
  {
    id: 1,
    systemFailedState: 'OTHER',
    description: 'CON FALLLAS',
    operatorName: 'OPERADOR 1',
    stopHours: 3,
    createdAt: '2023-04-04',
    machine: { name: 'BISELADORA #2 - 42 CM' },
  },
]

export default function FailureReportPage() {
  return (
    <>
      <Head>
        <title>Reportes de falla | TECNOPOR S.A.</title>
      </Head>
      <Flex className='gap-2 mb-5 max-sm:flex-col max-sm:items-end'>
        <Title className='max-sm:w-full'>Reportes de falla</Title>
        <Button color='rose'>Crear reporte</Button>
      </Flex>
      <Card>
        <Flex className='gap-2 mb-6' justifyContent='start'>
          <Subtitle>Fallas reportadas</Subtitle>
          <Badge color='gray'>{FAILURE_REPORTS.length}</Badge>
        </Flex>
        <Table>
          <TableHead>
            <TableRow>
              <TableHeaderCell>Imagen</TableHeaderCell>
              <TableHeaderCell className='text-center'>Id</TableHeaderCell>
              <TableHeaderCell>Máquina</TableHeaderCell>
              <TableHeaderCell>Descripción</TableHeaderCell>
              <TableHeaderCell className='text-center'>
                Horas detenidas
              </TableHeaderCell>
              <TableHeaderCell className='text-center'>
                Reportado por
              </TableHeaderCell>
              <TableHeaderCell className='text-center'>
                Verificar
              </TableHeaderCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {FAILURE_REPORTS.map(
              (
                {
                  id,
                  image,
                  machine,
                  description,
                  stopHours,
                  operatorName,
                  createdAt,
                },
                index
              ) => (
                <TableRow
                  key={id}
                  className={index % 2 === 0 && 'bg-gray-200/60'}
                >
                  <TableCell>
                    {image != null ? (
                      <Image
                        src={image.url}
                        alt={`${id}-${machine.name}`}
                        height={44}
                        width={80}
                        layout='fixed'
                        objectFit='cover'
                        objectPosition='center'
                        priority={index < 10}
                      />
                    ) : (
                      <Icon
                        className='w-20 flex justify-center'
                        icon={ClipboardDocumentListSolidIcon}
                        size='lg'
                        color='amber'
                        variant='solid'
                      />
                    )}
                  </TableCell>
                  <TableCell className='text-center'>{id}</TableCell>
                  <TableCell>{machine.name}</TableCell>
                  <TableCell className='whitespace-normal min-w-[320px]'>
                    {description}
                  </TableCell>
                  <TableCell className='text-center'>{`${stopHours} hr${
                    stopHours > 1 ? 's' : ''
                  }`}</TableCell>
                  <TableCell>
                    <Flex flexDirection='col'>
                      <span>{operatorName}</span>
                      <span>{dateLocaleString(createdAt, true)}</span>
                    </Flex>
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
