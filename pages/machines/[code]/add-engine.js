import AddEngineForm from '../../../components/machines/code/add-engine/AddEngineForm'
import Page from '../../../components/page'
import { createEngineDto } from '../../../schemas/engine'
import Form from '../../../components/Form'

const dataInitialValue = {
  function: '',
  mark: '',
  type: '',
  powerHp: 0,
  powerKw: 0,
  voltage: '',
  current: '',
  rpm: 0,
  cosPhi: 0,
  performance: 0,
  frequency: 0,
  poles: 0,
  ip: 0,
  boot: '',
}

export default function AddEngine({ code }) {
  return (
    <Page title={`Máquina ${code} | TECNOPOR S.A.`}>
      <Form
        title='Agregar motor'
        dtoValidation={createEngineDto}
        initialValues={{ ...dataInitialValue, code: `${code}-MOT-` }}
        onSubmit={{
          method: 'POST',
          url: `/api/machines/${code}/add-engine`,
          message: 'Agregar',
          preSubmit: {
            title: `Agregar motor a la máquina ${code}`,
            question: `¿Seguro que quiere agregar el motor a la máquina ${code}?`,
          },
          duringSubmit: { message: 'El motor se está agregando...' },
          successSubmit: { message: 'El motor se agregó exitósamente' },
        }}
      >
        <AddEngineForm />
      </Form>
    </Page>
  )
}

export async function getServerSideProps(context) {
  const {
    query: { code },
  } = context

  return {
    props: { code },
  }
}
