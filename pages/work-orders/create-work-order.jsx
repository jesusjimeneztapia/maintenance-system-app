import Head from 'next/head'
import CreateWorkOrderForm from '../../components/work-orders/create/CreateWorkOrderForm'
import WorkOrderForm from '../../components/work-orders/WorkOrderForm'
import useBeforeRenderPage from '../../hooks/useBeforeRenderPage'
import { createDocumentTitle } from '../../libs/documentTitle'
import { CREATE_WORK_ORDER_INITIAL_VALUES } from '../../schemas/workOrder'
import { HTTP_METHODS } from '../../services'
import { requestInternalApi } from '../../services/requestApi'
import {
  CREATE_WORK_ORDER_CONFIG,
  GET_WORK_ORDERS_COUNT_REGULAR,
} from '../../services/workOrderService'
import { Title } from '@tremor/react'

export default function CreateWorkOrder({ count, machines, message }) {
  const { component, title } = useBeforeRenderPage({
    message,
    title: ['Órdenes de trabajo', 'Crear órden de trabajo'],
  })

  return (
    <>
      <Head>
        <title>{createDocumentTitle(title)}</title>
      </Head>
      <Title className='mb-5'>Crear órden de trabajo</Title>
      {component ? (
        <>{component}</>
      ) : (
        <WorkOrderForm
          {...CREATE_WORK_ORDER_CONFIG}
          initialValues={CREATE_WORK_ORDER_INITIAL_VALUES}
          title={`Órden de trabajo #${count + 1}`}
        >
          <CreateWorkOrderForm machines={machines} />
        </WorkOrderForm>
      )}
    </>
  )
}

export async function getServerSideProps(context) {
  const { data, message } = await requestInternalApi(context, {
    method: HTTP_METHODS.GET,
    url: GET_WORK_ORDERS_COUNT_REGULAR,
  })

  return {
    props: { ...data, message },
  }
}
