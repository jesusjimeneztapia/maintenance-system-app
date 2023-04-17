import { HTTP_METHODS } from '../../../../services'
import { requestExternalApi } from '../../../../services/requestApi'
import { workOrderWithIdUrlExternal } from '../../../../services/workOrderService'

export default async function deleteWorkOrderById(req, res) {
  const { id } = req.query
  const { data, message, status } = await requestExternalApi({
    method: HTTP_METHODS.DELETE,
    url: workOrderWithIdUrlExternal(id),
  })
  return res.status(status).json(message ? { message } : data)
}
