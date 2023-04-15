import Head from 'next/head'
import Link from 'next/link'
import KanbanBoard from '../../components/work-orders/KanbanBoard'
import WorkOrderListProvider from '../../context/providers/WorkOrderListContext'
import useBeforeRenderPage from '../../hooks/useBeforeRenderPage'
import { createDocumentTitle } from '../../libs/documentTitle'
import { HTTP_METHODS } from '../../services'
import { requestInternalApi } from '../../services/requestApi'
import { WORK_ORDER_URL_REGULAR } from '../../services/workOrderService'
import { Flex, Title } from '@tremor/react'

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
            <Link href='/work-orders/create-work-order'>
              <a className='max-sm:self-end inline-flex items-center justify-center px-5 py-2 text-sm font-medium text-slate-500 rounded-lg bg-slate-100 hover:text-slate-900 hover:bg-slate-200'>
                <span className='w-full'>Crear órden de trabajo</span>
              </a>
            </Link>
          </Flex>
          <WorkOrderListProvider workOrders={workOrders}>
            <KanbanBoard />
          </WorkOrderListProvider>
        </>
      )}
    </>
  )
}

export async function getServerSideProps(context) {
  const {
    query: { dateRange },
  } = context

  const { data: workOrders, message } = await requestInternalApi(context, {
    method: HTTP_METHODS.GET,
    url: WORK_ORDER_URL_REGULAR,
    params: { dateRange: dateRange ?? 'MONTHLY' },
  })

  return {
    props: {
      workOrders,
      message,
    },
  }
}
