import { Text } from '@tremor/react'
import { useState } from 'react'
import NotificationIcon from '../icons/NotificationIcon'

export default function Notification() {
  const [show, setShow] = useState(false)

  const handleToggle = () => {
    setShow((show) => !show)
  }

  return (
    <div className='relative'>
      <button
        id='dropdownNotificationButton'
        data-dropdown-toggle='dropdownNotification'
        className='inline-flex items-center text-sm font-medium text-center text-slate-500 hover:text-slate-900 focus:outline-none'
        type='button'
        onClick={handleToggle}
      >
        <NotificationIcon className='w-6 h-6' />
        {/* <div className='relative flex'>
          <div className='relative inline-flex w-3 h-3 bg-red-500 border-2 border-white rounded-full -top-2 right-3'></div>
        </div> */}
      </button>

      <div
        id='dropdownNotification'
        className={`z-20 w-80 max-w-sm bg-white divide-y divide-slate-100 rounded-lg shadow ${
          show ? 'absolute right-1/2 top-full' : 'hidden'
        }`}
        aria-labelledby='dropdownNotificationButton'
      >
        <div className='block px-4 py-2 font-medium text-center text-slate-700 rounded-t-lg bg-slate-100'>
          Notificaciones
        </div>
        <div className='divide-y divide-slate-100'>
          <Text className='text-center p-2 text-slate-500'>
            No tiene notificaciones
          </Text>
        </div>
      </div>
    </div>
  )
}
