import Navigation from './Navigation'
import { Flex } from '@tremor/react'
import User from '../User'

export default function Header() {
  const role = global.localStorage?.getItem('role')

  if (role == null) {
    return <></>
  }

  return (
    <Flex className='border-b pb-4 gap-2'>
      <Navigation />
      <User />
    </Flex>
  )
}
