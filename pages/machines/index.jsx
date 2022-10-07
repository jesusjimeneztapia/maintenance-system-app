import Link from 'next/link'
import Page from '../../components/page'

export default function Machines() {
  return (
    <Page title='Máquinas | TECNOPOR S.A.'>
      <h2 className='font-bold text-3xl'>Máquinas</h2>
      <Link href='/machines/register'>
        <a className='text-blue-400 hover:text-blue-600 hover:underline'>
          Registrar máquina
        </a>
      </Link>
    </Page>
  )
}
