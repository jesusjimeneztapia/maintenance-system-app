import { HTTP_METHODS } from '../../../../services'
import { getActivityByCodeUrlExternal } from '../../../../services/activityServices'
import { requestExternalApi } from '../../../../services/requestApi'

export default async function getActivityByCode(req, res) {
  const {
    query: { code, machineCode },
  } = req

  const { data, message, status } = await requestExternalApi({
    method: HTTP_METHODS.GET,
    params: { machineCode },
    url: getActivityByCodeUrlExternal(code),
  })

  return res.status(status).json(message ? { message } : data)
}
