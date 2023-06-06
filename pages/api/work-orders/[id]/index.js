import { HTTP_METHODS } from '../../../../services'
import { requestExternalApi } from '../../../../services/requestApi'
import { workOrderWithIdUrlExternal } from '../../../../services/workOrderService'

export default async function getWorkOrderById(req, res) {
  const {
    query: { id, state },
  } = req
  const { data, message, status } = await requestExternalApi({
    method: HTTP_METHODS.GET,
    url: workOrderWithIdUrlExternal(id),
    params: { state },
  })
  return res.status(status).json(message ? { message } : data)
}
