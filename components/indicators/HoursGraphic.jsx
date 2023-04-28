import { BarChart, Card, Flex, Subtitle } from '@tremor/react'
import { useIndicators } from '../../store/indicators'
import ExcelExport from './ExcelExport'

const dataFormatter = (number) => {
  return `${number}%`
}

export default function HoursGraphic() {
  const { totalHours, groups } = useIndicators((state) => state.indicators)
  const data = groups?.map(({ name, hours }) => ({
    name,
    'Horas de trabajo':
      totalHours > 0 ? Math.round((hours / totalHours) * 100) : totalHours,
  }))

  return (
    <Card>
      <Flex
        className='mb-3 gap-3 max-sm:flex-col max-sm:items-end'
        alignItems='center'
      >
        <Subtitle className='text-slate-900 w-full'>
          Gráfica horas de trabajo por máquina
        </Subtitle>
        <ExcelExport />
      </Flex>

      <BarChart
        data={data}
        index='name'
        categories={['Horas de trabajo']}
        colors={['amber']}
        valueFormatter={dataFormatter}
        yAxisWidth={32}
      />
    </Card>
  )
}
