import Head from 'next/head'
import ActivityForm from '../../../components/activities/ActivityForm'
import CreateActivityForm from '../../../components/activities/machine/create-activity/CreateActivityForm'
import useBeforeRenderPage from '../../../hooks/useBeforeRenderPage'
import { createDocumentTitle } from '../../../libs/documentTitle'
import { activityInitialValues } from '../../../schemas/activity'
import { HTTP_METHODS } from '../../../services'
import {
  ACTIVITY_GET_FIELDS_TO_CREATE_URL_REGULAR,
  CREATE_ACTIVITY_CONFIG,
} from '../../../services/activityServices'
import { requestInternalApi } from '../../../services/requestApi'
import { Title } from '@tremor/react'

export default function CreateActivity({
  machine,
  machineCode,
  fields,
  message,
}) {
  const { component, title } = useBeforeRenderPage({
    message,
    title: ['Crear actividad', `Máquina ${machine?.name ?? machineCode}`],
  })

  return (
    <>
      <Head>
        <title>{createDocumentTitle(title)}</title>
      </Head>
      {component ? (
        <>
          <Title className='mb-5'>{`Máquina ${
            machine?.name ?? machineCode
          }`}</Title>
          {component}
        </>
      ) : (
        <>
          <Title className='mb-5'>{`Máquina ${
            machine?.name ?? machineCode
          }`}</Title>
          <ActivityForm
            {...CREATE_ACTIVITY_CONFIG}
            machineCode={machineCode}
            initialValues={activityInitialValues(machineCode)}
            title='Crear actividad'
          >
            <CreateActivityForm fields={fields} />
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
    method: HTTP_METHODS.POST,
    url: ACTIVITY_GET_FIELDS_TO_CREATE_URL_REGULAR,
    params: { machineCode },
  })

  return {
    props: { ...data, machineCode, message },
  }
}
