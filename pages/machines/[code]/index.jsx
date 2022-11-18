import Button from '../../../components/Button'
import Link from 'next/link'
import EnginesTable from '../../../components/machines/code/EnginesTable'
import GeneralInformationTable from '../../../components/machines/code/GeneralInformationTable'
import TechnicalDocumentationTable from '../../../components/machines/code/TechnicalDocumentationTable'
import ImageMachineTable from '../../../components/machines/code/ImageMachineTable'
import Head from 'next/head'
import { createDocumentTitle } from '../../../libs/documentTitle'
import { requestInternalApi } from '../../../services/requestApi'
import { HTTP_METHODS } from '../../../services'
import { getMachineByCodeUrlRegular } from '../../../services/machineServices'
import useBeforeRenderPage from '../../../hooks/useBeforeRenderPage'
import styles from '../../../styles/machines/code/Machine.module.css'

export default function Machine({
  code,
  engines,
  technicalDocumentation,
  generalInformation,
  image,
  name,
  message,
}) {
  const { component, title } = useBeforeRenderPage({
    message,
    title: `Máquina ${name ?? code}`,
  })

  return (
    <>
      <Head>
        <title>{createDocumentTitle(title)}</title>
      </Head>
      {component ? (
        <>{component}</>
      ) : (
        <>
          <header className={styles.header}>
            <h2>
              {code} - {name}
            </h2>
            <div className={styles.actions}>
              <Button>
                <Link
                  href={{ pathname: '/machines/[code]/edit', query: { code } }}
                >
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
          <div className={styles.grid}>
            <div className={styles['first-column']}>
              <GeneralInformationTable {...generalInformation} />
              <TechnicalDocumentationTable
                technicalDocumentation={technicalDocumentation}
              />
            </div>
            <div className={styles['second-column']}>
              <ImageMachineTable code={code} image={image} />
            </div>
            <div className={styles.all}>
              <EnginesTable engines={engines} machineCode={code} />
            </div>
          </div>
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
    params: { complete: true },
    url: getMachineByCodeUrlRegular(machineCode),
  })

  let machine = data
  if (data) {
    const {
      code,
      engines,
      technicalDocumentation,
      image,
      name,
      ...generalInformation
    } = data
    machine = {
      code,
      engines,
      technicalDocumentation,
      image,
      name,
      generalInformation: { ...generalInformation, name },
    }
  }

  return { props: { ...machine, code: machineCode, message } }
}
