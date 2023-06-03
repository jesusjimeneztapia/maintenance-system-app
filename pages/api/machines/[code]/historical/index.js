import nc from 'next-connect'
import { requestExternalApi } from '../../../../../services/requestApi'
import { HISTORICAL_URL_EXTERNAL } from '../../../../../services/historicalServices'

const historicalEndPoint = nc()

historicalEndPoint.get(async (req, res) => {
  const { method } = req
  const { code, lte } = req.query
  const { data, message, status } = await requestExternalApi({
    method,
    url: `/machines/${code}${HISTORICAL_URL_EXTERNAL}`,
    params: { lte },
  })
  return res.status(status).json(
    message
      ? { message }
      : {
          ...data,
          date: new Date(lte).toLocaleDateString('es-ES').replace(/\//g, '-'),
        }
  )
})

export default historicalEndPoint
