import {
  BarChart,
  Button,
  Card,
  Flex,
  List,
  ListItem,
  Subtitle,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeaderCell,
  TableRow,
  Title,
} from '@tremor/react'
import Input from '../../components/Input'

const chartdata = [
  {
    name: 'INFRAESTRUCTURA',
    'Horas de trabajo': 32,
  },
  {
    name: 'TAMIZADOR',
    'Horas de trabajo': 25,
  },
  {
    name: 'CALDERA GONELLA',
    'Horas de trabajo': 14,
  },
  {
    name: 'PRE EXPANSORA',
    'Horas de trabajo': 12,
  },
  {
    name: 'VIBRADORA AMARILLA #1',
    'Horas de trabajo': 8,
  },
  {
    name: 'COMPRESOR SRP 3030',
    'Horas de trabajo': 2,
  },
]
const dataFormatter = (number) => {
  return `${number}%`
}

const chartdata2 = [
  {
    name: 'INFRAESTRUCTURA',
    Planificadas: 11,
    Ejecutadas: 10,
  },
  {
    name: 'TAMIZADOR',
    Planificadas: 3,
    Ejecutadas: 3,
  },
  {
    name: 'CALDERA GONELLA',
    Planificadas: 5,
    Ejecutadas: 5,
  },
  {
    name: 'PRE EXPANSORA',
    Planificadas: 1,
    Ejecutadas: 1,
  },
  {
    name: 'VIBRADORA AMARILLA #1',
    Planificadas: 1,
    Ejecutadas: 1,
  },
  {
    name: 'COMPRESOR SRP 3030',
    Planificadas: 4,
    Ejecutadas: 4,
  },
]

export default function IndicatorsPage() {
  return (
    <>
      <Flex
        className='mb-5 gap-2 max-sm:flex-col max-sm:items-end'
        alignItems='center'
      >
        <Title className='w-full'>Indicadores</Title>
        <Flex className='w-fit gap-2' justifyContent='end' alignItems=''>
          <Input type='date' defaultValue='2023-04-27' />
          <Button color='amber'>Filtrar</Button>
        </Flex>
      </Flex>
      <Flex className='gap-5' flexDirection='col'>
        <Flex className='gap-5 max-sm:flex-col' alignItems='start'>
          <Card>
            <Subtitle className='text-slate-900 mb-3'>Cumplimiento</Subtitle>
            <List>
              <ListItem>
                <span>Indicador de mantenimiento</span>
                <span>94%</span>
              </ListItem>
              <ListItem>
                <span>Órdenes de trabajo ejecutadas</span>
                <span>34</span>
              </ListItem>
              <ListItem>
                <span>Órdenes de trabajo planificadas</span>
                <span>36</span>
              </ListItem>
              <ListItem>
                <span>Horas trabajadas</span>
                <span>112</span>
              </ListItem>
            </List>
          </Card>
          <Card>
            <Subtitle className='text-slate-900 mb-3'>
              Órdenes de trabajo
            </Subtitle>
            <Table>
              <TableHead>
                <TableRow>
                  <TableHeaderCell className='pl-0 py-2'>Tipo</TableHeaderCell>
                  <TableHeaderCell className='text-right py-2'>
                    Horas de trabajo
                  </TableHeaderCell>
                  <TableHeaderCell className='text-right pr-0 py-2'>
                    Número de órdenes
                  </TableHeaderCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell className='pl-0 py-2'>Correctivo</TableCell>
                  <TableCell className='text-right py-2'>2</TableCell>
                  <TableCell className='text-right pr-0 py-2'>1</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className='pl-0 py-2'>Preventivo</TableCell>
                  <TableCell className='text-right py-2'>110</TableCell>
                  <TableCell className='text-right pr-0 py-2'>33</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className='font-medium pl-0 py-2'>Total</TableCell>
                  <TableCell className='font-medium text-right py-2'>
                    112
                  </TableCell>
                  <TableCell className='font-medium text-right pr-0 py-2'>
                    34
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </Card>
        </Flex>

        <Card>
          <Flex
            className='mb-3 gap-3 max-sm:flex-col max-sm:items-end'
            alignItems='center'
          >
            <Subtitle className='text-slate-900 w-full'>
              Gráfica horas de trabajo por máquina
            </Subtitle>
            <Button color='amber'>Ver más detalles</Button>
          </Flex>
          <BarChart
            data={chartdata}
            index='name'
            categories={['Horas de trabajo']}
            colors={['amber']}
            valueFormatter={dataFormatter}
            layout='vertical'
            yAxisWidth={108}
          />
        </Card>
        <Card>
          <Flex
            className='mb-3 gap-3 max-sm:flex-col max-sm:items-end'
            alignItems='center'
          >
            <Subtitle className='text-slate-900 w-full'>
              Gráfica órdenes de trabajo por máquina
            </Subtitle>
            <Button color='amber'>Ver más detalles</Button>
          </Flex>
          <BarChart
            data={chartdata2}
            index='name'
            categories={['Planificadas', 'Ejecutadas']}
            colors={['rose', 'amber']}
            valueFormatter={(number) => number}
            layout='vertical'
            yAxisWidth={108}
          />
        </Card>
      </Flex>
    </>
  )
}
