import nc from 'next-connect'
import { requestExternalApi } from '../../../services/requestApi'

const scheduleEndPoint = nc()

scheduleEndPoint.put(async (req, res) => {
  const { body, method } = req
  const { id } = req.query
  const { data, message, status } = await requestExternalApi({
    method,
    url: `/schedule/${id}`,
    data: body,
  })
  return res.status(status).json(message ? { message } : data)
})

export default scheduleEndPoint
