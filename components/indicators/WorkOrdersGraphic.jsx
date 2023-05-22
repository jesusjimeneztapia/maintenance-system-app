import { BarChart, Card, Flex, Subtitle } from '@tremor/react'
import { useIndicators } from '../../store/indicators'
import ExcelExport from './ExcelExport'

export default function WorkOrdersGraphic() {
  const workOrders = useIndicators((state) => state.indicators.workOrders)
  const groups = workOrders.reduce((acc, value) => {
    const {
      machine: { name },
      done,
    } = value
    const machine = acc[name] || { Planificadas: 0, Ejecutadas: 0 }
    machine.Planificadas += 1
    if (done) {
      machine.Ejecutadas += 1
    }
    return { ...acc, [name]: machine }
  }, {})
  const data = Object.entries(groups).map(([name, rest]) => ({ name, ...rest }))

  return (
    <Card>
      <Flex
        className='mb-3 gap-3 max-sm:flex-col max-sm:items-end'
        alignItems='center'
      >
        <Subtitle className='text-slate-900 w-full'>
          Gráfica órdenes de trabajo por máquina
        </Subtitle>
        <ExcelExport />
      </Flex>
      <BarChart
        data={data}
        index='name'
        categories={['Planificadas', 'Ejecutadas']}
        colors={['rose', 'amber']}
        valueFormatter={(number) => number}
        yAxisWidth={32}
      />
    </Card>
  )
}
