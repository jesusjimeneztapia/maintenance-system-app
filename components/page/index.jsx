import NavLink from './NavLink'
import { AiOutlineHome } from 'react-icons/ai'
import { CgDatabase } from 'react-icons/cg'
import Header from './Header'
import styles from '../../styles/Page.module.css'
import { FiActivity } from 'react-icons/fi'
import { BsKanban } from 'react-icons/bs'

export default function Page({ children }) {
  return (
    <div className={styles.page}>
      <nav className={styles.nav}>
        <h1>
          {
            // eslint-disable-next-line
            <img src='/favicon.ico' alt='Logo' width={24} />
          }
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
          <NavLink href='/activities'>
            <>
              <FiActivity size={24} />
              Actividades
            </>
          </NavLink>
          <NavLink href='/work-orders'>
            <>
              <BsKanban size={24} />
              Órdenes de trabajo
            </>
          </NavLink>
        </ul>
      </nav>
      <div className={styles.container}>
        <Header />
        <main>{children}</main>
      </div>
    </div>
  )
}
