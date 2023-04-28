import { Button } from '@tremor/react'
import { useIndicators } from '../../store/indicators'
import { utils, writeFileXLSX } from 'xlsx'

export default function ExcelExport() {
  const [date, { totalHours, groups }] = useIndicators((state) => [
    state.date,
    state.indicators,
  ])

  const doneWorkOrders = groups
    ?.map(({ workOrders, ...rest }) => {
      return {
        ...rest,
        workOrders: workOrders.filter(({ state }) => state === 'DONE'),
      }
    })
    .filter(({ workOrders }) => workOrders.length > 0)

  const handleExport = () => {
    const allWorkOrders = groups?.flatMap(({ workOrders }) => workOrders)
    const done = [
      ...doneWorkOrders.flatMap(({ name, workOrders }) => {
        const mappedWorkOrders = Object.entries(
          workOrders.reduce((acc, value) => {
            const { activityName, totalHours } = value
            const group = acc[activityName] ?? {
              'OT Ejecutadas': 0,
              'Horas de trabajo': 0,
            }
            acc[activityName] = {
              'OT Ejecutadas': group['OT Ejecutadas'] + 1,
              'Horas de trabajo': group['Horas de trabajo'] + totalHours,
            }
            return acc
          }, {})
        ).map(([activityName, value]) => ({
          Actividad: activityName,
          ...value,
        }))
        return [{ Maquina: name }, ...mappedWorkOrders]
      }),
      {
        Actividad: 'Total general',
        'OT Ejecutadas': doneWorkOrders.flatMap(({ workOrders }) => workOrders)
          .length,
        'Horas de trabajo': totalHours,
      },
    ]
    const planned = [
      ...groups?.flatMap(({ name, workOrders }) => {
        const mappedWorkOrders = Object.entries(
          workOrders.reduce((acc, value) => {
            const { activityName } = value
            const group = acc[activityName] ?? {
              'OT Planificadas': 0,
            }
            acc[activityName] = {
              'OT Planificadas': group['OT Planificadas'] + 1,
            }
            return acc
          }, {})
        ).map(([activityName, value]) => ({
          Actividad: activityName,
          ...value,
        }))
        return [
          {
            Maquina: name,
            Actividad: '',
            'OT Planificadas': workOrders.length,
          },
          ...mappedWorkOrders,
        ]
      }),
      {
        Actividad: 'Total general',
        'OT Planificadas': allWorkOrders.length,
      },
    ]
    const bookType = 'xlsx'
    const fileName = `Indicadores_${date}.${bookType}`

    writeFileXLSX(
      {
        SheetNames: ['Ejecutadas', 'Planificadas'],
        Sheets: {
          Ejecutadas: utils.json_to_sheet(done),
          Planificadas: utils.json_to_sheet(planned),
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
