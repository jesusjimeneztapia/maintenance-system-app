import Head from 'next/head'
import useBeforeRenderPage from '../../hooks/useBeforeRenderPage'
import { createDocumentTitle } from '../../libs/documentTitle'
import { Title } from '@tremor/react'
import ScheduleProvider, {
  useSchedule,
} from '../../context/providers/ScheduleContext'
import DraftWorkOrdersList from '../../components/draft-work-orders/DraftWorkOrdersList'
import ScheduleHeader from '../../components/schedule/ScheduleHeader'
import { HTTP_METHODS } from '../../services'
import { DRAFT_WORK_ORDER_URL_REGULAR } from '../../services/draftWorkOrderService'
import { requestInternalApi } from '../../services/requestApi'
import axios from 'redaxios'
import { useToast } from '../../store/toast'

function useFilterDraftWorkOrderForm() {
  const { date, setDate, setDraftWorkOrders } = useSchedule()
  const request = useToast((state) => state.request)

  const handleChange = (date) => {
    setDate(date)
  }

  const onSubmit = async (date) => {
    const response = await request(async () => {
      const [year, month, day] = date.split('-')
      const { data } = await axios.get('/api/work-orders/draft', {
        params: { date: new Date(+year, month - 1, +day) },
      })
      return data
    })

    if (response) {
      setDraftWorkOrders(response)
    }
  }

  return { date, handleChange, onSubmit }
}

function Header({ title, defaultDate }) {
  const { handleChange, onSubmit } = useFilterDraftWorkOrderForm()

  return (
    <ScheduleHeader
      title={title}
      handleChangeDate={handleChange}
      handleSubmit={onSubmit}
      defaultDate={defaultDate}
    />
  )
}

export default function DraftWorkOrderPage({ draftWorkOrders, message, date }) {
  const { component, title } = useBeforeRenderPage({
    message,
    title: ['Planificación', 'Órdenes de trabajo en borrador'],
  })

  return (
    <>
      <Head>
        <title>{createDocumentTitle(title)}</title>
      </Head>
      {component ? (
        <>
          <Title className='mb-5'>Órdenes de trabajo en borrador</Title>
          {component}
        </>
      ) : (
        <ScheduleProvider date={date} draftWorkOrders={draftWorkOrders}>
          <Header title='Órdenes de trabajo en borrador' defaultDate={date} />
          <DraftWorkOrdersList />
        </ScheduleProvider>
      )}
    </>
  )
}

export async function getServerSideProps(context) {
  let { date } = context.query
  date = new Date(date)
  if (date.toString().toLowerCase() === 'invalid date') {
    date = new Date()
  }
  const { data: draftWorkOrders, message } = await requestInternalApi(context, {
    method: HTTP_METHODS.GET,
    url: DRAFT_WORK_ORDER_URL_REGULAR,
    params: { date },
  })

  return {
    props: {
      draftWorkOrders,
      message,
      date: date.toISOString().replace(/T.+/, ''),
    },
  }
}
