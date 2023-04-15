import RegisterMachineForm from '../../components/machines/register/RegisterMachineForm'
import Head from 'next/head'
import MachineForm from '../../components/machines/MachineForm'
import { createDocumentTitle } from '../../libs/documentTitle'
import { MACHINE_INITIAL_VALUES } from '../../schemas/machine'
import { ADD_MACHINE_CONFIG } from '../../services/machineServices'
import { Title } from '@tremor/react'

export default function RegisterMachine() {
  return (
    <>
      <Head>
        <title>{createDocumentTitle('Registro de máquinas')}</title>
      </Head>
      <Title className='mb-5'>Registro de Máquina</Title>
      <MachineForm
        {...ADD_MACHINE_CONFIG}
        initialValues={MACHINE_INITIAL_VALUES}
        title='Máquina a registrar'
      >
        <RegisterMachineForm />
      </MachineForm>
    </>
  )
}
