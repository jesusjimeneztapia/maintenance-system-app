import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import styles from '../../styles/Navigation.module.css'

const ROUTES = {
  '/': { href: '/', name: 'Inicio' },
  machines: { href: '/machines', name: 'Máquinas' },
  activities: { href: '/activities', name: 'Actividades' },
  register: { href: '/machines/register', name: 'Registro' },
  'work-orders': { href: '/work-orders', name: 'Órdenes de trabajo' },
}

const ROUTES_NAME = {
  edit: { name: 'Editar' },
  activities: { name: 'Actividades' },
  'add-engine': { name: 'Agregar motor' },
  'edit-engine': { name: 'Editar motor' },
  'create-activity': { name: 'Crear actividad' },
  'edit-activity': { name: 'Editar actividad' },
  'work-orders': { name: 'Órdenes de trabajo' },
  'create-work-order': { name: 'Crear orden de trabajo' },
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
      current = current.split('?')[0]
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
