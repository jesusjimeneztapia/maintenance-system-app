import { useHistorical } from '../../store/historical'
import { useEffect, useState } from 'react'
import {
  getHistorical,
  getHistoricalSummary,
} from '../../services/historicalServices'
import { useToast } from '../../store/toast'
import Spinner from '../Spinner'
import {
  Badge,
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
import { dateLocaleString } from '../../libs/date'
import { utils, writeFileXLSX } from 'xlsx'

function useHistoricalTable() {
  const request = useToast((state) => state.request)
  const [loading, setLoading] = useState(false)
  const [historicalSummary, setHistoricalSummary] = useState(null)
  const selectedMachine = useHistorical((state) => state.selectedMachine)

  useEffect(() => {
    if (selectedMachine) {
      setLoading(true)
      request(async () =>
        getHistoricalSummary({ machineCode: selectedMachine })
      )
        .then((historical) => setHistoricalSummary(historical))
        .finally(() => setLoading(false))
    }
  }, [selectedMachine, request])

  const handleClick = async () => {
    const historical = await request(async () =>
      getHistorical({ machineCode: selectedMachine })
    )
    if (historical) {
      const { code, name, workOrders, date } = historical
      const bookType = 'xlsx'
      const fileName = `Historicos_${name}_${code}_${date}.${bookType}`

      writeFileXLSX(
        {
          SheetNames: ['Órdenes de trabajo'],
          Sheets: { 'Órdenes de trabajo': utils.json_to_sheet(workOrders) },
        },
        fileName,
        { bookType, type: 'array' }
      )
    }
  }

  return { historicalSummary, loading, selectedMachine, handleClick }
}

export default function HistoricalTable() {
  const { historicalSummary, loading, selectedMachine, handleClick } =
    useHistoricalTable()

  if (loading) {
    return (
      <section className='flex justify-center'>
        <Spinner />
      </section>
    )
  }

  if (historicalSummary?.length < 1) {
    return <Text className='text-center'>No tiene históricos</Text>
  }

  return (
    <>
      {selectedMachine === '' ? (
        <Text className='text-center'>Seleccione una máquina</Text>
      ) : (
        <>
          <Flex>
            <Flex className='gap-2' justifyContent='start'>
              <Subtitle>Últimos históricos</Subtitle>
              <Badge className='w-10' color='slate'>
                {historicalSummary?.length}
              </Badge>
            </Flex>
            <Button color='amber' onClick={handleClick}>
              Ver más
            </Button>
          </Flex>
          <Table className='mt-6'>
            <TableHead>
              <TableRow>
                <TableHeaderCell>N°</TableHeaderCell>
                <TableHeaderCell>Nombre de actividad</TableHeaderCell>
                <TableHeaderCell className='text-center'>
                  Descripción de actividad
                </TableHeaderCell>
                <TableHeaderCell className='text-center'>
                  Fecha fin
                </TableHeaderCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {historicalSummary?.map(
                (
                  { code, activityName, activityDescription, endDate },
                  index
                ) => (
                  <TableRow
                    className={`${index % 2 === 0 && 'bg-slate-200/60'}`}
                    key={code}
                  >
                    <TableCell>{code}</TableCell>
                    <TableCell className='whitespace-normal max-md:min-w-[320px] max-lg:min-w-[512px] max-xl:min-w-[576px] max-2xl:min-w-[672px]'>
                      {activityName}
                    </TableCell>
                    <TableCell className='whitespace-normal max-md:min-w-[320px] max-lg:min-w-[512px] max-xl:min-w-[576px] max-2xl:min-w-[672px]'>
                      {activityDescription}
                    </TableCell>
                    <TableCell className='text-center'>
                      {dateLocaleString(endDate, true)}
                    </TableCell>
                  </TableRow>
                )
              )}
            </TableBody>
          </Table>
        </>
      )}
    </>
  )
}
