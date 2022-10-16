import Head from 'next/head'
import NavLink from './NavLink'
import { AiOutlineHome } from 'react-icons/ai'
import { CgDatabase } from 'react-icons/cg'
import Header from './Header'
import styles from '../../styles/Page.module.css'

export default function Page({ children, title = 'TECNOPOR S.A.' }) {
  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <div className={styles.page}>
        <nav className={styles.nav}>
          <h1>
            <img src='/favicon.ico' alt='Logo' height={22.44} />
            <span>TECNOPOR S.A.</span>
          </h1>
          <div className={styles.divider} />
          <ul>
            <NavLink href='/' exact>
              <>
                <AiOutlineHome size={24} />
                Inicio
              </>
            </NavLink>
            <NavLink href='/machines'>
              <>
                <CgDatabase size={24} />
                Máquinas
              </>
            </NavLink>
          </ul>
        </nav>
        <div className={styles.container}>
          <Header />
          <main>{children}</main>
        </div>
      </div>
    </>
  )
}
