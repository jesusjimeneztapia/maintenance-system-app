import { Button, TableCell } from '@tremor/react'
import { useState } from 'react'
import EditIcon from '../icons/EditIcon'

function DayValue({ mark, hours, timeString, onChange, active }) {
  const [show, setShow] = useState(false)
  const handleSubmit = (e) => {
    e.preventDefault()
    const hours = e.target.hour.value
    if (hours !== '') {
      onChange({ hours })
      setShow(false)
    }
  }
  if (mark) {
    return (
      <TableCell
        className={`text-center ${
          hours > 11
            ? 'bg-sky-500 text-slate-900'
            : 'bg-yellow-500 text-slate-50'
        }`}
      >
        {timeString}
      </TableCell>
    )
  }
  return (
    <TableCell className='p-0'>
      {active && (
        <form className='w-full flex gap-1' onSubmit={handleSubmit}>
          <input
            className='border-none bg-transparent m-0 h-auto focus:ring-0 w-16'
            name='hour'
            type='number'
            min='0'
            max='23'
            placeholder='--'
            onFocus={() => setShow(true)}
            onBlur={({ target: { value } }) => setShow(value !== '')}
          />
          {show && (
            <Button
              type='submit'
              variant='light'
              size='xs'
              icon={() => <EditIcon className='w-5 h-5' />}
            />
          )}
        </form>
      )}
    </TableCell>
  )
}

export default function DaysInput({
  firstDay,
  firstWeekDay,
  updateWorkOrder,
  code,
  daySchedule,
  state,
  strict,
}) {
  const date = daySchedule != null ? new Date(daySchedule) : null
  const day = date?.getDate()
  const hours = date?.getHours()
  const timeString = date?.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
  })

  const handleChange =
    (day) =>
    ({ hours }) => {
      const date = new Date(firstWeekDay)
      date.setDate(firstWeekDay.getDate() + day)
      date.setHours(hours)
      updateWorkOrder({
        id: code,
        workOrderOnScheduleDto: {
          daySchedule: date,
        },
      })
    }

  return (
    <>
      {[...Array(6)].map((_, index) => (
        <DayValue
          key={`${code}-${index}`}
          hours={hours}
          mark={day === firstDay + 1 + index}
          timeString={timeString}
          onChange={handleChange(index + 1)}
          active={!strict && state !== 'DONE'}
        />
      ))}
    </>
  )
}
