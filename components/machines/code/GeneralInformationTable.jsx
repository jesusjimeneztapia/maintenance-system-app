import { Badge } from 'flowbite-react'
import { CRITICALITY_VALUES_MAP } from '../../../schemas/machine'
import {
  Card,
  Flex,
  TableRow,
  Table,
  TableBody,
  TableCell,
  Text,
} from '@tremor/react'
import ArrowUpIcon from '../../icons/ArrowUpIcon'
import ArrowRightIcon from '../../icons/ArrowRightIcon'
import ArrowDownIcon from '../../icons/ArrowDownIcon'

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
    <Card>
      <Flex className='gap-2' flexDirection='col' alignItems=''>
        <Text className='text-gray-400 font-medium'>Información general</Text>
        <Table>
          <TableBody>
            <TableRow>
              <TableCell className='pl-0 py-2'>Código</TableCell>
              <TableCell className='pr-0 py-2 xl:text-right'>{code}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className='pl-0 py-2'>Nombre</TableCell>
              <TableCell className='pr-0 py-2 xl:text-right'>{name}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className='pl-0 py-2'>Fabricante</TableCell>
              <TableCell className='pr-0 py-2 xl:text-right'>{maker}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className='pl-0 py-2'>Modelo</TableCell>
              <TableCell className='pr-0 py-2 xl:text-right'>{model}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className='pl-0 py-2'>Ubicación</TableCell>
              <TableCell className='pr-0 py-2 xl:text-right'>
                {location}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className='pl-0 py-2'>Área</TableCell>
              <TableCell className='pr-0 py-2 xl:text-right'>
                {area.name}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className='pl-0 py-2'>Criticidad</TableCell>
              <TableCell className='pr-0 py-2'>
                <Badge
                  className='w-fit xl:ml-auto'
                  icon={
                    criticality === 'HIGH'
                      ? ArrowUpIcon
                      : criticality === 'MEDIUM'
                      ? ArrowRightIcon
                      : ArrowDownIcon
                  }
                  color={
                    criticality === 'HIGH'
                      ? 'failure'
                      : criticality === 'MEDIUM'
                      ? 'warning'
                      : 'success'
                  }
                >
                  {CRITICALITY_VALUES_MAP[criticality]}
                </Badge>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className='pl-0 py-2'>Función</TableCell>
              <TableCell className='pr-0 py-2 xl:text-right'>{fn}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className='pl-0 py-2'>Datos específicos</TableCell>
              <TableCell className='pr-0 py-2 xl:text-right'>
                {specificData}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </Flex>
    </Card>
  )
}
