import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

function useNavLink({ href, exact }) {
  const { pathname } = useRouter()
  const [className, setClassName] = useState('')

  useEffect(() => {
    const regExp = new RegExp(`^${href}${exact ? '$' : ''}`)
    setClassName(() =>
      regExp.test(pathname)
        ? 'cursor-default bg-gray-100 text-gray-500 before:absolute before:w-10 before:h-10 before:bg-transparent before:-right-5 before:bottom-full before:rounded-full before:shadow-[20px_20px_0_rgb(243,244,246),0px_40px_0_rgb(243,244,246)] after:w-10 after:h-10 after:absolute after:bg-transparent after:-right-5 after:top-full after:rounded-full after:shadow-[20px_-20px_0_rgb(243,244,246)]'
        : 'cursor-pointer text-gray-100 hover:bg-gray-100/25 before:absolute before:w-5 hover:before:h-10 before:bg-gray-100/25 before:left-full before:top-0'
    )
  }, [pathname, href, exact])

  return className
}

export default function NavLink({ children, href, exact = false }) {
  const className = useNavLink({ href, exact })

  return (
    <li className='flex'>
      <Link href={href}>
        <a
          className={`relative px-3 py-2 rounded-l-full w-full flex gap-3 items-center ${className}`}
        >
          {children}
        </a>
      </Link>
    </li>
  )
}
