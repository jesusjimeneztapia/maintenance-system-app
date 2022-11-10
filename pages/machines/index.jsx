import Link from 'next/link'
import Button from '../../components/Button'
import { FcAddDatabase } from 'react-icons/fc'
import axios from 'redaxios'
import styles from '../../styles/machines/Machines.module.css'
import { getAPIURL } from '../../libs/origin'
import MachineListProvider from '../../context/providers/MachineListContext'
import MachineContainer from '../../components/machines/MachineContainer'
import Head from 'next/head'
import { createDocumentTitle } from '../../libs/documentTitle'

export default function Machines({ machines = [] }) {
  return (
    <>
      <Head>
        <title>{createDocumentTitle('Máquinas')}</title>
      </Head>
      <h2 className={styles.title}>Máquinas</h2>
      {machines.length ? (
        <MachineListProvider machines={machines}>
          <MachineContainer />
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
  )
}

export async function getServerSideProps(context) {
  const api = getAPIURL(context)
  const { data } = await axios.get(`${api}/machines`)

  return {
    props: { machines: data },
  }
}
