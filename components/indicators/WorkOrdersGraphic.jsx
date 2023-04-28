import { BarChart, Card, Flex, Subtitle } from '@tremor/react'
import { useIndicators } from '../../store/indicators'
import ExcelExport from './ExcelExport'

export default function WorkOrdersGraphic() {
  const { groups } = useIndicators((state) => state.indicators)
  const data = groups?.map(({ name, workOrders }) => ({
    name,
    Planificadas: workOrders.length,
    Ejecutadas: workOrders.filter(({ state }) => state === 'DONE').length,
  }))

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
