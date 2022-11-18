import EditEngineForm from '../../../components/machines/code/edit-engine/EditEngineForm'
import Head from 'next/head'
import { createDocumentTitle } from '../../../libs/documentTitle'
import { requestInternalApi } from '../../../services/requestApi'
import { HTTP_METHODS } from '../../../services'
import {
  editEngineConfig,
  getEngineUrlRegular,
} from '../../../services/engineServices'
import useBeforeRenderPage from '../../../hooks/useBeforeRenderPage'
import EngineForm from '../../../components/machines/code/EngineForm'

export default function EditEngine({ code, machineCode, engine, message }) {
  const { component, title } = useBeforeRenderPage({
    message,
    title: [`Motor ${code}`, 'Editar'],
  })

  return (
    <>
      <Head>
        <title>{createDocumentTitle(title)}</title>
      </Head>
      {component ? (
        <>{component}</>
      ) : (
        <EngineForm
          {...editEngineConfig(machineCode, code)}
          code={code}
          initialValues={engine}
          title={title}
        >
          <EditEngineForm />
        </EngineForm>
      )}
    </>
  )
}

export async function getServerSideProps(context) {
  const {
    query: { code: machineCode, engineCode },
  } = context

  const { data, message } = await requestInternalApi(context, {
    method: HTTP_METHODS.GET,
    params: { engineCode },
    url: getEngineUrlRegular(machineCode),
  })

  if (data) {
    const { code, machineCode, ...engine } = data
    return {
      props: {
        code,
        machineCode,
        engine,
      },
    }
  }

  return {
    props: { code: engineCode, message },
  }
}
