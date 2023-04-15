import Link from 'next/link'
import { Icon, Text } from '@tremor/react'

export default function HomeLink({ href, title, icon }) {
  return (
    <Link href={href}>
      <a className='flex flex-col items-center justify-center w-44 h-44 p-6 bg-white border border-gray-200 rounded-lg shadow text-gray-500 hover:bg-gray-100 hover:text-gray-900'>
        <Icon className='text-inherit' icon={icon} size='xl' />
        <Text className='text-inherit'>{title}</Text>
      </a>
    </Link>
  )
}
