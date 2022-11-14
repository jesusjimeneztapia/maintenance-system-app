import MachineCard from './MachineCard'
import styles from '../../styles/machines/MachineList.module.css'

export default function MachineList({ machines, page }) {
  return (
    <div>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Imagen</th>
            <th>Máquina</th>
            <th>{page === 'machines' ? 'Ubicación' : 'Área'}</th>
            <th className={styles['text-center']}>Criticidad</th>
            <th className={styles['text-center']}>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {machines.map(({ code, ...rest }) => (
            <MachineCard key={code} code={code} page={page} {...rest} />
          ))}
        </tbody>
      </table>
    </div>
  )
}
