import RegisterMachineForm from '../../components/machines/register/RegisterMachineForm'
import Head from 'next/head'
import MachineForm from '../../components/machines/MachineForm'
import { createDocumentTitle } from '../../libs/documentTitle'
import { MACHINE_INITIAL_VALUES } from '../../schemas/machine'
import { ADD_MACHINE_CONFIG } from '../../services/machineServices'

export default function RegisterMachine() {
  return (
    <>
      <Head>
        <title>{createDocumentTitle('Registro de máquinas')}</title>
      </Head>
      <MachineForm
        {...ADD_MACHINE_CONFIG}
        initialValues={MACHINE_INITIAL_VALUES}
        title='Registro de Máquina'
      >
        <RegisterMachineForm />
      </MachineForm>
    </>
  )
}
