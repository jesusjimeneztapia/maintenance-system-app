import { HTTP_METHODS } from '../../../../services'
import { DRAFT_WORK_ORDER_URL_EXTERNAL } from '../../../../services/draftWorkOrderService'
import { requestExternalApi } from '../../../../services/requestApi'

export default async function getDraftWorkOrders(req, res) {
  const now = new Date()
  const { query } = req
  const year = query.year ?? now.getFullYear()
  const month = query.month ?? now.getMonth()
  const day = query.day ?? now.getDay()

  const { data, message, status } = await requestExternalApi({
    method: HTTP_METHODS.GET,
    url: DRAFT_WORK_ORDER_URL_EXTERNAL,
    params: { year, month, day },
  })

  if (message) {
    return res.status(status).json({ message })
  }

  return res.status(status).json(data)
}
