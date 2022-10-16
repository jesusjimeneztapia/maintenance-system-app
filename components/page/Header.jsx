import { IoMdNotificationsOutline } from 'react-icons/io'
import styles from '../../styles/Header.module.css'
import Navigation from './Navigation'

export default function Header() {
  return (
    <header className={styles.header}>
      <Navigation />
      <div className={styles.options}>
        <IoMdNotificationsOutline size={24} />
        <div>
          <span>A</span>
        </div>
      </div>
    </header>
  )
}
