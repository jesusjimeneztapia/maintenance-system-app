import { HTTP_METHODS } from '../../../../../services'
import { DRAFT_WORK_ORDER_URL_EXTERNAL } from '../../../../../services/draftWorkOrderService'
import { requestExternalApi } from '../../../../../services/requestApi'

export default async function createWorkOrderFromDraftWorkOrder(req, res) {
  const {
    query: { id },
    body,
  } = req

  const { data, message, status } = await requestExternalApi({
    method: HTTP_METHODS.PUT,
    url: `${DRAFT_WORK_ORDER_URL_EXTERNAL}/${id}`,
    data: body,
  })

  if (message) {
    return res.status(status).json({ message })
  }

  return res.status(status).json(data)
}
