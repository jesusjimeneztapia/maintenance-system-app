import { HTTP_METHODS } from '../../../../services'
import { getEngineByCodeUrlExternal } from '../../../../services/engineServices'
import { requestExternalApi } from '../../../../services/requestApi'

export default async function editEngine(req, res) {
  const {
    query: { code: machineCode, engineCode },
    body,
  } = req

  const { data, message, status } = await requestExternalApi({
    data: body,
    method: HTTP_METHODS.PUT,
    url: getEngineByCodeUrlExternal(machineCode, engineCode),
  })

  return res.status(status).json(message ? { message } : data)
}
