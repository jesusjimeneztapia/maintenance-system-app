import {
  Table,
  TableBody,
  TableHead,
  TableHeaderCell,
  TableRow,
} from '@tremor/react'
import MachineCard from './MachineCard'
import { useMachineList } from '../../store/machines'

export default function MachineList({ machines }) {
  const page = useMachineList((state) => state.page)

  return (
    <div>
      <Table>
        <TableHead>
          <TableRow>
            <TableHeaderCell>Imagen</TableHeaderCell>
            <TableHeaderCell>Máquina</TableHeaderCell>
            <TableHeaderCell className='text-center'>
              {page === 'machines' ? 'Ubicación' : 'Área'}
            </TableHeaderCell>
            <TableHeaderCell className='text-center'>
              Criticidad
            </TableHeaderCell>
            <TableHeaderCell className='text-center'>Acciones</TableHeaderCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {machines.map(({ code, ...rest }, index) => (
            <MachineCard
              key={code}
              code={code}
              {...rest}
              priority={index < 10}
            />
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
