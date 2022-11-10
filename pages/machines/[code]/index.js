import Button from '../../../components/Button'
import Page from '../../../components/page'
import { getAPIURL } from '../../../libs/origin'
import axios from 'redaxios'
import Link from 'next/link'
import EnginesTable from '../../../components/machines/code/EnginesTable'
import GeneralInformationTable from '../../../components/machines/code/GeneralInformationTable'
import TechnicalDocumentationTable from '../../../components/machines/code/TechnicalDocumentationTable'
import ImageMachineTable from '../../../components/machines/code/ImageMachineTable'

export default function Machine({
  code,
  engines,
  technicalDocumentation,
  generalInformation,
  image,
}) {
  return (
    <Page title={`Máquina ${code} - Editar | TECNOPOR S.A.`}>
      <header
        style={{
          display: 'flex',
          alignItems: 'flex-start',
          justifyContent: 'space-between',
          marginBottom: '1.25rem',
        }}
      >
        <h2>
          {code} - {generalInformation.name}
        </h2>
        <div style={{ display: 'flex', gap: '1rem' }}>
          <Button>
            <Link href={{ pathname: '/machines/[code]/edit', query: { code } }}>
              Editar Máquina
            </Link>
          </Button>
          <Button variant='soft-primary'>
            <Link
              href={{
                pathname: '/activities/[machineCode]',
                query: { machineCode: code },
              }}
            >
              Ver Actividades
            </Link>
          </Button>
        </div>
      </header>
      <div
        style={{
          display: 'grid',
          gap: '1.5rem',
          gridTemplateColumns: 'repeat(12, minmax(0, 1fr))',
        }}
      >
        <div
          style={{
            gridColumn: 'span 7',
            display: 'flex',
            flexDirection: 'column',
            gap: '1.25rem',
          }}
        >
          <GeneralInformationTable {...generalInformation} />
          <TechnicalDocumentationTable
            technicalDocumentation={technicalDocumentation}
          />
        </div>
        <div
          style={{
            gridColumn: 'span 5',
            display: 'flex',
            flexDirection: 'column',
            gap: '1.25rem',
          }}
        >
          <ImageMachineTable code={code} image={image} />
        </div>
        <div
          style={{
            gridColumn: 'span 12',
            display: 'flex',
            flexDirection: 'column',
            gap: '1.25rem',
          }}
        >
          <EnginesTable engines={engines} machineCode={code} />
        </div>
      </div>
    </Page>
  )
}

export async function getServerSideProps(context) {
  const {
    query: { code: machineCode },
  } = context

  let machine = null
  let message = null

  const api = getAPIURL(context)
  try {
    const { data } = await axios.get(`${api}/machines/${machineCode}`)
    const {
      code,
      engines,
      technicalDocumentation,
      image,
      ...generalInformation
    } = data
    machine = {
      code,
      engines,
      technicalDocumentation,
      generalInformation,
      image,
    }
  } catch (error) {
    const { data } = error
    message = data.message
  }

  return { props: { ...machine, message } }
}
