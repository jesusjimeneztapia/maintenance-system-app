import { HTTP_METHODS } from '../../../../services'
import { requestExternalApi } from '../../../../services/requestApi'
import { updateWorkOrderByIdUrlExternal } from '../../../../services/workOrderService'

export default async function updateWorOrderById(req, res) {
  const {
    query: { id },
    body,
  } = req
  const { data, message, status } = await requestExternalApi({
    method: HTTP_METHODS.PUT,
    url: updateWorkOrderByIdUrlExternal(id),
    data: body,
  })
  return res.status(status).json(message ? { message } : data)
}
