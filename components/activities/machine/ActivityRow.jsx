import { AiOutlineDelete } from 'react-icons/ai'
import { FiEdit } from 'react-icons/fi'
import { useToast } from '../../../context/providers/ToastContext'
import styles from '../../../styles/activities/machine/ActivityRow.module.css'
import Button from '../../Button'
import axios from 'redaxios'
import { getFrequencyName } from '../../../schemas/activity'
import { deleteActivityByCodeUrlInternal } from '../../../services/activityServices'
import ActionLink from '../../ActionLink'

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
        await axios.delete(deleteActivityByCodeUrlInternal(code), {
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
      <td className={styles['text-center']}>{code}</td>
      <td>{name}</td>
      <td className={styles['text-center']}>{getFrequencyName(frequency)}</td>
      <td>
        <div className={styles.actions}>
          <ActionLink
            href={{
              pathname: '/activities/[machineCode]/edit-activity',
              query: { machineCode, code },
            }}
            variant='primary'
          >
            <FiEdit />
            Editar
          </ActionLink>
          <ActionLink variant='danger' onClick={handleDelete}>
            <AiOutlineDelete />
            Eliminar
          </ActionLink>
        </div>
      </td>
    </tr>
  )
}
