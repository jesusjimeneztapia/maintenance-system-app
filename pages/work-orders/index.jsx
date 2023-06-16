import Head from 'next/head'
import KanbanBoard from '../../components/work-orders/KanbanBoard'
import WorkOrderListProvider from '../../context/providers/WorkOrderListContext'
import useBeforeRenderPage from '../../hooks/useBeforeRenderPage'
import { createDocumentTitle } from '../../libs/documentTitle'
import { HTTP_METHODS } from '../../services'
import { requestInternalApi } from '../../services/requestApi'
import { WORK_ORDER_URL_REGULAR } from '../../services/workOrderService'
import { Flex, Title } from '@tremor/react'
import AppLink from '../../components/AppLink'

export default function WorkOrders({ workOrders, message }) {
  const { component, title } = useBeforeRenderPage({
    message,
    title: 'Órdenes de trabajo',
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
        <>
          <Flex className='mb-5 max-sm:flex-col max-sm:items-start'>
            <Title>{title}</Title>
            <AppLink href='/work-orders/create-work-order'>
              Crear órden de trabajo
            </AppLink>
          </Flex>
          <WorkOrderListProvider allWorkOrders={workOrders}>
            <KanbanBoard />
          </WorkOrderListProvider>
        </>
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
  const { data: workOrders, message } = await requestInternalApi(context, {
    method: HTTP_METHODS.GET,
    url: WORK_ORDER_URL_REGULAR,
    params: { date },
  })

  return {
    props: {
      workOrders,
      message,
    },
  }
}
