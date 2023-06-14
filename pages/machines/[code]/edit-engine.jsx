import EditEngineForm from '../../../components/machines/code/edit-engine/EditEngineForm'
import Head from 'next/head'
import { createDocumentTitle } from '../../../libs/documentTitle'
import { requestInternalApi } from '../../../services/requestApi'
import { HTTP_METHODS } from '../../../services'
import {
  editEngineConfig,
  engineGetFieldsToUpdateUrlRegular,
} from '../../../services/engineServices'
import useBeforeRenderPage from '../../../hooks/useBeforeRenderPage'
import EngineForm from '../../../components/machines/code/EngineForm'
import { Title } from '@tremor/react'

export default function EditEngine({ code, engine, fields, message }) {
  const { component, title } = useBeforeRenderPage({
    message,
    title: [`Motor ${code}`, 'Editar'],
  })

  return (
    <>
      <Head>
        <title>{createDocumentTitle(title)}</title>
      </Head>
      <Title className='mb-5'>{`Motor ${code}`}</Title>
      {component ? (
        <>{component}</>
      ) : (
        <EngineForm
          {...editEngineConfig(code)}
          code={code}
          initialValues={engine}
          title={`Editar motor ${code}`}
        >
          <EditEngineForm fields={fields} />
        </EngineForm>
      )}
    </>
  )
}

export async function getServerSideProps(context) {
  const {
    query: { engineCode },
  } = context

  const { data, message } = await requestInternalApi(context, {
    method: HTTP_METHODS.PUT,
    url: engineGetFieldsToUpdateUrlRegular(engineCode),
  })

  const { engine, fields } = data ?? { engine: null, fields: null }

  return { props: { code: engineCode, engine, fields, message } }
}
