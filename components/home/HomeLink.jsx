import Link from 'next/link'
import styles from '../../styles/home/HomeLink.module.css'

export default function HomeLink({ href, children }) {
  return (
    <Link href={href}>
      <a className={styles.link}>{children}</a>
    </Link>
  )
}
