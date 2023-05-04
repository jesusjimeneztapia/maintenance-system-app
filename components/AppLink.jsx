import Link from 'next/link'

const COLORS = {
  gray: 'text-gray-500 hover:text-gray-700',
  rose: 'text-rose-500 hover:text-rose-700',
}

export default function AppLink({ href, children, color = 'gray' }) {
  return (
    <Link href={href}>
      <a
        className={`inline-flex items-center justify-center text-sm font-medium ${COLORS[color]}`}
      >
        {children}
      </a>
    </Link>
  )
}
