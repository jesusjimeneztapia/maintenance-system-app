import { HTTP_METHODS } from '../../../../services'
import { getEngineByCodeUrlExternal } from '../../../../services/engineServices'
import { requestExternalApi } from '../../../../services/requestApi'

export default async function getEngine(req, res) {
  const {
    query: { code: machineCode, engineCode },
  } = req

  const { data, message, status } = await requestExternalApi({
    method: HTTP_METHODS.GET,
    url: getEngineByCodeUrlExternal(machineCode, engineCode),
  })

  return res.status(status).json(message ? { message } : data)
}
