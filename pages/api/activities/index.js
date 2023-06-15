import { HTTP_METHODS } from '../../../services'
import { ACTIVITY_URL_EXTERNAL } from '../../../services/activityServices'
import { requestExternalApi } from '../../../services/requestApi'

export default async function getActivitiesByMachineCode(req, res) {
  const {
    query: { machineCode },
  } = req

  const { data, message, status } = await requestExternalApi({
    method: HTTP_METHODS.GET,
    params: { machineCode },
    url: ACTIVITY_URL_EXTERNAL,
  })

  return res.status(status).json(data ?? { message })
}
