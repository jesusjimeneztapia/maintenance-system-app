import Input from '../Input'
import { Button } from '@tremor/react'

export default function FilterScheduleForm({
  defaultDate,
  onChange,
  onSubmit,
}) {
  const handleSubmit = async (e) => {
    e.preventDefault()
    const date = e.target.date.value
    await onSubmit(date)
  }

  return (
    <form className='flex gap-3 max-sm:self-end' onSubmit={handleSubmit}>
      <Input
        id='date'
        type='date'
        onChange={onChange}
        defaultValue={defaultDate}
        required
      />

      <Button type='submit' color='amber'>
        Filtrar
      </Button>
    </form>
  )
}
