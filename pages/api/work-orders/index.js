import { HTTP_METHODS } from '../../../services'
import { requestExternalApi } from '../../../services/requestApi'
import { WORK_ORDER_URL_EXTERNAL } from '../../../services/workOrderService'

export default async function getWorkOrders(req, res) {
  const {
    query: { date },
  } = req

  const { data, message, status } = await requestExternalApi({
    method: HTTP_METHODS.GET,
    url: WORK_ORDER_URL_EXTERNAL,
    params: { date },
  })

  if (message) {
    return res.status(status).json({ message })
  }

  return res.status(status).json(data)
}
