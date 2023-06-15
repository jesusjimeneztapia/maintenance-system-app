import ActivityRow from './ActivityRow'
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

export default function TableActivities({
  title,
  activities,
  machineCode,
  deleteActivity,
}) {
  return (
    <Card>
      <Flex className='gap-2' flexDirection='col' alignItems=''>
        <Subtitle>{title}</Subtitle>
        {activities.length > 0 ? (
          <Table>
            <TableHead>
              <TableRow>
                <TableHeaderCell className='text-center'>PEM</TableHeaderCell>
                <TableHeaderCell>Código</TableHeaderCell>
                <TableHeaderCell>Nombre</TableHeaderCell>
                <TableHeaderCell className='text-center'>
                  Frecuencia
                </TableHeaderCell>
                <TableHeaderCell className='text-center'>
                  Editar
                </TableHeaderCell>
                <TableHeaderCell className='text-center'>
                  Eliminar
                </TableHeaderCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {activities.map(
                ({ code, name, frequency, activityType, pem }, index) => (
                  <ActivityRow
                    key={code}
                    code={code}
                    name={name}
                    frequency={frequency}
                    machineCode={machineCode}
                    activityType={activityType}
                    pem={pem}
                    paint={index % 2 === 0}
                    deleteActivity={deleteActivity}
                  />
                )
              )}
            </TableBody>
          </Table>
        ) : (
          <Text className='text-center'>No existen actividades</Text>
        )}
      </Flex>
    </Card>
  )
}
