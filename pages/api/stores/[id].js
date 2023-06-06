import nc from 'next-connect'
import { requestExternalApi } from '../../../services/requestApi'

const storeByIdEndPoint = nc()

storeByIdEndPoint.put(async (req, res) => {
  const { method, body } = req
  const { id } = req.query
  const { data, message, status } = await requestExternalApi({
    method,
    data: body,
    url: `/stores/${id}`,
  })
  return res.status(status).json(message ? { message } : data)
})

storeByIdEndPoint.delete(async (req, res) => {
  const { method } = req
  const { id } = req.query
  const { data, message, status } = await requestExternalApi({
    method,
    url: `/stores/${id}`,
  })
  return res.status(status).json(message ? { message } : data)
})

export default storeByIdEndPoint
