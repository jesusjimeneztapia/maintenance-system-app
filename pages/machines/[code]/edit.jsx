import Head from 'next/head'
import EditMachineForm from '../../../components/machines/code/EditMachineForm'
import MachineForm from '../../../components/machines/MachineForm'
import { createDocumentTitle } from '../../../libs/documentTitle'
import {
  getMachineByCodeUrlRegular,
  UPDATE_MACHINE_CONFIG,
} from '../../../services/machineServices'
import useBeforeRenderPage from '../../../hooks/useBeforeRenderPage'
import { requestInternalApi } from '../../../services/requestApi'
import { HTTP_METHODS } from '../../../services'
import { Title } from '@tremor/react'

export default function EditMachine({ code, name, machine, message }) {
  const { component, title } = useBeforeRenderPage({
    message,
    title: [`Máquina ${name ?? code}`, 'Editar'],
  })

  return (
    <>
      <Head>
        <title>{createDocumentTitle(title)}</title>
      </Head>
      <Title className='mb-5'>{`Máquina ${name ?? code}`}</Title>
      {component ? (
        <>{component}</>
      ) : (
        <MachineForm
          {...UPDATE_MACHINE_CONFIG}
          initialValues={machine}
          title={`Editar máquina ${code}`}
          code={code}
        >
          <EditMachineForm />
        </MachineForm>
      )}
    </>
  )
}

export async function getServerSideProps(context) {
  const {
    query: { code },
  } = context

  const { data: machine, message } = await requestInternalApi(context, {
    method: HTTP_METHODS.GET,
    url: getMachineByCodeUrlRegular(code),
  })

  if (machine) {
    const { name } = machine
    return {
      props: {
        code,
        name,
        machine,
        message,
      },
    }
  }

  return {
    props: {
      code,
      message,
    },
  }
}
