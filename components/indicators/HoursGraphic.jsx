import {
  BarChart,
  Button,
  Card,
  Col,
  Flex,
  Grid,
  List,
  ListItem,
  Subtitle,
} from '@tremor/react'
import { useIndicators } from '../../store/indicators'
import { utils, writeFileXLSX } from 'xlsx'
import { WORK_ORDER_ACTIVITY_TYPE_VALUES_MAP } from '../../schemas/workOrder'

const dataFormatter = (number) => {
  return `${number} %`
}

export default function HoursGraphic() {
  const date = useIndicators((state) => state.date)
  const { workOrders, calendarMonth, failureReports } = useIndicators(
    (state) => state.indicators
  )

  const maintenanceTime = calendarMonth.map(({ id, name }) => {
    const hours = workOrders
      .filter(
        ({ done, activityType, machine: { areaId } }) =>
          areaId === id &&
          done &&
          (activityType === 'PLANNED_PREVENTIVE' ||
            activityType === 'CORRECTIVE')
      )
      .reduce((acc, value) => acc + value.totalHours, 0)

    return {
      id,
      name,
      hours,
    }
  })

  const operatingTime = calendarMonth.map(({ id, name, time }) => {
    const preventiveTime = workOrders
      .filter(
        ({ done, activityType, machine: { areaId } }) =>
          areaId === id && done && activityType === 'PLANNED_PREVENTIVE'
      )
      .reduce((acc, value) => acc + value.totalHours, 0)

    return {
      id,
      name,
      calendarTime: time,
      operatingTime: time - preventiveTime,
      preventiveTime,
    }
  })

  const netOperatingTime = calendarMonth.map(({ id, name }) => {
    const operatingTimeHours = operatingTime.find(
      (op) => op.id === id
    ).operatingTime
    const correctiveTime = workOrders
      .filter(
        ({ done, activityType, machine: { areaId } }) =>
          areaId === id && done && activityType === 'CORRECTIVE'
      )
      .reduce((acc, value) => acc + value.totalHours, 0)

    return {
      id,
      name,
      operatingTime: operatingTimeHours,
      netOperatingTime: operatingTimeHours - correctiveTime,
      correctiveTime,
    }
  })

  const reportsTime = calendarMonth.map(({ id, name }) => {
    const netOperatingTimeHours = netOperatingTime.find(
      (op) => op.id === id
    ).netOperatingTime

    const stopHours =
      failureReports.find(({ areaId }) => areaId === id)?.stopHours ?? 0

    return {
      id,
      name,
      netOperatingTime: netOperatingTimeHours,
      workTime: netOperatingTimeHours - stopHours,
      stopHours,
    }
  })

  const availability = calendarMonth.map(({ id, name, time }) => {
    const workTime = reportsTime.find((op) => op.id === id).workTime

    return {
      id,
      name,
      workTime,
      calendarTime: time,
      availability: Math.round((workTime / time) * 1000) / 10,
    }
  })

  const handleExport = () => {
    const bookType = 'xlsx'
    const fileName = `Disponibilidad_${date}.${bookType}`

    writeFileXLSX(
      {
        SheetNames: [
          'Ordenes de trabajo',
          'Horas de mantenimiento',
          'Tiempo operativo',
          'Tiempo neto operativo',
          'Reportes de falla',
          'Disponibilidad',
        ],
        Sheets: {
          'Ordenes de trabajo': utils.json_to_sheet(
            workOrders.map(
              ({
                code,
                totalHours,
                activityName,
                activityType,
                machine: { name },
                done,
              }) => ({
                Codigo: code,
                Maquina: name,
                actividad: activityName,
                'Tipo de actividad':
                  WORK_ORDER_ACTIVITY_TYPE_VALUES_MAP[activityType],
                'Total de horas': done ? totalHours : undefined,
                Finalizado: done ? 'Si' : 'No',
              })
            )
          ),
          'Horas de mantenimiento': utils.json_to_sheet(
            maintenanceTime.map(({ name, hours }) => ({
              Area: name,
              'Horas de mantenimiento': hours,
            }))
          ),
          'Tiempo operativo': utils.json_to_sheet(
            operatingTime.map(
              ({ name, calendarTime, operatingTime, preventiveTime }) => ({
                Area: name,
                'Tiempo calendario': calendarTime,
                'Tiempo operativo': operatingTime,
                'Mantenimiento preventivo': preventiveTime,
              })
            )
          ),
          'Tiempo neto operativo': utils.json_to_sheet(
            netOperatingTime.map(
              ({ name, operatingTime, netOperatingTime, correctiveTime }) => ({
                Area: name,
                'Tiempo operativo': operatingTime,
                'Tiempo neto operativo': netOperatingTime,
                'Mantenimiento correctivo': correctiveTime,
              })
            )
          ),
          'Reportes de falla': utils.json_to_sheet(
            reportsTime.map(
              ({ name, netOperatingTime, workTime, stopHours }) => ({
                Area: name,
                'Tiempo neto operativo': netOperatingTime,
                'Horas de trabajo': workTime,
                'Horas detenidas': stopHours,
              })
            )
          ),
          Disponibilidad: utils.json_to_sheet(
            availability.map(
              ({ name, calendarTime, workTime, availability }) => ({
                Area: name,
                'Horas de trabajo': workTime,
                'Tiempo calendario': calendarTime,
                Disponibilidad: `${availability} %`,
              })
            )
          ),
        },
      },
      fileName,
      { bookType, type: 'array' }
    )
  }

  return (
    <Grid className='gap-5 w-full' numCols={12}>
      <Col className='col-span-12 xl:col-span-6 2xl:xl:col-span-4'>
        <Card>
          <Subtitle className='text-slate-900 mb-3'>Disponiblidad</Subtitle>
          <List>
            {availability.map(({ name, availability }) => (
              <ListItem key={name}>
                <span>{name}</span>
                <span>{availability}%</span>
              </ListItem>
            ))}
          </List>
        </Card>
      </Col>
      <Col className='col-span-12 xl:col-span-6 2xl:xl:col-span-8'>
        <Card>
          <Flex
            className='mb-3 gap-3 max-sm:flex-col max-sm:items-end'
            alignItems='center'
          >
            <Subtitle className='text-slate-900 w-full'>
              Gráfica de Disponibilidad
            </Subtitle>
            <Button color='amber' onClick={handleExport}>
              Ver más detalles
            </Button>
          </Flex>

          <BarChart
            data={availability.map(({ name, availability }) => ({
              name,
              Disponibilidad: availability,
            }))}
            index='name'
            categories={['Disponibilidad']}
            colors={['amber']}
            valueFormatter={dataFormatter}
            yAxisWidth={38}
          />
        </Card>
      </Col>
    </Grid>
  )
}
