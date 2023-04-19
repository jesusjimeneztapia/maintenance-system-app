import { HTTP_METHODS } from '../../../../services'
import { DRAFT_WORK_ORDER_URL_EXTERNAL } from '../../../../services/draftWorkOrderService'
import { requestExternalApi } from '../../../../services/requestApi'

export default async function getDraftWorkOrders(req, res) {
  const { date } = req.query

  const { data, message, status } = await requestExternalApi({
    method: HTTP_METHODS.GET,
    url: DRAFT_WORK_ORDER_URL_EXTERNAL,
    params: { date },
  })

  if (message) {
    return res.status(status).json({ message })
  }

  return res.status(status).json(data)
}
