import Link from 'next/link'
import { FiActivity, FiEdit } from 'react-icons/fi'
import { CgDatabase } from 'react-icons/cg'
import styles from '../../styles/machines/MachineCard.module.css'
import Criticality from './Criticality'
import { AREA_VALUES_MAP } from '../../schemas/machine'
import ActionLink from '../ActionLink'

export default function MachineCard({
  image,
  code,
  name,
  location,
  area,
  criticality,
  page,
}) {
  return (
    <tr className={styles.card}>
      <td className={styles.image}>
        {image ? (
          <img src={image} alt={name} /> // eslint-disable-line
        ) : (
          <CgDatabase />
        )}
      </td>
      <td className={styles.info}>
        <Link href={{ pathname: '/machines/[code]', query: { code } }}>
          <a>{code}</a>
        </Link>
        <span>{name}</span>
      </td>
      <td>{page === 'machines' ? location : AREA_VALUES_MAP[area]}</td>
      <td>
        <div className={styles.container}>
          <Criticality criticality={criticality} />
        </div>
      </td>
      <td>
        <div className={styles.container}>
          <ActionLink
            href={{
              pathname:
                page === 'machines'
                  ? '/machines/[code]/edit'
                  : '/activities/[code]',
              query: { code },
            }}
            variant={page === 'machines' ? 'primary' : 'warning'}
          >
            {page === 'machines' ? (
              <>
                <FiEdit />
                Editar
              </>
            ) : (
              <>
                <FiActivity />
                Ver actividades
              </>
            )}
          </ActionLink>
        </div>
      </td>
    </tr>
  )
}
