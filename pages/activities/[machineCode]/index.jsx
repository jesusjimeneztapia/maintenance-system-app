import TableActivities from '../../../components/activities/machine/TableActivities'
import Link from 'next/link'
import { useState } from 'react'
import Head from 'next/head'
import { createDocumentTitle } from '../../../libs/documentTitle'
import { requestInternalApi } from '../../../services/requestApi'
import { HTTP_METHODS } from '../../../services'
import { ACTIVITY_URL_REGULAR } from '../../../services/activityServices'
import useBeforeRenderPage from '../../../hooks/useBeforeRenderPage'
import { Flex, Title } from '@tremor/react'

function useMachineActivities({
  CONDITION_CHECK,
  VISUAL_INSPECTIONS,
  LUBRICATION,
  AUTONOMOUS_MAINTENANCE,
  PERIODIC_MAINTENANCE,
  CORRECTIVE_MAINTENANCE,
}) {
  const [activities, setActivities] = useState({
    CONDITION_CHECK,
    VISUAL_INSPECTIONS,
    LUBRICATION,
    AUTONOMOUS_MAINTENANCE,
    PERIODIC_MAINTENANCE,
    CORRECTIVE_MAINTENANCE,
  })

  const deleteActivity = ({ code, activityType }) => {
    setActivities((values) => {
      const activities = values[activityType]
      return {
        ...values,
        [activityType]: activities.filter((activity) => activity.code !== code),
      }
    })
  }

  return { activities, deleteActivity }
}

export default function MachineActivities({
  machineCode,
  machineName,
  CONDITION_CHECK,
  VISUAL_INSPECTIONS,
  LUBRICATION,
  AUTONOMOUS_MAINTENANCE,
  PERIODIC_MAINTENANCE,
  CORRECTIVE_MAINTENANCE,
  message,
}) {
  const { component, title } = useBeforeRenderPage({
    message,
    title: ['Actividades', `Máquina ${machineName ?? machineCode}`],
  })

  const { activities, deleteActivity } = useMachineActivities({
    CONDITION_CHECK,
    VISUAL_INSPECTIONS,
    LUBRICATION,
    AUTONOMOUS_MAINTENANCE,
    PERIODIC_MAINTENANCE,
    CORRECTIVE_MAINTENANCE,
  })

  return (
    <>
      <Head>
        <title>{createDocumentTitle(title)}</title>
      </Head>
      {component ? (
        <>
          <Title className='mb-5'>
            Actividades (Máquina {machineName ?? machineCode})
          </Title>
          {component}
        </>
      ) : (
        <>
          <Flex className='mb-5 max-sm:flex-col max-sm:items-start max-sm:gap-3'>
            <Title>Actividades ({machineName ?? machineCode})</Title>
            <Link
              href={{
                pathname: '/activities/[machineCode]/create-activity',
                query: { machineCode },
              }}
            >
              <a className='max-sm:self-end inline-flex items-center justify-center px-5 py-2 text-sm font-medium text-slate-500 rounded-lg bg-slate-100 hover:text-slate-900 hover:bg-slate-200'>
                <span className='w-full'>Crear actividad</span>
              </a>
            </Link>
          </Flex>
          <Flex className='gap-5' flexDirection='col' alignItems=''>
            <TableActivities
              title='Verificación de condición'
              activities={activities.CONDITION_CHECK}
              machineCode={machineCode}
              deleteActivity={deleteActivity}
            />
            <TableActivities
              title='Inspecciones visuales'
              activities={activities.VISUAL_INSPECTIONS}
              machineCode={machineCode}
              deleteActivity={deleteActivity}
            />
            <TableActivities
              title='Lubricación'
              activities={activities.LUBRICATION}
              machineCode={machineCode}
              deleteActivity={deleteActivity}
            />
            <TableActivities
              title='Mantenimiento autónomo'
              activities={activities.AUTONOMOUS_MAINTENANCE}
              machineCode={machineCode}
              deleteActivity={deleteActivity}
            />
            <TableActivities
              title='Mantenimiento periódico'
              activities={activities.PERIODIC_MAINTENANCE}
              machineCode={machineCode}
              deleteActivity={deleteActivity}
            />
            <TableActivities
              title='Mantenimiento correctivo'
              activities={activities.CORRECTIVE_MAINTENANCE}
              machineCode={machineCode}
              deleteActivity={deleteActivity}
            />
          </Flex>
        </>
      )}
    </>
  )
}

export async function getServerSideProps(context) {
  const {
    query: { machineCode },
  } = context

  const { data, message } = await requestInternalApi(context, {
    method: HTTP_METHODS.GET,
    params: { machineCode },
    url: ACTIVITY_URL_REGULAR,
  })

  return { props: { machineCode, message, ...data } }
}
