import styles from '../../styles/machines/Machines.module.css'
import MachineListProvider from '../../context/providers/MachineListContext'
import { FcAddDatabase } from 'react-icons/fc'
import Button from '../../components/Button'
import Link from 'next/link'
import MachineContainer from '../../components/machines/MachineContainer'
import Head from 'next/head'
import { createDocumentTitle } from '../../libs/documentTitle'
import useBeforeRenderPage from '../../hooks/useBeforeRenderPage'
import { HTTP_METHODS } from '../../services'
import { requestInternalApi } from '../../services/requestApi'
import { MACHINE_URL_REGULAR } from '../../services/machineServices'

export default function Activities({ machines, message }) {
  const { component, title } = useBeforeRenderPage({
    message,
    title: 'Actividades',
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
          <h2 className={styles.title}>{title}</h2>
          {machines.length ? (
            <MachineListProvider machines={machines}>
              <MachineContainer page='activities' />
            </MachineListProvider>
          ) : (
            <section className={styles.new}>
              <FcAddDatabase size={128} />
              <h4>No existen máquinas registradas</h4>
              <p>Registra tu primera máquina</p>
              <Button variant='primary'>
                <Link href='/machines/register'>
                  <a>Registrar Máquina</a>
                </Link>
              </Button>
            </section>
          )}
        </>
      )}
    </>
  )
}

export async function getServerSideProps(context) {
  const { data: machines, message } = await requestInternalApi(context, {
    method: HTTP_METHODS.GET,
    url: MACHINE_URL_REGULAR,
  })

  return {
    props: { machines, message },
  }
}
