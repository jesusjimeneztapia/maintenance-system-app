import { Dropdown } from 'flowbite-react'
import { logout } from '../services/authServices'
import { useRouter } from 'next/router'

export default function User() {
  const router = useRouter()
  const role = global.localStorage?.getItem('role')

  const handleClick = async () => {
    await logout()
    localStorage.clear()
    router.push('/login')
  }

  if (role == null) {
    return <></>
  }

  return (
    <>
      <Dropdown label={role === 'admin' ? 'Admin' : 'Operador'}>
        <Dropdown.Item>
          <button onClick={handleClick}>Cerrar Sesión</button>
        </Dropdown.Item>
      </Dropdown>
    </>
  )
}
