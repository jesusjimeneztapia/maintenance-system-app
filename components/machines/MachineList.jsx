import MachineCard from './MachineCard'
import styles from '../../styles/machines/MachineList.module.css'

export default function MachineList({ machines }) {
  return (
    <div>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Imagen</th>
            <th>Máquina</th>
            <th>Ubicación</th>
            <th className={styles['text-center']}>Criticidad</th>
            <th className={styles['text-center']}>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {machines.map(({ code, ...rest }) => (
            <MachineCard key={code} code={code} {...rest} />
          ))}
        </tbody>
      </table>
    </div>
  )
}
