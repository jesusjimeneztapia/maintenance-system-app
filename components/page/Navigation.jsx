import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { Breadcrumb } from 'flowbite-react'
import ChevronRightIcon from '../icons/ChevronRightIcon'

const ROUTES = {
  '/': { href: '/', name: 'Inicio' },
  machines: { href: '/machines', name: 'Máquinas' },
  activities: { href: '/activities', name: 'Actividades' },
  stores: { href: '/stores', name: 'Repuestos' },
  register: { href: '/machines/register', name: 'Registro' },
  'work-orders': { href: '/work-orders', name: 'Órdenes de trabajo' },
  schedule: { href: '/schedule', name: 'Planificación' },
  historical: { href: '/historical', name: 'Históricos' },
  indicators: { href: '/indicators', name: 'Indicadores' },
  'maintenance-request': {
    href: '/maintenance-request',
    name: 'Solicitudes de mantenimiento',
  },
  'failure-report': {
    href: '/failure-report',
    name: 'Reportes de falla',
  },
}

const ROUTES_NAME = {
  edit: { name: 'Editar' },
  activities: { name: 'Actividades' },
  'add-store': { name: 'Añadir repuesto' },
  'add-engine': { name: 'Agregar motor' },
  'edit-engine': { name: 'Editar motor' },
  'create-activity': { name: 'Crear actividad' },
  'edit-activity': { name: 'Editar actividad' },
  'work-orders': { name: 'Órdenes de trabajo' },
  'create-work-order': { name: 'Crear' },
  draft: { name: 'Borradores' },
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
    let routes = asPath
      .replace(/\?.+/, '')
      .split('/')
      .filter((route) => !!route)

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
    <Breadcrumb className='overflow-x-auto'>
      {history.length > 0 && (
        <>
          {history.map(({ href, name }, index) => (
            <li key={name}>
              <div className='flex items-center w-max'>
                {index > 0 && (
                  <ChevronRightIcon className='w-5 h-5 text-slate-400' />
                )}
                <Link href={href}>
                  <a className='text-sm font-medium text-slate-600 hover:text-amber-600'>
                    {name}
                  </a>
                </Link>
              </div>
            </li>
          ))}
        </>
      )}
      <li aria-current='page'>
        <div className='flex items-center w-max'>
          {history.length > 0 && (
            <ChevronRightIcon className='w-5 h-5 text-slate-400' />
          )}
          <span className='text-sm font-medium text-slate-400'>{current}</span>
        </div>
      </li>
    </Breadcrumb>
  )
}
