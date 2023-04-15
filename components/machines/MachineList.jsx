import {
  Table,
  TableBody,
  TableHead,
  TableHeaderCell,
  TableRow,
} from '@tremor/react'
import MachineCard from './MachineCard'

export default function MachineList({ machines, page }) {
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
          {machines.map(({ code, ...rest }) => (
            <MachineCard key={code} code={code} page={page} {...rest} />
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
