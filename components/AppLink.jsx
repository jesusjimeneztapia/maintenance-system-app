import Link from 'next/link'

const COLORS = {
  rose: 'focus:ring-rose-300 border-rose-500 text-rose-500 hover:bg-rose-100',
  gray: 'focus:ring-gray-300 border-gray-500 text-gray-500 hover:bg-gray-100',
  blue: 'focus:ring-blue-300 border-blue-500 text-blue-500 hover:bg-blue-100',
  amber:
    'focus:ring-amber-300 border-amber-500 text-amber-500 hover:bg-amber-100',
}

export default function AppLink({
  href,
  icon: Icon,
  children,
  color = 'rose',
}) {
  return (
    <Link href={href}>
      <a
        className={`
              inline-flex items-center justify-center gap-2
              whitespace-nowrap rounded-md border shadow-sm font-medium px-4 py-2 text-sm bg-transparent
              focus:outline-none focus:ring-2 focus:ring-offset-2
              ${COLORS[color]}
            `}
      >
        {Icon && <Icon className='text-inherit w-5 h-5' />}
        {children}
      </a>
    </Link>
  )
}
