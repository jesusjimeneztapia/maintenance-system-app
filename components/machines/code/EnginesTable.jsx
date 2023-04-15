import Link from 'next/link'
import EngineRow from './EngineRow'
import {
  Card,
  Flex,
  Subtitle,
  Table,
  TableBody,
  TableHead,
  TableHeaderCell,
  TableRow,
  Text,
} from '@tremor/react'

export default function EnginesTable({ engines, machineCode }) {
  return (
    <Card>
      <Flex className='gap-6' flexDirection='col' alignItems=''>
        <Flex className='max-sm:flex-col max-sm:items-start gap-2'>
          <Subtitle>Motores Eléctricos</Subtitle>
          <Link
            href={{
              pathname: '/machines/[code]/add-engine',
              query: { code: machineCode },
            }}
          >
            <a className='max-sm:self-end inline-flex items-center justify-center px-5 py-2 text-sm font-medium text-slate-500 rounded-lg bg-slate-100 hover:text-slate-900 hover:bg-slate-200'>
              <span className='w-full'>Agregar motor</span>
            </a>
          </Link>
        </Flex>
        {engines.length > 0 ? (
          <Table>
            <TableHead>
              <TableRow>
                <TableHeaderCell>Código</TableHeaderCell>
                <TableHeaderCell>Función</TableHeaderCell>
                <TableHeaderCell className='text-center'>Marca</TableHeaderCell>
                <TableHeaderCell className='text-center'>Tipo</TableHeaderCell>
                <TableHeaderCell className='text-center'>
                  P [Hp]
                </TableHeaderCell>
                <TableHeaderCell className='text-center'>
                  P [KW]
                </TableHeaderCell>
                <TableHeaderCell className='text-center'>
                  Tensión [V]
                </TableHeaderCell>
                <TableHeaderCell className='text-center'>I [A]</TableHeaderCell>
                <TableHeaderCell className='text-center'>rpm</TableHeaderCell>
                <TableHeaderCell className='text-center'>cos</TableHeaderCell>
                <TableHeaderCell className='text-center'>n</TableHeaderCell>
                <TableHeaderCell className='text-center'>
                  f [Hz]
                </TableHeaderCell>
                <TableHeaderCell className='text-center'>
                  N° POLOS
                </TableHeaderCell>
                <TableHeaderCell className='text-center'>IP</TableHeaderCell>
                <TableHeaderCell className='text-center'>
                  Aranque
                </TableHeaderCell>
                <TableHeaderCell className='text-center'>
                  Acciones
                </TableHeaderCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {engines.map((engine) => (
                <EngineRow
                  key={engine.code}
                  engine={engine}
                  machineCode={machineCode}
                />
              ))}
            </TableBody>
          </Table>
        ) : (
          <Text className='text-center'>No existen motores</Text>
        )}
      </Flex>
    </Card>
  )
}
