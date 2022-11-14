import { HTTP_METHODS } from '../../../../services'
import { getEngineUrlExternal } from '../../../../services/engineServices'
import { requestExternalApi } from '../../../../services/requestApi'

export default async function addEngine(req, res) {
  const {
    body,
    query: { code },
  } = req

  const { data, message, status } = await requestExternalApi({
    data: body,
    method: HTTP_METHODS.POST,
    url: getEngineUrlExternal(code, true),
  })

  return res.status(status).json(message ? { message } : data)
}
