import Box from '../../../components/Box'
import Button from '../../../components/Button'
import TableActivities from '../../../components/activities/machine/TableActivities'
import Link from 'next/link'
import { useState } from 'react'
import Head from 'next/head'
import { createDocumentTitle } from '../../../libs/documentTitle'
import { requestInternalApi } from '../../../services/requestApi'
import { HTTP_METHODS } from '../../../services'
import { ACTIVITY_URL_REGULAR } from '../../../services/activityServices'
import useBeforeRenderPage from '../../../hooks/useBeforeRenderPage'
import styles from '../../../styles/activities/machine/MachineActivities.module.css'

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
        <>{component}</>
      ) : (
        <>
          <header className={styles.header}>
            <h2>{title}</h2>
            <Button>
              <Link
                href={{
                  pathname: '/activities/[machineCode]/create-activity',
                  query: { machineCode },
                }}
              >
                Crear Actividad
              </Link>
            </Button>
          </header>
          <div className={styles.container}>
            <Box>
              <TableActivities
                title='Verificación de condición'
                activities={activities.CONDITION_CHECK}
                machineCode={machineCode}
                deleteActivity={deleteActivity}
              />
            </Box>
            <Box>
              <TableActivities
                title='Inspecciones visuales'
                activities={activities.VISUAL_INSPECTIONS}
                machineCode={machineCode}
                deleteActivity={deleteActivity}
              />
            </Box>
            <Box>
              <TableActivities
                title='Lubricación'
                activities={activities.LUBRICATION}
                machineCode={machineCode}
                deleteActivity={deleteActivity}
              />
            </Box>
            <Box>
              <TableActivities
                title='Mantenimiento autónomo'
                activities={activities.AUTONOMOUS_MAINTENANCE}
                machineCode={machineCode}
                deleteActivity={deleteActivity}
              />
            </Box>
            <Box>
              <TableActivities
                title='Mantenimiento periódico'
                activities={activities.PERIODIC_MAINTENANCE}
                machineCode={machineCode}
                deleteActivity={deleteActivity}
              />
            </Box>
            <Box>
              <TableActivities
                title='Mantenimiento correctivo'
                activities={activities.CORRECTIVE_MAINTENANCE}
                machineCode={machineCode}
                deleteActivity={deleteActivity}
              />
            </Box>
          </div>
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
