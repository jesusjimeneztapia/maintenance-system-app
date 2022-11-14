import Link from 'next/link'
import Button from '../../components/Button'
import { FcAddDatabase } from 'react-icons/fc'
import styles from '../../styles/machines/Machines.module.css'
import MachineListProvider from '../../context/providers/MachineListContext'
import MachineContainer from '../../components/machines/MachineContainer'
import Head from 'next/head'
import { createDocumentTitle } from '../../libs/documentTitle'
import { requestInternalApi } from '../../services/requestApi'
import { HTTP_METHODS } from '../../services'
import useBeforeRenderPage from '../../hooks/useBeforeRenderPage'
import { MACHINE_URL_REGULAR } from '../../services/machineServices'

export default function Machines({ machines, message }) {
  const { component, title } = useBeforeRenderPage({
    message,
    title: 'Máquinas',
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
              <MachineContainer page='machines' />
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
