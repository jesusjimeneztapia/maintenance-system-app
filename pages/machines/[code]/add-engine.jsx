import AddEngineForm from '../../../components/machines/code/add-engine/AddEngineForm'
import { engineInitialValues } from '../../../schemas/engine'
import Head from 'next/head'
import { createDocumentTitle } from '../../../libs/documentTitle'
import EngineForm from '../../../components/machines/code/EngineForm'
import {
  ENGINE_GET_FIELDS_TO_CREATE_URL_REGULAR,
  addEngineConfig,
} from '../../../services/engineServices'
import { requestInternalApi } from '../../../services/requestApi'
import { HTTP_METHODS } from '../../../services'
import useBeforeRenderPage from '../../../hooks/useBeforeRenderPage'
import { Title } from '@tremor/react'

export default function AddEngine({ machine, fields, machineCode, message }) {
  const { component, title } = useBeforeRenderPage({
    message,
    title: [`Máquina ${machine?.name ?? machineCode}`, 'Agregar motor'],
  })

  return (
    <>
      <Head>
        <title>{createDocumentTitle(title)}</title>
      </Head>
      <Title className='mb-5'>{`Máquina ${
        machine?.name ?? machineCode
      }`}</Title>
      {component ? (
        <>{component}</>
      ) : (
        <>
          <EngineForm
            {...addEngineConfig(machineCode)}
            machineCode={machineCode}
            initialValues={engineInitialValues(machineCode)}
            title='Motor a agregar'
          >
            <AddEngineForm fields={fields} />
          </EngineForm>
        </>
      )}
    </>
  )
}

export async function getServerSideProps(context) {
  const {
    query: { code: machineCode },
  } = context

  const { data, message } = await requestInternalApi(context, {
    method: HTTP_METHODS.POST,
    url: ENGINE_GET_FIELDS_TO_CREATE_URL_REGULAR,
    params: { machineCode },
  })

  const { machine, fields } = data ?? { machine: null, fields: null }

  return {
    props: { machine, fields, machineCode, message },
  }
}
