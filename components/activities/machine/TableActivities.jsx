import TableBordered from '../../TableBordered'
import ActivityRow from './ActivityRow'

export default function TableActivities({
  title,
  activities,
  machineCode,
  deleteActivity,
}) {
  return (
    <TableBordered>
      <thead>
        <tr>
          <th style={{ textAlign: 'center' }} colSpan={4}>
            {title}
          </th>
        </tr>
      </thead>
      <tbody>
        {activities.length === 0 ? (
          <tr>
            <td
              colSpan={4}
              style={{
                textAlign: 'center',
                fontSize: '0.875rem',
                color: 'var(--slate-600)',
              }}
            >
              No existe ninguna actividad en esta sección
            </td>
          </tr>
        ) : (
          <>
            <tr style={{ fontWeight: '500', textAlign: 'center' }}>
              <td>Código</td>
              <td>Nombre</td>
              <td>Frecuencia</td>
              <td>Acciones</td>
            </tr>
            {activities.map(({ code, name, frequency, activityType }) => (
              <ActivityRow
                key={code}
                code={code}
                name={name}
                frequency={frequency}
                machineCode={machineCode}
                activityType={activityType}
                deleteActivity={deleteActivity}
              />
            ))}
          </>
        )}
      </tbody>
    </TableBordered>
  )
}
