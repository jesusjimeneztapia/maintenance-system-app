import Head from 'next/head'
import NavLink from './NavLink'
import { AiOutlineHome } from 'react-icons/ai'
import { CgDatabase } from 'react-icons/cg'
import Header from './Header'

export default function Page({ children, title = 'TECNOPOR S.A.' }) {
  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <div className='min-h-screen bg-gray-500 flex px-5 py-4 gap-5'>
        <nav className='flex flex-col gap-8 min-w-max'>
          <h1 className='px-5 py-4 border-b border-gray-400 flex items-center gap-3'>
            <img src='/favicon.ico' alt='Logo' width={24} />
            <span className='font-bold text-xl'>TECNOPOR S.A.</span>
          </h1>
          <ul className='flex flex-col gap-1'>
            <NavLink href='/' exact>
              <>
                <AiOutlineHome size={24} />
                Inicio
              </>
            </NavLink>
            <NavLink href='/machines'>
              <>
                <CgDatabase size={24} />
                Máquinas
              </>
            </NavLink>
          </ul>
        </nav>
        <div className='flex flex-col gap-5 bg-gray-100 rounded-3xl w-full p-5'>
          <Header />
          <main>{children}</main>
        </div>
      </div>
    </>
  )
}
