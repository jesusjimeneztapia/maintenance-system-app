import Head from 'next/head'
import Link from 'next/link'
import Button from '../../components/Button'
import KanbanBoard from '../../components/work-orders/KanbanBoard'
import WorkOrderListProvider from '../../context/providers/WorkOrderListContext'
import useBeforeRenderPage from '../../hooks/useBeforeRenderPage'
import { createDocumentTitle } from '../../libs/documentTitle'
import { HTTP_METHODS } from '../../services'
import { requestInternalApi } from '../../services/requestApi'
import { WORK_ORDER_URL_REGULAR } from '../../services/workOrderService'
import styles from '../../styles/machines/code/Machine.module.css'

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
        <>{component}</>
      ) : (
        <>
          <header className={styles.header}>
            <h2>{title}</h2>
            <Button>
              <Link href='/work-orders/create-work-order'>
                <a>Crear Orden de trabajo</a>
              </Link>
            </Button>
          </header>
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
