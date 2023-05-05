import nc from 'next-connect'
import { requestExternalApi } from '../../../services/requestApi'
import { MAINTENANCE_REQUEST_URL_REGULAR } from '../../../services/maintenanceRequestService'

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

maintenanceRequestEndPoint.get(async (req, res) => {
  const { method } = req
  const { data, message, status } = await requestExternalApi({
    method,
    url: MAINTENANCE_REQUEST_URL_REGULAR,
  })
  return res.status(status).json(message ? { message } : data)
})

export default maintenanceRequestEndPoint
