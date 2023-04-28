import nc from 'next-connect'
import { requestExternalApi } from '../../../services/requestApi'
import { INDICATOR_URL_EXTERNAL } from '../../../services/indicatorServices'

const indicatorEndPoint = nc()

indicatorEndPoint.get(async (req, res) => {
  const { method } = req
  const { date, strict } = req.query
  const { data, message, status } = await requestExternalApi({
    method,
    url: INDICATOR_URL_EXTERNAL,
    params: { date, strict },
  })
  return res.status(status).json(message ? { message } : data)
})

export default indicatorEndPoint
