import { Badge, Button, Card, Flex, Subtitle, Text } from '@tremor/react'
import ScheduleTable from './ScheduleTable'
import { utils, writeFileXLSX } from 'xlsx'
import {
  WORK_ORDER_ACTIVITY_TYPE_VALUES_MAP,
  WORK_ORDER_STATE_VALUES_MAP,
} from '../../schemas/workOrder'

export default function OnSchedule({
  workOrdersOnSchedule,
  firstWeekDay,
  deleteWorkOrderById,
  updateWorkOrder,
  weeks,
  strict,
}) {
  const handleClick = () => {
    const [month, day, year] = firstWeekDay
      .toLocaleDateString('en-US')
      .split('/')
      .map(Number)

    const bookType = 'xlsx'
    const fileName = `Planificacion_Semana${weeks}_${year}.${bookType}`

    let sheet = []

    const mo = new Date(year, month - 1, day + 1).toLocaleDateString()
    const tu = new Date(year, month - 1, day + 2).toLocaleDateString()
    const we = new Date(year, month - 1, day + 3).toLocaleDateString()
    const th = new Date(year, month - 1, day + 4).toLocaleDateString()
    const fr = new Date(year, month - 1, day + 5).toLocaleDateString()
    const sa = new Date(year, month - 1, day + 6).toLocaleDateString()

    workOrdersOnSchedule.forEach((workOrder) => {
      const schedule = new Date(workOrder.daySchedule)
      const hour = schedule.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        hourCycle: 'h12',
      })
      const forCompare = schedule.toLocaleDateString()

      sheet = [
        ...sheet,
        {
          Máquina: workOrder.machine.name,
          'O.T.': workOrder.code,
          Actividades: workOrder.activityName,
          'Tipo de actividad':
            WORK_ORDER_ACTIVITY_TYPE_VALUES_MAP[workOrder.activityType],
          [`LUNES ${mo}`]: mo === forCompare ? hour : '',
          [`MARTES ${tu}`]: tu === forCompare ? hour : '',
          [`MIERCOLES ${we}`]: we === forCompare ? hour : '',
          [`JUEVES ${th}`]: th === forCompare ? hour : '',
          [`VIERNES ${fr}`]: fr === forCompare ? hour : '',
          [`SABADO ${sa}`]: sa === forCompare ? hour : '',
          Estado: WORK_ORDER_STATE_VALUES_MAP[workOrder.state],
        },
      ]
    })

    writeFileXLSX(
      {
        SheetNames: ['Planificación'],
        Sheets: {
          Planificación: utils.json_to_sheet(sheet),
        },
      },
      fileName,
      { bookType, type: 'array' }
    )
  }

  return (
    <Card>
      <Flex className='gap-4 max-md:flex-col max-md:items-end mb-6'>
        <Flex className='gap-2' justifyContent='start' alignItems='center'>
          <Subtitle className='text-slate-900'>Semana {weeks}</Subtitle>
          <Badge className='w-10' color='slate'>
            {workOrdersOnSchedule.length}
          </Badge>
        </Flex>
        {workOrdersOnSchedule.length > 0 && (
          <Button color='amber' onClick={handleClick}>
            Ver más detalles
          </Button>
        )}
      </Flex>
      {workOrdersOnSchedule.length ? (
        <ScheduleTable
          deleteWorkOrderById={deleteWorkOrderById}
          firstWeekDay={firstWeekDay}
          updateWorkOrder={updateWorkOrder}
          workOrdersOnSchedule={workOrdersOnSchedule}
          strict={strict}
        />
      ) : (
        <Text className='text-center'>
          No existen órdenes de trabajo en la planificación
        </Text>
      )}
    </Card>
  )
}
