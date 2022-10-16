import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import styles from '../../styles/Navigation.module.css'

const ROUTES = {
  '/': { href: '/', name: 'Inicio' },
  machines: { href: '/machines', name: 'Máquinas' },
  register: { href: '/machines/register', name: 'Registro' },
}

const ROUTES_NAME = {
  edit: { name: 'Editar' },
}

function generateRoute(pathname, current) {
  const preview = pathname.split(current)[0]
  return {
    href: `${preview}${current}`,
    name: decodeURI(current),
  }
}

function useNavigation() {
  const { asPath } = useRouter()
  const [navigation, setNavigation] = useState({ history: [], current: '/' })

  useEffect(() => {
    let routes = asPath.split('/').filter((route) => !!route)

    let history = []
    let current = routes.pop() ?? 'Inicio'
    if (current !== 'Inicio') {
      const route = ROUTES[current] ?? ROUTES_NAME[current]
      current = route ? route.name : decodeURI(current)
    }

    if (routes.length > 0 || current !== 'Inicio') {
      routes = routes.map(
        (route) => ROUTES[route] ?? generateRoute(asPath, route)
      )
      history = [ROUTES['/'], ...routes]
    }
    setNavigation({ history, current })
  }, [asPath])

  return navigation
}

export default function Navigation() {
  const { history, current } = useNavigation()

  return (
    <ul className={styles.navigation}>
      {history.length > 0 && (
        <>
          {history.map(({ href, name }) => (
            <li key={name}>
              <Link href={href}>{name}</Link>
            </li>
          ))}
        </>
      )}
      <li>{current}</li>
    </ul>
  )
}
