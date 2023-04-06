import Link from 'next/link'
import Button from '../Button'
import FilterDraftWorkOrderForm from './FilterDraftWorkOrderForm'

export default function DraftWorkOrderHeader({ title }) {
  return (
    <header
      style={{
        display: 'flex',
        alignItems: 'flex-end',
        justifyContent: 'space-between',
        marginBottom: '1.25rem',
      }}
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <h2
          style={{
            fontWeight: '500',
            lineHeight: '1.75rem',
            fontSize: '1.125rem',
          }}
        >
          {title}
        </h2>
        <FilterDraftWorkOrderForm />
      </div>
      <Button>
        <Link href='/work-orders/create-work-order'>
          <a>Crear Orden de trabajo</a>
        </Link>
      </Button>
    </header>
  )
}
