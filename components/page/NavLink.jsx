import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import styles from '../../styles/NavLink.module.css'

function useNavLink({ href, exact }) {
  const { pathname } = useRouter()
  const [active, setActive] = useState(false)

  useEffect(() => {
    const regExp = new RegExp(`^${href}${exact ? '$' : ''}`)
    setActive(regExp.test(pathname))
  }, [pathname, href, exact])

  return active
}

export default function NavLink({ children, href, exact = false }) {
  const active = useNavLink({ href, exact })

  return (
    <li className={`${styles.link} ${active && styles.active}`}>
      <Link href={href}>
        <a>{children}</a>
      </Link>
    </li>
  )
}
