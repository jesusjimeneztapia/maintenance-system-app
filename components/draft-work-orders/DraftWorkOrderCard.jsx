import { useState } from 'react'
import { dateLocaleString } from '../../libs/date'
import { WORK_ORDER_PRIORITY_VALUES_MAP } from '../../schemas/workOrder'
import Button from '../Button'
import ReportBox from '../ReportBox'
import Select from '../Select'
import { useToast } from '../../context/providers/ToastContext'
import axios from 'redaxios'
import { DRAFT_WORK_ORDER_URL_INTERNAL } from '../../services/draftWorkOrderService'

export default function DraftWorkOrderCard({
  code,
  activityName,
  machineName,
  plannedDay,
  priority,
  handleDelete,
}) {
  const { showToast, reset, request } = useToast()
  const [data, setData] = useState({ priority })

  const handleChange = ({ target: { name, value } }) => {
    setData((data) => ({ ...data, [name]: value }))
  }

  const remove = async () => {
    const response = await request(
      async () => {
        return await axios.delete(
          `${DRAFT_WORK_ORDER_URL_INTERNAL}/${code}/delete`
        )
      },
      {
        color: 'success',
        autoClose: true,
        close: true,
        children: 'La órden de trabajo se eliminó exitósamente',
      }
    )

    if (response) {
      handleDelete()
    }
  }

  const handleRemove = () => {
    showToast({
      color: 'secondary',
      autoClose: false,
      close: false,
      position: 'center',
      children: (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <p>¿Seguro que quiere eliminar la órden de trabajo en borrador?</p>
          <footer
            style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px' }}
          >
            <Button onClick={remove}>Si</Button>
            <Button variant='danger' onClick={reset}>
              No
            </Button>
          </footer>
        </div>
      ),
    })
  }

  const submit = async () => {
    const response = await request(
      async () => {
        return await axios.put(`${DRAFT_WORK_ORDER_URL_INTERNAL}/${code}`, data)
      },
      {
        color: 'secondary',
        position: 'center',
        autoClose: true,
        close: true,
        children: 'La órden de trabajo se está creando...',
      }
    )

    if (response) {
      showToast({
        color: 'success',
        position: 'center',
        autoClose: true,
        close: true,
        children: 'La órden de trabajo se creó exitósamente',
      })
      handleDelete()
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    showToast({
      color: 'secondary',
      position: 'right',
      autoClose: false,
      close: false,
      children: (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <p>¿Seguro que quiere crear la órden de trabajo?</p>
          <footer
            style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px' }}
          >
            <Button onClick={submit}>Si</Button>
            <Button variant='danger' onClick={reset}>
              No
            </Button>
          </footer>
        </div>
      ),
    })
  }

  return (
    <article
      style={{
        width: '320px',
        backgroundColor: 'rgb(var(--color-white))',
        padding: '0.5rem',
        display: 'flex',
        flexDirection: 'column',
        gap: '0.75rem',
        borderRadius: '0.25rem',
      }}
    >
      <header
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '0.25rem',
        }}
      >
        <p
          style={{
            fontSize: '14px',
            color: 'rgb(var(--color-slate-900) / .75)',
          }}
        >
          {machineName}
        </p>
        <h3 style={{ lineHeight: '1.25' }}>{activityName}</h3>
      </header>
      <form
        onSubmit={handleSubmit}
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '0.75rem',
        }}
      >
        <Select
          id={`priority-${code}`}
          name='priority'
          label='Prioridad'
          value={data.priority}
          optionsMap={WORK_ORDER_PRIORITY_VALUES_MAP}
          onChange={handleChange}
        />
        <div style={{ display: 'flex', gap: '8px' }}>
          <Button variant='primary' type='submit'>
            Crear
          </Button>
          <Button onClick={handleRemove} variant='danger' type='button'>
            Eliminar
          </Button>
        </div>
      </form>
      <footer style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <ReportBox variant='secondary'>
          {dateLocaleString(plannedDay, true)}
        </ReportBox>
      </footer>
    </article>
  )
}
