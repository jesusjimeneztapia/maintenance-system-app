import Navigation from './Navigation'
import { Flex } from '@tremor/react'
import Notification from './Notification'

export default function Header() {
  return (
    <Flex className='border-b pb-4 gap-2'>
      <Navigation />
      <Notification />
    </Flex>
  )
}
