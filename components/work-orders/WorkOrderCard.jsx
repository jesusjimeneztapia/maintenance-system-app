import { FiArrowDown, FiArrowUp, FiArrowUpRight } from 'react-icons/fi'
import { VscEdit } from 'react-icons/vsc'
import { dateLocaleString } from '../../libs/date'
import styles from '../../styles/work-orders/WorkOrderCard.module.css'
import ReportBox from '../ReportBox'

const PRIORITY = {
  URGENT: (
    <ReportBox variant='danger'>
      <FiArrowUp />
      <span>Urgente</span>
    </ReportBox>
  ),
  IMPORTANT: (
    <ReportBox variant='warning'>
      <FiArrowUpRight />
      <span>Importante</span>
    </ReportBox>
  ),
  NORMAL: (
    <ReportBox variant='success'>
      <FiArrowDown />
      <span>Normal</span>
    </ReportBox>
  ),
}

export function Priority({ priority }) {
  return <>{PRIORITY[priority]}</>
}

export default function WorkOrderCard({
  activity,
  priority,
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
        <Priority priority={priority} />
        <span>{dateLocaleString(createdAt)}</span>
      </footer>
    </article>
  )
}
