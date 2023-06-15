import TableActivities from '../../../components/activities/machine/TableActivities'
import { useState } from 'react'
import Head from 'next/head'
import { createDocumentTitle } from '../../../libs/documentTitle'
import { requestInternalApi } from '../../../services/requestApi'
import { HTTP_METHODS } from '../../../services'
import { ACTIVITY_URL_REGULAR } from '../../../services/activityServices'
import useBeforeRenderPage from '../../../hooks/useBeforeRenderPage'
import { Flex, Title } from '@tremor/react'
import AppLink from '../../../components/AppLink'

function useMachineActivities({ activities }) {
  const [groups, setGroups] = useState(activities)

  const deleteActivity = ({ code, activityType }) => {
    setGroups((values) => {
      const index = values.findIndex(({ name }) => name === activityType)
      if (index >= 0) {
        const { activities } = values[index]
        values[index] = {
          ...values[index],
          activities: activities.filter((activity) => activity.code !== code),
        }
        return [...values]
      }
      return values
    })
  }

  return { groups, deleteActivity }
}

export default function MachineActivities({
  machineCode,
  machineName,
  activities,
  message,
}) {
  const { component, title } = useBeforeRenderPage({
    message,
    title: ['Actividades', `Máquina ${machineName ?? machineCode}`],
  })

  const { groups, deleteActivity } = useMachineActivities({ activities })

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
            <AppLink
              href={{
                pathname: '/activities/[machineCode]/create-activity',
                query: { machineCode },
              }}
            >
              Crear actividad
            </AppLink>
          </Flex>
          <Flex className='gap-5' flexDirection='col' alignItems=''>
            {groups.map(({ id, name, activities }) => (
              <TableActivities
                key={id}
                title={name}
                activities={activities}
                machineCode={machineCode}
                deleteActivity={deleteActivity}
              />
            ))}
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
