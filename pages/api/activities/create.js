import { HTTP_METHODS } from '../../../services'
import { ACTIVITY_URL_EXTERNAL } from '../../../services/activityServices'
import { requestExternalApi } from '../../../services/requestApi'

export default async function createActivity(req, res) {
  const { body } = req

  const { data, message, status } = await requestExternalApi({
    data: body,
    method: HTTP_METHODS.POST,
    url: ACTIVITY_URL_EXTERNAL,
  })

  return res.status(status).json(message ? { message } : data)
}
