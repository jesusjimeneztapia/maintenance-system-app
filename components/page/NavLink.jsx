import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

function useNavLink({ href, exact }) {
  const { pathname } = useRouter()
  const [active, setActive] = useState(false)

  useEffect(() => {
    const regExp = new RegExp(`^${href}${exact ? '$' : ''}`)
    setActive(regExp.test(pathname))
  }, [pathname, href, exact])

  return active
}

export default function NavLink({ href, icon: Icon, text, exact = false }) {
  const active = useNavLink({ href, exact })

  return (
    <li>
      <Link href={href}>
        <a
          className={`flex items-center p-2 rounded-lg ${
            active
              ? 'text-rose-500 bg-slate-50 pointer-events-none'
              : 'text-slate-50 hover:bg-slate-50/20'
          }`}
        >
          <Icon className='w-6 h-6 text-inherit transition duration-75' />
          <span className='ml-3'>{text}</span>
        </a>
      </Link>
    </li>
  )
}
