import nc from 'next-connect'
import { requestExternalApi } from '../../../services/requestApi'
import { MAINTENANCE_REQUEST_URL_REGULAR } from '../../../services/maintenanceRequestService'

const maintenanceRequestEndPoint = nc()

maintenanceRequestEndPoint.patch(async (req, res) => {
  const { method } = req
  const { id } = req.query
  const { data, message, status } = await requestExternalApi({
    method,
    url: `${MAINTENANCE_REQUEST_URL_REGULAR}/${id}`,
  })
  return res.status(status).json(message ? { message } : data)
})

export default maintenanceRequestEndPoint
