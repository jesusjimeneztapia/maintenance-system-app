import TableBordered from '../../TableBordered'
import ActivityRow from './ActivityRow'
import styles from '../../../styles/activities/machine/TableActivities.module.css'

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
          <th className={styles.title} colSpan={4}>
            {title}
          </th>
        </tr>
      </thead>
      <tbody>
        {activities.length === 0 ? (
          <tr>
            <td className={styles.message} colSpan={4}>
              No existe ninguna actividad en esta sección
            </td>
          </tr>
        ) : (
          <>
            <tr className={styles.header}>
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
