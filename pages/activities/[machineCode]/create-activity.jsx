import Head from 'next/head'
import ActivityForm from '../../../components/activities/ActivityForm'
import CreateActivityForm from '../../../components/activities/machine/create-activity/CreateActivityForm'
import useBeforeRenderPage from '../../../hooks/useBeforeRenderPage'
import { createDocumentTitle } from '../../../libs/documentTitle'
import { activityInitialValues } from '../../../schemas/activity'
import { HTTP_METHODS } from '../../../services'
import { CREATE_ACTIVITY_CONFIG } from '../../../services/activityServices'
import { getMachineByCodeUrlRegular } from '../../../services/machineServices'
import { requestInternalApi } from '../../../services/requestApi'
import { Title } from '@tremor/react'

export default function CreateActivity({ name, machineCode, message }) {
  const { component, title } = useBeforeRenderPage({
    message,
    title: ['Crear actividad', `Máquina ${name ?? machineCode}`],
  })

  return (
    <>
      <Head>
        <title>{createDocumentTitle(title)}</title>
      </Head>
      {component ? (
        <>
          <Title className='mb-5'>{`Máquina ${name ?? machineCode}`}</Title>
          {component}
        </>
      ) : (
        <>
          <Title className='mb-5'>{`Máquina ${name ?? machineCode}`}</Title>
          <ActivityForm
            {...CREATE_ACTIVITY_CONFIG}
            machineCode={machineCode}
            initialValues={activityInitialValues(machineCode)}
            title='Crear actividad'
          >
            <CreateActivityForm />
          </ActivityForm>
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
    url: getMachineByCodeUrlRegular(machineCode),
  })

  return {
    props: { ...data, machineCode, message },
  }
}
