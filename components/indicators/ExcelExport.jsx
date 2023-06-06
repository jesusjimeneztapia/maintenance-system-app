import { Button } from '@tremor/react'
import { useIndicators } from '../../store/indicators'
import { utils, writeFileXLSX } from 'xlsx'

export default function ExcelExport() {
  const [date, { workOrders }] = useIndicators((state) => [
    state.date,
    state.indicators,
  ])

  const handleExport = () => {
    let doneHours = 0
    const doneWorkOrders = workOrders.filter(({ done }) => done)

    const doneWorkOrdersByMachine = doneWorkOrders.reduce((acc, value) => {
      const {
        machineCode,
        activityName,
        totalHours,
        machine: { name: machineName },
      } = value
      const machine = acc[machineCode] ?? { machineName, activities: {} }
      const { activities } = machine
      const activity = activities[activityName] ?? { count: 0, totalHours: 0 }
      activity.count += 1
      activity.totalHours += totalHours
      doneHours += totalHours
      return {
        ...acc,
        [machineCode]: {
          ...machine,
          activities: { ...activities, [activityName]: activity },
        },
      }
    }, {})

    let doneSheet = []
    Object.values(doneWorkOrdersByMachine).forEach(
      ({ machineName, activities }) => {
        doneSheet = [
          ...doneSheet,
          { Máquina: machineName },
          ...Object.entries(activities).map(
            ([activityName, { count, totalHours }]) => ({
              Actividad: activityName,
              'OT Ejecutadas': count,
              'Horas de trabajo': totalHours,
            })
          ),
        ]
      }
    )
    doneSheet = [
      ...doneSheet,
      {
        Actividad: 'Total general',
        'OT Ejecutadas': doneWorkOrders.length,
        'Horas de trabajo': doneHours,
      },
    ]

    const workOrdersByMachine = workOrders.reduce((acc, value) => {
      const {
        machineCode,
        activityName,
        stores,
        machine: { name: machineName },
      } = value

      const machine = acc[machineCode] ?? {
        machineName,
        count: 0,
        stores,
        activities: {},
      }
      machine.count += 1
      const { activities } = machine
      const activity = activities[activityName] ?? { count: 0 }
      activity.count += 1

      return {
        ...acc,
        [machineCode]: {
          ...machine,
          activities: { ...activities, [activityName]: activity },
        },
      }
    }, {})

    let plannedSheet = []
    Object.values(workOrdersByMachine).forEach(
      ({ machineName, count, activities }) => {
        plannedSheet = [
          ...plannedSheet,
          { Máquina: machineName, Actividad: '', 'OT Planificadas': count },
          ...Object.entries(activities).map(([activityName, { count }]) => ({
            Actividad: activityName,
            'OT Planificadas': count,
          })),
        ]
      }
    )
    plannedSheet = [
      ...plannedSheet,
      { Actividad: 'Total general', 'OT Planificadas': workOrders.length },
    ]

    const stores = workOrders.reduce((acc, value) => {
      const {
        code,
        activityName,
        stores,
        machine: { code: machineCode, name: machineName },
      } = value
      if (stores.length < 1) {
        return { ...acc }
      }
      const machine = acc[machineCode] ?? { machineName, workOrders: [] }
      const { workOrders } = machine
      const workOrder = {
        code,
        activityName,
        stores: stores.map(({ amount, store: { name } }) => ({ name, amount })),
      }
      return {
        ...acc,
        [machineCode]: { ...machine, workOrders: [...workOrders, workOrder] },
      }
    }, {})
    const storesSheet = Object.values(stores).flatMap(
      ({ machineName, workOrders }) => [
        { Máquina: machineName, Nro: workOrders.length },
        ...workOrders.flatMap(({ code, activityName, stores }) => [
          {
            Nro: code,
            Actividad: activityName,
            Repuesto: stores.length,
          },
          ...stores.map(({ name, amount }) => ({
            Repuesto: name,
            Cantidad: amount,
          })),
        ]),
      ]
    )

    const [year, month, day] = date.split('-')
    const bookType = 'xlsx'
    const fileName = `Indicadores_${+day}-${+month}-${+year}.${bookType}`

    writeFileXLSX(
      {
        SheetNames: ['Planificadas', 'Ejecutadas', 'Repuestos'],
        Sheets: {
          Planificadas: utils.json_to_sheet(plannedSheet),
          Ejecutadas: utils.json_to_sheet(doneSheet),
          Repuestos: utils.json_to_sheet(storesSheet),
        },
      },
      fileName,
      { bookType, type: 'array' }
    )
  }

  return (
    <Button color='amber' onClick={handleExport}>
      Ver más detalles
    </Button>
  )
}
