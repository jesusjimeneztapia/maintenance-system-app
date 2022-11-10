import Link from 'next/link'
import { FiActivity, FiEdit } from 'react-icons/fi'
import { CgDatabase } from 'react-icons/cg'
import styles from '../../styles/machines/MachineCard.module.css'
import Criticality from './Criticality'

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
      <td>
        <div className={styles.container}>
          <Criticality criticality={criticality} />
        </div>
      </td>
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
      <td>
        <div className={styles.container}>
          <Link href={{ pathname: '/activities/[code]', query: { code } }}>
            <a className={styles.activity}>
              <FiActivity />
              Ver actividades
            </a>
          </Link>
        </div>
      </td>
    </tr>
  )
}
