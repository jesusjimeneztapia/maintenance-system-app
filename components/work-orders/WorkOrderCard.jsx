import { VscEdit } from 'react-icons/vsc'
import { dateLocaleString } from '../../libs/date'
import styles from '../../styles/work-orders/WorkOrderCard.module.css'
import Criticality from '../machines/Criticality'

export default function WorkOrderCard({
  activity,
  machine,
  createdAt,
  editHandleChange,
}) {
  return (
    <article className={styles.card}>
      <header className={styles.header}>
        <p>{activity.name}</p>
        <VscEdit className={styles.edit} onClick={editHandleChange} />
      </header>
      <footer className={styles.footer}>
        <Criticality criticality={machine.criticality} />
        <span>{dateLocaleString(createdAt)}</span>
      </footer>
    </article>
  )
}
