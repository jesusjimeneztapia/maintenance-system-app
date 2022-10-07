import { IoMdNotificationsOutline } from 'react-icons/io'

export default function Header() {
  return (
    <header className='flex items-center justify-between pb-4 border-b border-gray-400'>
      <div>
        <span>Aplicación &gt;</span>
        <span>Máquinas &gt;</span>
        <span>Registro</span>
      </div>
      <div className='flex items-center gap-5'>
        <IoMdNotificationsOutline size={24} />
        <div className='relative w-8 h-8 bg-gray-500 rounded-full'>
          <span className='text-2xl font-medium text-gray-100 absolute left-1/2 -translate-x-1/2 leading-none top-1/2 -translate-y-1/2'>
            A
          </span>
        </div>
      </div>
    </header>
  )
}
