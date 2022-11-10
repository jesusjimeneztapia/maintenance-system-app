import Page from '../../../components/page'
import axios from 'redaxios'
import { getAPIURL } from '../../../libs/origin'
import Box from '../../../components/Box'
import Button from '../../../components/Button'
import TableActivities from '../../../components/activities/machine/TableActivities'
import Link from 'next/link'
import { useState } from 'react'

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
  CONDITION_CHECK,
  VISUAL_INSPECTIONS,
  LUBRICATION,
  AUTONOMOUS_MAINTENANCE,
  PERIODIC_MAINTENANCE,
  CORRECTIVE_MAINTENANCE,
}) {
  const { activities, deleteActivity } = useMachineActivities({
    CONDITION_CHECK,
    VISUAL_INSPECTIONS,
    LUBRICATION,
    AUTONOMOUS_MAINTENANCE,
    PERIODIC_MAINTENANCE,
    CORRECTIVE_MAINTENANCE,
  })

  return (
    <Page title={`Actividades - Máquina ${machineCode} | TECNOPOR S.A.`}>
      <header
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: '1.25rem',
        }}
      >
        <h2>Actividades de la máquina {machineCode}</h2>
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
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
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
    </Page>
  )
}

export async function getServerSideProps(context) {
  const {
    query: { machineCode },
  } = context

  const api = getAPIURL(context)

  let data

  try {
    const response = await axios.get(`${api}/activities`, {
      params: { machineCode },
    })
    data = response.data
  } catch (error) {
    data = error.data
  }

  return { props: { machineCode, ...data } }
}
