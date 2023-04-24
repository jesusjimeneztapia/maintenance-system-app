import {
  Button,
  Flex,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeaderCell,
  TableRow,
} from '@tremor/react'
import {
  WORK_ORDER_ACTIVITY_TYPE_VALUES_MAP,
  WORK_ORDER_STATE_VALUES_MAP,
} from '../../schemas/workOrder'
import DaysInput from './DaysInput'
import ExitIcon from '../icons/ExitIcon'

export default function ScheduleTable({
  workOrdersOnSchedule,
  firstWeekDay,
  deleteWorkOrderById,
  updateWorkOrder,
  strict,
}) {
  const [month, day, year] = firstWeekDay
    ?.toLocaleDateString()
    .split('/')
    .map(Number)
  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableHeaderCell>Máquina</TableHeaderCell>
          <TableHeaderCell className='text-center'>O.T.</TableHeaderCell>
          <TableHeaderCell>Actividades</TableHeaderCell>
          <TableHeaderCell>Tipo de actividad</TableHeaderCell>

          <TableHeaderCell className='text-center'>
            <Flex flexDirection='col'>
              <span>
                {month}/{day + 1}/{year}
              </span>
              LUNES
            </Flex>
          </TableHeaderCell>
          <TableHeaderCell className='text-center'>
            <Flex flexDirection='col'>
              <span>
                {month}/{day + 2}/{year}
              </span>
              MARTES
            </Flex>
          </TableHeaderCell>
          <TableHeaderCell className='text-center'>
            <Flex flexDirection='col'>
              <span>
                {month}/{day + 3}/{year}
              </span>
              MIERCOLES
            </Flex>
          </TableHeaderCell>
          <TableHeaderCell className='text-center'>
            <Flex flexDirection='col'>
              <span>
                {month}/{day + 4}/{year}
              </span>
              JUEVES
            </Flex>
          </TableHeaderCell>
          <TableHeaderCell className='text-center'>
            <Flex flexDirection='col'>
              <span>
                {month}/{day + 5}/{year}
              </span>
              VIERNES
            </Flex>
          </TableHeaderCell>
          <TableHeaderCell className='text-center'>
            <Flex flexDirection='col'>
              <span>
                {month}/{day + 6}/{year}
              </span>
              SABADO
            </Flex>
          </TableHeaderCell>
          <TableHeaderCell>Estado</TableHeaderCell>
          {!strict && <TableHeaderCell>Suspender</TableHeaderCell>}
        </TableRow>
      </TableHead>
      <TableBody>
        {workOrdersOnSchedule.map(
          (
            { code, machine, activityName, activityType, daySchedule, state },
            index
          ) => (
            <TableRow
              key={code}
              className={`${index % 2 === 0 && 'bg-slate-200/60'}`}
            >
              <TableCell>{machine?.name}</TableCell>
              <TableCell className='text-center'>{code}</TableCell>
              <TableCell>{activityName}</TableCell>
              <TableCell>
                {WORK_ORDER_ACTIVITY_TYPE_VALUES_MAP[activityType]}
              </TableCell>

              <DaysInput
                firstDay={day}
                firstWeekDay={firstWeekDay}
                updateWorkOrder={updateWorkOrder}
                code={code}
                daySchedule={daySchedule}
                state={state}
                strict={strict}
              />
              <TableCell>{WORK_ORDER_STATE_VALUES_MAP[state]}</TableCell>
              <TableCell className='text-center'>
                {!strict && state !== 'DONE' && (
                  <Button
                    color='red'
                    size='xs'
                    icon={() => <ExitIcon className='w-5 h-5' />}
                    onClick={() => deleteWorkOrderById(code)}
                  />
                )}
              </TableCell>
            </TableRow>
          )
        )}
      </TableBody>
    </Table>
  )
}
