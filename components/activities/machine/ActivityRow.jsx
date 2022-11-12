import Link from 'next/link'
import { AiOutlineDelete } from 'react-icons/ai'
import { FiEdit } from 'react-icons/fi'
import { useToast } from '../../../context/providers/ToastContext'
import styles from '../../../styles/activities/machine/ActivityRow.module.css'
import Button from '../../Button'
import axios from 'redaxios'
import { getFrequencyLabel } from '../../../schemas/activity'

export default function ActivityRow({
  code,
  name,
  frequency,
  machineCode,
  activityType,
  deleteActivity,
}) {
  const { showToast, reset, request } = useToast()

  const autoDelete = async () => {
    const response = await request(
      async () => {
        await axios.delete(`/api/activities/${code}/delete`, {
          params: { machineCode },
        })
        return true
      },
      {
        autoClose: true,
        close: true,
        color: 'success',
        position: 'center',
        children: 'La actividad se eliminó exitósamente',
      }
    )
    if (response) {
      deleteActivity({ code, activityType })
    }
  }

  const handleDelete = () => {
    showToast({
      autoClose: false,
      close: false,
      color: 'secondary',
      position: 'right',
      children: (
        <section className={styles.modal}>
          <h4>Eliminar actividad {code}</h4>
          <p>¿Seguro que quiere eliminar la actividad?</p>
          <div>
            <Button variant='primary' onClick={autoDelete}>
              Si
            </Button>
            <Button variant='danger' onClick={reset}>
              No
            </Button>
          </div>
        </section>
      ),
    })
  }

  return (
    <tr>
      <td style={{ textAlign: 'center' }}>{code}</td>
      <td>{name}</td>
      <td style={{ textAlign: 'center' }}>{getFrequencyLabel(frequency)}</td>
      <td>
        <div className={styles.actions}>
          <Link
            href={{
              pathname: '/activities/[machineCode]/edit-activity',
              query: { machineCode, code },
            }}
          >
            <a className={styles.edit}>
              <FiEdit />
              Editar
            </a>
          </Link>
          <span className={styles.delete} onClick={handleDelete}>
            <AiOutlineDelete />
            Eliminar
          </span>
        </div>
      </td>
    </tr>
  )
}
