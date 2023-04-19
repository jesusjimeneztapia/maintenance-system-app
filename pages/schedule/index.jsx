import Head from 'next/head'
import React from 'react'
import DraftWorkOrderHeader from '../../components/draft-work-orders/DraftWorkOrderHeader'
import DraftWorkOrdersList from '../../components/draft-work-orders/DraftWorkOrdersList'
import ScheduleProvider from '../../context/providers/ScheduleContext'
import useBeforeRenderPage from '../../hooks/useBeforeRenderPage'
import { createDocumentTitle } from '../../libs/documentTitle'
import { HTTP_METHODS } from '../../services'
import { DRAFT_WORK_ORDER_URL_REGULAR } from '../../services/draftWorkOrderService'
import { requestInternalApi } from '../../services/requestApi'
import { Title } from '@tremor/react'

export default function Schedule({ draftWorkOrders, message, date }) {
  const { component, title } = useBeforeRenderPage({
    message,
    title: 'Planificación',
  })

  return (
    <>
      <Head>
        <title>{createDocumentTitle(title)}</title>
      </Head>
      {component ? (
        <>
          <Title className='mb-5'>{title}</Title>
          {component}
        </>
      ) : (
        <ScheduleProvider date={date} draftWorkOrders={draftWorkOrders}>
          <DraftWorkOrderHeader title={title} />
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
