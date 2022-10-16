import Link from 'next/link'
import { FiArrowDown, FiArrowUp, FiArrowUpRight, FiEdit } from 'react-icons/fi'
import { CgDatabase } from 'react-icons/cg'
import styles from '../../styles/machines/MachineCard.module.css'

const CRITICALITY = {
  HIGH: (
    <div className={`${styles.container} ${styles.high}`}>
      <FiArrowUp />
      <span>Alta</span>
    </div>
  ),
  MEDIUM: (
    <div className={`${styles.container} ${styles.medium}`}>
      <FiArrowUpRight />
      <span>Media</span>
    </div>
  ),
  LOW: (
    <div className={`${styles.container} ${styles.low}`}>
      <FiArrowDown />
      <span>Baja</span>
    </div>
  ),
}

export default function MachineCard({
  image,
  code,
  name,
  location,
  criticality,
}) {
  return (
    <tr className={styles.card}>
      <td className={styles.image}>
        {image ? <img src={image} alt={name} /> : <CgDatabase />}
      </td>
      <td className={styles.info}>
        <Link href={{ pathname: '/machines/[code]', query: { code } }}>
          <a>{code}</a>
        </Link>
        <span>{name}</span>
      </td>
      <td>{location}</td>
      <td>{CRITICALITY[criticality]}</td>
      <td>
        <div className={styles.container}>
          <Link href={{ pathname: '/machines/[code]/edit', query: { code } }}>
            <a className={styles.edit}>
              <FiEdit />
              Editar
            </a>
          </Link>
        </div>
      </td>
    </tr>
  )
}
