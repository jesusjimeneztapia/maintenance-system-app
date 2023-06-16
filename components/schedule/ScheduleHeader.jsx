import { Flex, Title } from '@tremor/react'
import FilterScheduleForm from './FilterScheduleForm'
import AppLink from '../AppLink'

export default function ScheduleHeader({
  title,
  defaultDate,
  handleChangeDate,
  handleSubmit,
  showDraft,
}) {
  return (
    <Flex className='mb-5 gap-3' flexDirection='col' alignItems='end'>
      <Flex className='max-sm:flex-col max-sm:items-start max-sm:gap-3'>
        <Title>{title}</Title>
        <FilterScheduleForm
          defaultDate={defaultDate}
          onChange={({ target: { value } }) => handleChangeDate(value)}
          onSubmit={handleSubmit}
        />
      </Flex>
      <Flex className='gap-3 flex-wrap' justifyContent='end'>
        <AppLink href='/work-orders/create-work-order'>
          Crear órden de trabajo
        </AppLink>
        {showDraft && (
          <AppLink href='/schedule/draft' color='blue'>
            Ver borradores
          </AppLink>
        )}
      </Flex>
    </Flex>
  )
}
