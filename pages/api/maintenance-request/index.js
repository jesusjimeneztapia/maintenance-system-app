import nc from 'next-connect'
import { requestExternalApi } from '../../../services/requestApi'

const maintenanceRequestEndPoint = nc()

maintenanceRequestEndPoint.post(async (req, res) => {
  const { method } = req
  const {
    body: { machineCode, ...body },
  } = req
  const { data, message, status } = await requestExternalApi({
    method,
    url: `/machines/${machineCode}/request`,
    data: body,
  })
  return res.status(status).json(message ? { message } : data)
})

export default maintenanceRequestEndPoint
