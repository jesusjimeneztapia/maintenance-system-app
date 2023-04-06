import { HTTP_METHODS } from '../../../../../services'
import { DRAFT_WORK_ORDER_URL_EXTERNAL } from '../../../../../services/draftWorkOrderService'
import { requestExternalApi } from '../../../../../services/requestApi'

export default async function deleteDraftWorkOrderByCode(req, res) {
  const {
    query: { id },
  } = req

  const { message, status } = await requestExternalApi({
    method: HTTP_METHODS.DELETE,
    url: `${DRAFT_WORK_ORDER_URL_EXTERNAL}/${id}`,
  })

  if (message) {
    return res.status(status).json({ message })
  }

  return res.status(status).json({ id: Number(id) })
}
