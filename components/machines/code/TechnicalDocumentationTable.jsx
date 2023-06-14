import {
  Bold,
  Card,
  Flex,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeaderCell,
  TableRow,
  Text,
} from '@tremor/react'

export default function TechnicalDocumentationTable({
  technicalDocumentation,
}) {
  const renderTechnicalDocumentation = (value) => {
    return (
      <>
        {technicalDocumentation.includes(value) ? (
          <>
            <TableCell className='text-center py-2 text-amber-500'>
              <Bold>✓</Bold>
            </TableCell>
            <TableCell />
          </>
        ) : (
          <>
            <TableCell />
            <TableCell className='text-center py-2 pr-0 text-red-500'>
              <Bold>✕</Bold>
            </TableCell>
          </>
        )}
      </>
    )
  }

  return (
    <Card>
      <Flex flexDirection='col' alignItems=''>
        <Text className='text-slate-400 font-medium'>
          Documentación técnica
        </Text>
        <Table>
          <TableHead>
            <TableRow>
              <TableHeaderCell></TableHeaderCell>
              <TableHeaderCell className='text-center py-2'>Si</TableHeaderCell>
              <TableHeaderCell className='text-center py-2 pr-0'>
                No
              </TableHeaderCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow className='bg-gray-100'>
              <TableCell className='pl-0 py-2'>Manual de Operaciones</TableCell>
              {renderTechnicalDocumentation('MANUAL DE OPERACIONES')}
            </TableRow>
            <TableRow>
              <TableCell className='pl-0 py-2'>
                Manual de Mantenimiento
              </TableCell>
              {renderTechnicalDocumentation('MANUAL DE MANTENIMIENTO')}
            </TableRow>
            <TableRow className='bg-gray-100'>
              <TableCell className='pl-0 py-2'>Planos Eléctricos</TableCell>
              {renderTechnicalDocumentation('PLANOS ELÉCTRICOS')}
            </TableRow>
            <TableRow>
              <TableCell className='pl-0 py-2'>Planos Mecánicos</TableCell>
              {renderTechnicalDocumentation('PLANOS MECÁNICOS')}
            </TableRow>
          </TableBody>
        </Table>
      </Flex>
    </Card>
  )
}
