import nc from 'next-connect'
import { requestExternalApi } from '../../../services/requestApi'
import { FAILURE_REQUEST_URL_REGULAR } from '../../../services/failureReportServices'

const failureReportEndPoint = nc()

failureReportEndPoint.patch(async (req, res) => {
  const { method } = req
  const { id } = req.query
  const { data, message, status } = await requestExternalApi({
    method,
    url: `${FAILURE_REQUEST_URL_REGULAR}/${id}`,
  })
  return res.status(status).json(message ? { message } : data)
})

export default failureReportEndPoint
