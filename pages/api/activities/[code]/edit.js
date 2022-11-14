import { HTTP_METHODS } from '../../../../services'
import { getActivityByCodeUrlExternal } from '../../../../services/activityServices'
import { requestExternalApi } from '../../../../services/requestApi'

export default async function editActivity(req, res) {
  const {
    query: { code },
    body,
  } = req

  const { data, message, status } = await requestExternalApi({
    data: body,
    method: HTTP_METHODS.PUT,
    url: getActivityByCodeUrlExternal(code),
  })

  return res.status(status).json(message ? { message } : data)
}
