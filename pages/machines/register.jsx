import RegisterMachineForm from '../../components/machines/register/RegisterMachineForm'
import Head from 'next/head'
import MachineForm from '../../components/machines/MachineForm'
import { createDocumentTitle } from '../../libs/documentTitle'
import { MACHINE_INITIAL_VALUES } from '../../schemas/machine'
import {
  ADD_MACHINE_CONFIG,
  MACHINE_GET_FIELDS_TO_CREATE_URL_REGULAR,
} from '../../services/machineServices'
import { Title } from '@tremor/react'
import { requestInternalApi } from '../../services/requestApi'
import { HTTP_METHODS } from '../../services'
import useBeforeRenderPage from '../../hooks/useBeforeRenderPage'

export default function RegisterMachine({ fields, message }) {
  const { component, title } = useBeforeRenderPage({
    message,
    title: 'Registro de máquina',
  })
  return (
    <>
      <Head>
        <title>{createDocumentTitle('Registro de máquina')}</title>
      </Head>
      <Title className='mb-5'>{title}</Title>
      {component ? (
        <>{component}</>
      ) : (
        <MachineForm
          {...ADD_MACHINE_CONFIG}
          initialValues={MACHINE_INITIAL_VALUES}
          title='Máquina a registrar'
        >
          <RegisterMachineForm fields={fields} />
        </MachineForm>
      )}
    </>
  )
}

export async function getServerSideProps(context) {
  const { data: fields, message } = await requestInternalApi(context, {
    method: HTTP_METHODS.GET,
    url: MACHINE_GET_FIELDS_TO_CREATE_URL_REGULAR,
  })

  return { props: { fields, message } }
}
