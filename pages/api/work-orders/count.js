import { HTTP_METHODS } from '../../../services'
import { requestExternalApi } from '../../../services/requestApi'
import { GET_WORK_ORDERS_COUNT_EXTERNAL } from '../../../services/workOrderService'

export default async function getWorkOrdersCount(_req, res) {
  const { data, message, status } = await requestExternalApi({
    method: HTTP_METHODS.GET,
    url: GET_WORK_ORDERS_COUNT_EXTERNAL,
  })

  if (message) {
    return res.status(status).json({ message })
  }

  return res.status(status).json(data)
}
