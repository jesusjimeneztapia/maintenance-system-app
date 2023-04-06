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

export default function Schedule({
  draftWorkOrders,
  message,
  year,
  month,
  day,
}) {
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
        <>{component}</>
      ) : (
        <ScheduleProvider
          year={year}
          month={month}
          day={day}
          draftWorkOrders={draftWorkOrders}
        >
          <DraftWorkOrderHeader title={title} />
          <DraftWorkOrdersList />
        </ScheduleProvider>
      )}
    </>
  )
}

export async function getServerSideProps(context) {
  const { query } = context
  const { data: draftWorkOrders, message } = await requestInternalApi(context, {
    method: HTTP_METHODS.GET,
    url: DRAFT_WORK_ORDER_URL_REGULAR,
    params: { ...query },
  })

  const now = new Date()
  const year = query.year ? Number(query.year) : now.getFullYear()
  const month = query.month ? Number(query.month) : now.getMonth()
  const day = query.day ? Number(query.day) : now.getDate()

  return {
    props: { draftWorkOrders, message, year, month, day },
  }
}
