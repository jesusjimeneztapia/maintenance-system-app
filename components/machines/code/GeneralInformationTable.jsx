import { TableRow, Table, TableBody, TableCell } from '@tremor/react'
import Criticality from '../Criticality'

export default function GeneralInformationTable({
  code,
  name,
  maker,
  model,
  location,
  area,
  criticality,
  function: fn,
  specificData,
}) {
  return (
    <Table>
      <TableBody>
        <TableRow className='bg-gray-100'>
          <TableCell className='pl-0 py-2 font-semibold'>Código</TableCell>
          <TableCell className='pr-0 py-2 text-right xl:text-left whitespace-normal'>
            {code}
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell className='pl-0 py-2 font-semibold'>Nombre</TableCell>
          <TableCell className='pr-0 py-2 text-right xl:text-left whitespace-normal'>
            {name}
          </TableCell>
        </TableRow>
        <TableRow className='bg-gray-100'>
          <TableCell className='pl-0 py-2 font-semibold'>Fabricante</TableCell>
          <TableCell className='pr-0 py-2 text-right xl:text-left whitespace-normal'>
            {maker ?? '-'}
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell className='pl-0 py-2 font-semibold'>Modelo</TableCell>
          <TableCell className='pr-0 py-2 text-right xl:text-left whitespace-normal'>
            {model ?? '-'}
          </TableCell>
        </TableRow>
        <TableRow className='bg-gray-100'>
          <TableCell className='pl-0 py-2 font-semibold'>Ubicación</TableCell>
          <TableCell className='pr-0 py-2 text-right xl:text-left whitespace-normal'>
            {location}
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell className='pl-0 py-2 font-semibold'>Área</TableCell>
          <TableCell className='pr-0 py-2 text-right xl:text-left whitespace-normal'>
            {area.name}
          </TableCell>
        </TableRow>
        <TableRow className='bg-gray-100'>
          <TableCell className='pl-0 py-2 font-semibold'>Criticidad</TableCell>
          <TableCell className='pr-0 py-2 text-right xl:text-left whitespace-normal'>
            <Criticality criticality={criticality} />
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell className='pl-0 py-2 font-semibold'>Función</TableCell>
          <TableCell className='pr-0 py-2 text-right xl:text-left whitespace-normal'>
            {fn}
          </TableCell>
        </TableRow>
        <TableRow className='bg-gray-100'>
          <TableCell className='pl-0 py-2 font-semibold'>
            Datos específicos
          </TableCell>
          <TableCell className='pr-0 py-2 text-right xl:text-left whitespace-normal'>
            {specificData ?? '-'}
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  )
}
