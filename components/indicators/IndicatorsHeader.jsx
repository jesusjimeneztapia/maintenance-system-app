import { Button, Flex, Title } from '@tremor/react'
import Input from '../Input'
import { useIndicators } from '../../store/indicators'

export default function IndicatorsHeader() {
  const [date, fetchIndicators, setDate] = useIndicators((state) => [
    state.date,
    state.fetchIndicators,
    state.setDate,
  ])

  const handleDate = ({ target: { value } }) => {
    setDate(value)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    await fetchIndicators()
  }

  return (
    <Flex
      className='mb-5 gap-2 max-sm:flex-col max-sm:items-end'
      alignItems='center'
    >
      <Title className='w-full'>Indicadores</Title>
      <form className='flex w-fit gap-2 justify-end' onSubmit={handleSubmit}>
        <Input type='date' value={date} onChange={handleDate} />
        <Button color='amber'>Filtrar</Button>
      </form>
    </Flex>
  )
}
