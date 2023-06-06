import { dateLocaleString } from '../../../libs/date'
import {
  WORK_ORDER_ACTIVITY_TYPE_VALUES_MAP,
  WORK_ORDER_PROTECTION_EQUIPMENT_VALUES,
  WORK_ORDER_SECURITY_MEASURE_END_VALUES,
  WORK_ORDER_SECURITY_MEASURE_START_VALUES,
  WORK_ORDER_STATE_VALUES_MAP,
} from '../../../schemas/workOrder'
import {
  Card,
  Col,
  Flex,
  Grid,
  Subtitle,
  Table,
  TableBody,
  TableCell,
  TableRow,
} from '@tremor/react'
import { Priority } from '../WorkOrderCard'

export default function WorkOrderInformation({
  code,
  engineCode,
  activityCode,
  failureCause,
  startDate,
  endDate,
  state,
  nextState,
  previousState,
  createdAt,
  updatedAt,
  activityName,
  activityType,
  engineFunction,
  machineCode,
  machineName,
  machineArea,
  priority,
  securityMeasureStarts,
  protectionEquipments,
  activityDescription,
  storeDescription,
  storeUnit,
  totalHours,
  securityMeasureEnds,
  observations,
  checkListVerified,
  machine,
  stores,
}) {
  return (
    <Card>
      <Grid className='gap-6' numCols={2}>
        <Col numColSpan={2} numColSpanMd={1}>
          <Subtitle className='text-slate-900 font-medium'>
            Información General
          </Subtitle>
          <Table>
            <TableBody>
              <TableRow>
                <TableCell className='pl-0 pt-2 pb-2'>
                  Número de órden
                </TableCell>
                <TableCell className='pr-0 pt-2 pb-2 xl:text-right'>
                  {code}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className='pl-0 pt-2 pb-2'>
                  Tipo de actividad
                </TableCell>
                <TableCell className='pr-0 pt-2 pb-2 xl:text-right'>
                  {WORK_ORDER_ACTIVITY_TYPE_VALUES_MAP[activityType]}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className='pl-0 pt-2 pb-2'>Estado</TableCell>
                <TableCell className='pr-0 pt-2 pb-2 xl:text-right'>
                  {WORK_ORDER_STATE_VALUES_MAP[state]}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className='pl-0 pt-2 pb-2'>Prioridad</TableCell>
                <TableCell className='pr-0 pt-2 pb-2'>
                  {
                    <Priority
                      className='w-fit xl:ml-auto'
                      priority={priority}
                    />
                  }
                </TableCell>
              </TableRow>
              {activityDescription && (
                <TableRow>
                  <TableCell className='pl-0 pt-2 pb-2'>
                    Descripción de actividad
                  </TableCell>
                  <TableCell className='pr-0 pt-2 pb-2 xl:text-right'>
                    {activityDescription}
                  </TableCell>
                </TableRow>
              )}
              {storeDescription && (
                <TableRow>
                  <TableCell className='pl-0 pt-2 pb-2'>
                    Descripción de repuestos
                  </TableCell>
                  <TableCell className='pr-0 pt-2 pb-2 xl:text-right'>
                    {storeDescription}
                  </TableCell>
                </TableRow>
              )}
              {storeUnit && (
                <TableRow>
                  <TableCell className='pl-0 pt-2 pb-2'>
                    Unidad de repuestos
                  </TableCell>
                  <TableCell className='pr-0 pt-2 pb-2 xl:text-right'>
                    {storeUnit}
                  </TableCell>
                </TableRow>
              )}
              {failureCause && (
                <TableRow>
                  <TableCell className='pl-0 pt-2 pb-2'>
                    Causa de falla
                  </TableCell>
                  <TableCell className='pr-0 pt-2 pb-2 xl:text-right'>
                    {failureCause}
                  </TableCell>
                </TableRow>
              )}
              {observations && (
                <TableRow>
                  <TableCell className='pl-0 pt-2 pb-2'>
                    Observaciones
                  </TableCell>
                  <TableCell className='pr-0 pt-2 pb-2 xl:text-right'>
                    {observations}
                  </TableCell>
                </TableRow>
              )}
              <TableRow>
                <TableCell className='pl-0 pt-2 pb-2'>Creado</TableCell>
                <TableCell className='pr-0 pt-2 pb-2 xl:text-right'>
                  {dateLocaleString(createdAt, true)}
                </TableCell>
              </TableRow>
              {startDate && (
                <>
                  <TableRow>
                    <TableCell className='pl-0 pt-2 pb-2'>
                      Fecha inicio
                    </TableCell>
                    <TableCell className='pr-0 pt-2 pb-2 xl:text-right'>
                      {dateLocaleString(startDate, true)}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className='pl-0 pt-2 pb-2'>
                      Hora inicio
                    </TableCell>
                    <TableCell className='pr-0 pt-2 pb-2 xl:text-right'>
                      {new Date(startDate).toLocaleTimeString('es-ES', {
                        hour: '2-digit',
                        minute: '2-digit',
                        hour12: true,
                      })}
                    </TableCell>
                  </TableRow>
                </>
              )}
              {endDate && (
                <>
                  <TableRow>
                    <TableCell className='pl-0 pt-2 pb-2'>Fecha fin</TableCell>
                    <TableCell className='pr-0 pt-2 pb-2 xl:text-right'>
                      {dateLocaleString(endDate, true)}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className='pl-0 pt-2 pb-2'>Hora fin</TableCell>
                    <TableCell className='pr-0 pt-2 pb-2 xl:text-right'>
                      {new Date(endDate).toLocaleTimeString('es-ES', {
                        hour: '2-digit',
                        minute: '2-digit',
                        hour12: true,
                      })}
                    </TableCell>
                  </TableRow>
                </>
              )}
              {totalHours && (
                <TableRow>
                  <TableCell className='pl-0 pt-2 pb-2'>
                    Total de horas
                  </TableCell>
                  <TableCell className='pr-0 pt-2 pb-2 xl:text-right'>
                    {totalHours} hr{totalHours > 1 && 's'}
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </Col>
        <Col numColSpan={2} numColSpanMd={1}>
          <Flex className='gap-6' flexDirection='col'>
            <Flex flexDirection='col' alignItems=''>
              <Subtitle className='text-slate-900 font-medium'>
                Información de la actividad
              </Subtitle>
              <Table>
                <TableBody>
                  {activityCode && (
                    <TableRow>
                      <TableCell className='pl-0 pt-2 pb-2'>Código</TableCell>
                      <TableCell className='pr-0 pt-2 pb-2 xl:text-right'>
                        {activityCode}
                      </TableCell>
                    </TableRow>
                  )}
                  <TableRow>
                    <TableCell className='pl-0 pt-2 pb-2'>Nombre</TableCell>
                    <TableCell className='pr-0 pt-2 pb-2 xl:text-right'>
                      {activityName}
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </Flex>
            <Flex flexDirection='col' alignItems=''>
              <Subtitle className='text-slate-900 font-medium'>
                Información de la Máquina
              </Subtitle>
              <Table>
                <TableBody>
                  <TableRow>
                    <TableCell className='pl-0 pt-2 pb-2'>Código</TableCell>
                    <TableCell className='pr-0 pt-2 pb-2 xl:text-right'>
                      {machineCode}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className='pl-0 pt-2 pb-2'>Nombre</TableCell>
                    <TableCell className='pr-0 pt-2 pb-2 xl:text-right'>
                      {machine?.name}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className='pl-0 pt-2 pb-2'>Área</TableCell>
                    <TableCell className='pr-0 pt-2 pb-2 xl:text-right'>
                      {machine?.area?.name}
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </Flex>
            {engineCode && (
              <Flex flexDirection='col' alignItems=''>
                <Subtitle className='text-slate-900 font-medium'>
                  Información del motor
                </Subtitle>
                <Table>
                  <TableBody>
                    <TableRow>
                      <TableCell className='pl-0 pt-2 pb-2'>Código</TableCell>
                      <TableCell className='pr-0 pt-2 pb-2 xl:text-right'>
                        {engineCode}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className='pl-0 pt-2 pb-2'>Función</TableCell>
                      <TableCell className='pr-0 pt-2 pb-2 xl:text-right'>
                        {engineFunction}
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </Flex>
            )}
          </Flex>
        </Col>

        {securityMeasureStarts?.length > 0 && (
          <Col numColSpan={2} numColSpanMd={1}>
            <Subtitle className='text-slate-900 font-medium'>
              Medidas de seguridad inicio del trabajo
            </Subtitle>
            <Table>
              <TableBody>
                {securityMeasureStarts.map((security, index) => (
                  <TableRow key={index}>
                    <TableCell className='pt-2 pb-2'>✓</TableCell>
                    <TableCell className='pr-0 pt-2 pb-2 xl:text-right'>
                      {WORK_ORDER_SECURITY_MEASURE_START_VALUES[security]}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Col>
        )}
        {protectionEquipments?.length > 0 && (
          <Col numColSpan={2} numColSpanMd={1}>
            <Subtitle className='text-slate-900 font-medium'>
              Riesgos de trabajo (Precauciones a tener en cuenta)
            </Subtitle>
            <Table>
              <TableBody>
                {protectionEquipments.map((protection, index) => (
                  <TableRow key={index}>
                    <TableCell className='pt-2 pb-2'>✓</TableCell>
                    <TableCell className='pr-0 pt-2 pb-2 xl:text-right'>
                      {WORK_ORDER_PROTECTION_EQUIPMENT_VALUES[protection]}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Col>
        )}
        {securityMeasureEnds?.length > 0 && (
          <Col numColSpan={2} numColSpanMd={1}>
            <Subtitle className='text-slate-900 font-medium'>
              Medidas de seguridad fin del trabajo
            </Subtitle>
            <Table>
              <TableBody>
                {securityMeasureEnds.map((security, index) => (
                  <TableRow key={index}>
                    <TableCell className='pt-2 pb-2'>✓</TableCell>
                    <TableCell className='pr-0 pt-2 pb-2 xl:text-right'>
                      {WORK_ORDER_SECURITY_MEASURE_END_VALUES[security]}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Col>
        )}
        {checkListVerified?.length > 0 && (
          <Col numColSpan={2} numColSpanMd={1}>
            <Subtitle className='text-slate-900 font-medium'>
              Checklist verificadas
            </Subtitle>
            <Table>
              <TableBody>
                {checkListVerified.map(({ id, field, value }) => (
                  <TableRow key={id}>
                    <TableCell className='pl-0 pt-2 pb-2'>{field}</TableCell>
                    <TableCell className='pr-0 pt-2 pb-2 xl:text-right'>
                      {value}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Col>
        )}
        {stores?.length > 0 && state === 'DONE' && (
          <Col numColSpan={2} numColSpanMd={1}>
            <Subtitle className='text-slate-900 font-medium'>
              Repuestos utilizados
            </Subtitle>
            <Table>
              <TableBody>
                {stores.map(({ id, amount, store: { name } }) => (
                  <TableRow key={id}>
                    <TableCell className='pl-0 pt-2 pb-2'>{name}</TableCell>
                    <TableCell className='pr-0 pt-2 pb-2 xl:text-right'>
                      {amount}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Col>
        )}
      </Grid>
    </Card>
  )
}
