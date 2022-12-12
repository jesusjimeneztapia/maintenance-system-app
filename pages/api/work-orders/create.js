import { HTTP_METHODS } from '../../../services'
import { requestExternalApi } from '../../../services/requestApi'
import { WORK_ORDER_URL_EXTERNAL } from '../../../services/workOrderService'

export default async function createWorkOrder(req, res) {
  const { body } = req
  const { data, message, status } = await requestExternalApi({
    data: body,
    method: HTTP_METHODS.POST,
    url: WORK_ORDER_URL_EXTERNAL,
  })
  return res.status(status).json(message ? { message } : data)
}
