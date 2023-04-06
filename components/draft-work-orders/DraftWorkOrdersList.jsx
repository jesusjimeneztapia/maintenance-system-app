import { useSchedule } from '../../context/providers/ScheduleContext'
import DraftWorkOrderCard from './DraftWorkOrderCard'

export default function DraftWorkOrdersList() {
  const { draftWorkOrders, deleteDraftWorkOrderByCode } = useSchedule()
  const handleDeleteDraftWorkOrder = (draftWorkOrderCode) => () => {
    deleteDraftWorkOrderByCode(draftWorkOrderCode)
  }

  return (
    <section
      style={{
        width: '100%',
        padding: '1.25rem',
        backgroundColor: 'rgb(var(--color-primary))',
        borderRadius: '0.375rem',
      }}
    >
      <div
        style={{
          display: 'flex',
          gap: '24px',
          flexWrap: 'wrap',
          justifyContent: 'center',
        }}
      >
        {draftWorkOrders.length < 1 ? (
          <p
            style={{
              color: 'rgb(var(--color-white))',
              textAlign: 'center',
              width: '100%',
            }}
          >
            No existen órdenes de trabajo en borrador.
          </p>
        ) : (
          draftWorkOrders.map(({ code, ...rest }) => (
            <DraftWorkOrderCard
              key={code}
              handleDelete={handleDeleteDraftWorkOrder(code)}
              code={code}
              {...rest}
            />
          ))
        )}
      </div>
    </section>
  )
}
