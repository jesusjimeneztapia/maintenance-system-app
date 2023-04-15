import AddEngineForm from '../../../components/machines/code/add-engine/AddEngineForm'
import { engineInitialValues } from '../../../schemas/engine'
import Head from 'next/head'
import { createDocumentTitle } from '../../../libs/documentTitle'
import EngineForm from '../../../components/machines/code/EngineForm'
import { addEngineConfig } from '../../../services/engineServices'
import { requestInternalApi } from '../../../services/requestApi'
import { HTTP_METHODS } from '../../../services'
import { getMachineByCodeUrlRegular } from '../../../services/machineServices'
import useBeforeRenderPage from '../../../hooks/useBeforeRenderPage'
import { Title } from '@tremor/react'

export default function AddEngine({ name, machineCode, message }) {
  const { component, title } = useBeforeRenderPage({
    message,
    title: [`Máquina ${name ?? machineCode}`, 'Agregar motor'],
  })

  return (
    <>
      <Head>
        <title>{createDocumentTitle(title)}</title>
      </Head>
      <Title className='mb-5'>{`Máquina ${name ?? machineCode}`}</Title>
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
            <AddEngineForm />
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
    method: HTTP_METHODS.GET,
    url: getMachineByCodeUrlRegular(machineCode),
  })

  return {
    props: { ...data, machineCode, message },
  }
}
