import Header from './Header'
import Sidebar from './Sidebar'

export default function Page({ children }) {
  return (
    <>
      <Sidebar>{children}</Sidebar>
      <div className='flex flex-col gap-5 p-4 sm:ml-64 bg-slate-50'>
        <Header />
        <main>{children}</main>
      </div>
    </>
  )
}
