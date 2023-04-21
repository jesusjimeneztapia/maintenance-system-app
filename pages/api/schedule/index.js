import nc from 'next-connect'
import { requestExternalApi } from '../../../services/requestApi'

const scheduleEndPoint = nc()

scheduleEndPoint.get(async (req, res) => {
  const { method } = req
  const { date, strict } = req.query
  const { data, message, status } = await requestExternalApi({
    method,
    url: '/schedule',
    params: { date, strict },
  })
  return res.status(status).json(message ? { message } : data)
})

export default scheduleEndPoint
