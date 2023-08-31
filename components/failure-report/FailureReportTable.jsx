import {
  Button,
  Flex,
  Icon,
  Subtitle,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeaderCell,
  TableRow,
  Text,
  Title,
} from '@tremor/react'
import { useFailureReport } from '../../store/failureReport'
import Image from 'next/image'
import ClipboardDocumentListSolidIcon from '../icons/ClipboardDocumentListSolidIcon'
import { dateLocaleString } from '../../libs/date'
import ClipboardDocumentCheck from '../icons/ClipboardDocumentCheck'
import { useToast } from '../../store/toast'
import { verifyFailureReport } from '../../services/failureReportServices'
import { SYSTEM_FAILED_STATE_VALUES_MAP } from '../../schemas/failureReport'

export default function FailureReportTable() {
  const role = global.localStorage?.getItem('role')
  const failureReports = useFailureReport((state) => state.failureReports)
  const removeFailureReport = useFailureReport(
    (state) => state.removeFailureReport
  )
  const [request, reset, show] = useToast((state) => [
    state.request,
    state.reset,
    state.show,
  ])

  if (failureReports.length < 1) {
    return <Text className='text-center'>No existen fallas reportadas</Text>
  }

  const verify = async (id) => {
    show({
      autoClose: false,
      close: true,
      color: 'info',
      position: 'center',
      children: `El reporte ${id} está siendo verificada...`,
    })
    const response = await request(async () => verifyFailureReport(id), {
      autoClose: true,
      close: true,
      color: 'success',
      children: `El reporte de falla ${id} fue verificada exitósamente`,
    })
    if (response) {
      const { id } = response
      removeFailureReport(id)
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
            Verificación del reporte de falla
            <span className='font-medium'>{` ${id}`}</span>
          </Subtitle>
          <Text className='text-inherit'>
            ¿Está seguro de hacer la verificación? Se eliminará de la lista de
            fallas reportadas.
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
          {role === 'admin' && (
            <TableHeaderCell className='text-center'>Verificar</TableHeaderCell>
          )}
        </TableRow>
      </TableHead>
      <TableBody>
        {failureReports.map(
          (
            {
              id,
              image,
              machine,
              systemFailedState,
              description,
              stopHours,
              operatorName,
              createdAt,
            },
            index
          ) => (
            <TableRow key={id} className={index % 2 === 0 && 'bg-gray-200/60'}>
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
              <TableCell>
                <Title>{machine.name}</Title>
                {SYSTEM_FAILED_STATE_VALUES_MAP[systemFailedState]}
              </TableCell>
              <TableCell className='whitespace-normal max-md:min-w-[320px] max-lg:min-w-[512px] max-xl:min-w-[576px] max-2xl:min-w-[672px]'>
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
              {role === 'admin' && (
                <TableCell className='text-center'>
                  <Button color='amber' onClick={handleRemove(id)}>
                    <ClipboardDocumentCheck className='w-5 h-5' />
                  </Button>
                </TableCell>
              )}
            </TableRow>
          )
        )}
      </TableBody>
    </Table>
  )
}
