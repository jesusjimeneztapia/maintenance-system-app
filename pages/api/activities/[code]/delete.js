import { HTTP_METHODS } from '../../../../services'
import { getActivityByCodeUrlExternal } from '../../../../services/activityServices'
import { requestExternalApi } from '../../../../services/requestApi'

export default async function deleteActivity(req, res) {
  const {
    query: { code, machineCode },
  } = req

  const { status, message } = await requestExternalApi({
    method: HTTP_METHODS.DELETE,
    params: { machineCode },
    url: getActivityByCodeUrlExternal(code),
  })

  return message
    ? res.status(status).json({ message })
    : res.status(status).send()
}
