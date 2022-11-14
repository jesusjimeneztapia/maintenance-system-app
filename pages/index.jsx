import { CgDatabase } from 'react-icons/cg'
import { FiActivity } from 'react-icons/fi'
import { FcAddDatabase } from 'react-icons/fc'
import HomeLink from '../components/home/HomeLink'
import Head from 'next/head'
import { createDocumentTitle } from '../libs/documentTitle'

import styles from '../styles/home/Home.module.css'

export default function Home() {
  return (
    <>
      <Head>
        <title>{createDocumentTitle('Sistema de mantenimiento')}</title>
      </Head>
      <h2 className={styles.title}>
        TECNOPOR S.A. <span>Sistema de mantenimiento</span>
      </h2>
      <div className={styles.links}>
        <HomeLink href='/machines'>
          <CgDatabase size={64} />
          Máquinas
        </HomeLink>
        <HomeLink href='/machines/register'>
          <FcAddDatabase className={styles['register-icon']} size={64} />
          Registrar Máquina
        </HomeLink>
        <HomeLink href='/activities'>
          <FiActivity size={64} />
          Actividades
        </HomeLink>
      </div>
    </>
  )
}
