import Header from './Header'
import Sidebar from './Sidebar'

export default function Page({ children }) {
  const role = global.localStorage?.role

  return (
    <>
      <Sidebar>{children}</Sidebar>
      <div
        className={`flex flex-col gap-5 p-4 ${
          role != null ? 'sm:ml-64' : ''
        } bg-slate-50`}
      >
        <Header />
        <main>{children}</main>
      </div>
    </>
  )
}
