import { CgDatabase } from 'react-icons/cg'
import { FiActivity } from 'react-icons/fi'
import { FcAddDatabase } from 'react-icons/fc'
import HomeLink from '../components/home/HomeLink'
import Page from '../components/page'

export default function Home() {
  return (
    <Page title='Sistema de mantenimiento | TECNOPOR S.A.'>
      <h2>
        TECNOPOR S.A.{' '}
        <span style={{ display: 'block', fontSize: '1rem' }}>
          Sistema de mantenimiento
        </span>
      </h2>
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '1.25rem',
          maxWidth: '960px',
          width: '100%',
          margin: '2rem auto',
          flexWrap: 'wrap',
        }}
      >
        <HomeLink href='/machines'>
          <CgDatabase size={64} />
          Máquinas
        </HomeLink>
        <HomeLink href='/machines/register'>
          <FcAddDatabase size={64} />
          Registrar Máquina
        </HomeLink>
        <HomeLink href='/activities'>
          <FiActivity size={64} />
          Actividades
        </HomeLink>
      </div>
    </Page>
  )
}
